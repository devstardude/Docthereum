// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract Docthereum is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    address owner;

    address public oracle;
    bytes32 public jobId;
    uint256 public fee;

    constructor() {
        owner = msg.sender;
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x40193c8518BB267228Fc409a613bDbD8eC5a97b3);

        //currently hardcoded for development purposes
        oracle = 0x40193c8518BB267228Fc409a613bDbD8eC5a97b3;
        jobId = "ca98366cc7314957b8c012c72f05aeeb";
        fee = (1 * LINK_DIVISIBILITY) / 10; // (Varies by network and job)
    }

    struct GeneralInfo {
        //optional for users
        int256 age;
        int256 height;
        int256 weight;
        string bloodGroup;
        string gender;
    }

    struct File {
        string fileHash;
        string category;
        address User;
        address ByLab;
        uint dated;
        GeneralInfo generalInfo;
    }

    struct AuthUser {
        string name;
        address _address;
        string auth_id;
        uint authOnDate;
    }

    struct Applicant {
        address applicantAddress;
        string name;
        string auth_id;
        uint256 applyId; // 0= doctor, 1= lab
    }

    address[] Doctors;
    address[] Labs;
    mapping(address => bool) public AuthorisedLab;
    mapping(address => bool) public AuthorisedDoc;
    mapping(address => AuthUser) AuthDetails;
    mapping(bytes32 => Applicant) private GetApplicant;
    mapping(string => bool) private idUsed;
    mapping(address => string[]) UserReports; // maintain reports belonging to a user with address as key
    mapping(address => bool) public UserExists;
    mapping(string => File) Files;

    event LabAuthorised(
        string name,
        address _authAddre,
        string AuthId,
        uint AuthOnDate
    );

    event DoctorAuthorised(
        string name,
        address _authAddre,
        string AuthId,
        uint AuthOnDate
    );
    event ApplicationResult(
        address applicantAddress,
        string AuthId,
        bool status
    );
    event ReportSaved(
        string fileId,
        string category,
        address PatientName,
        address LabName,
        uint AddedAt,
        int256 age,
        int256 height,
        int256 weight,
        string bloodGroup,
        string gender
    );

    modifier OnlyOwner() {
        require(
            msg.sender == owner,
            "you are not authorised to perform the action!"
        );
        _;
    }
    modifier OnlyLabs() {
        require(AuthorisedLab[msg.sender], "you are not registered as a lab");
        _;
    }

    function getUserReports(
        address _address
    ) public view returns (string[] memory) {
        return UserReports[_address];
    }

    function GetDetailedReport(
        string memory _fileHash
    ) public view returns (File memory) {
        return Files[_fileHash];
    }

    function GetAllLabs() public view returns (address[] memory) {
        return Labs;
    }

    function GetAllDoctors() public view returns (address[] memory) {
        return Doctors;
    }

    function GetAuthDetails(
        address _address
    ) public view returns (AuthUser memory) {
        return AuthDetails[_address];
    }

    // this is fully functional but unfortunately chainlink rinkeby version was down, so we have provided alternative
    // authorisation for the moment :(
    function checkAuthorisation(
        string memory name,
        string memory id,
        uint256 applyId
    ) public returns (bytes32 requestId) {
        require(
            applyId == 0 || applyId == 1,
            "Apply id should be either 0 or 1"
        );
        require(!idUsed[id], "Id already used"); // to stop function spamming

        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        string memory url = append("https://doc-api.barryallen28.repl.co/", id);
        request.add("get", url);
        request.add("path", "res");

        requestId = sendChainlinkRequest(request, fee);
        GetApplicant[requestId] = Applicant(msg.sender, name, id, applyId);

        return requestId;
    }

    function fulfill(
        bytes32 _requestId,
        uint256 _res
    ) public recordChainlinkFulfillment(_requestId) {
        Applicant memory applicant = GetApplicant[_requestId];
        if (_res == 100) {
            if (applicant.applyId == 0) {
                addAuthDoc(
                    applicant.applicantAddress,
                    applicant.name,
                    applicant.auth_id
                );
            } else {
                addAuthLab(
                    applicant.applicantAddress,
                    applicant.name,
                    applicant.auth_id
                );
            }
            emit ApplicationResult(
                applicant.applicantAddress,
                applicant.auth_id,
                true
            );
        } else {
            emit ApplicationResult(
                applicant.applicantAddress,
                applicant.auth_id,
                false
            );
        }
        idUsed[applicant.auth_id] = true;
    }

    function SaveReport(
        string memory _fileHash,
        address user_address,
        string memory category,
        GeneralInfo memory _generalInfo
    ) public OnlyLabs returns (bool) {
        UserReports[user_address].push(_fileHash);
        if (!UserExists[user_address]) {
            UserExists[user_address] = true;
        }

        File memory _file;
        _file.fileHash = _fileHash;
        _file.category = category;
        _file.User = user_address;
        _file.ByLab = msg.sender;
        _file.dated = block.timestamp;
        _file.generalInfo = _generalInfo;

        Files[_fileHash] = _file;

        emit ReportSaved(
            _fileHash,
            category,
            user_address,
            msg.sender,
            block.timestamp,
            _generalInfo.age,
            _generalInfo.height,
            _generalInfo.weight,
            _generalInfo.bloodGroup,
            _generalInfo.gender
        );
        return true;
    }

    //Owner function for configurations
    function setOwner(address _owner) public OnlyOwner returns (bool) {
        owner = _owner;
        return true;
    }

    function setOracle(address _oracle) public OnlyOwner returns (bool) {
        oracle = _oracle;
        return true;
    }

    function setJobId(bytes32 _jobId) public OnlyOwner returns (bool) {
        jobId = _jobId;
        return true;
    }

    function setFee(uint256 _fee) public OnlyOwner returns (bool) {
        fee = _fee;
        return true;
    }

    // these are public only for development and showcase purposes, we were unable to verify because
    // chainlink rinkeby is currently in maintainence :(
    // you can test the working version on kovan at 0x6DdD958591974891eD4819cDF9a269DaEc3C55A7, unfortunately
    // we cant deploy grapgh on kovan, so we had to stay with rinkeby.
    function addAuthLab(
        address _authAddress,
        string memory name,
        string memory _authId
    ) public {
        require(!AuthorisedLab[_authAddress], "Already registered!");

        Labs.push(_authAddress);
        AuthorisedLab[_authAddress] = true;

        AuthUser memory _authuser;
        _authuser.name = name;
        _authuser._address = _authAddress;
        _authuser.auth_id = _authId;
        _authuser.authOnDate = block.timestamp;
        AuthDetails[_authAddress] = _authuser;

        emit LabAuthorised(name, _authAddress, _authId, block.timestamp); //emit an event when new authorisation is given
    }

    function addAuthDoc(
        address _authAddress,
        string memory name,
        string memory _authId
    ) public {
        require(!AuthorisedDoc[_authAddress], "Already registered!");

        Doctors.push(_authAddress);
        AuthorisedDoc[_authAddress] = true;

        AuthUser memory _authuser;
        _authuser.name = name;
        _authuser._address = _authAddress;
        _authuser.auth_id = _authId;
        _authuser.authOnDate = block.timestamp;
        AuthDetails[_authAddress] = _authuser;

        emit DoctorAuthorised(name, _authAddress, _authId, block.timestamp); //emit an event when new authorisation is given
    }

    function append(
        string memory _url,
        string memory _id
    ) private pure returns (string memory) {
        return string(abi.encodePacked(_url, _id));
    }
}
