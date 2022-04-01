pragma solidity^0.8.13;
pragma experimental ABIEncoderV2;

contract Docthereum{
  address owner;
  constructor(){
    owner = msg.sender;
  }
  string public ContractName = "Docthereum";

  struct File {
    string fileHash;
    string category;
    address User;
    address ByLab;
    uint dated;

  }
  struct AuthUser{
      string name;
      address _address;
      string auth_id;
      uint authOnDate;
  }

  address []  Doctors;
  address []  Labs;
  mapping(address => bool) public AuthorisedLab;
  mapping(address => bool) public AuthorisedDoc;
  mapping(address => AuthUser) AuthDetails;

  mapping(address => string[])  UserReports; // maintain reports belonging to a user with address as key
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

  event ReportSaved(
      string fileId,
      string category,
      address PatientName,
      address LabName,
      uint AddedAt   
  );

  modifier OnlyOwner(){
    require(msg.sender == owner,"you are not authorised to perform the action!");
    _;
  }
  modifier OnlyLabs(){
      require(AuthorisedLab[msg.sender],"you are not registered as a lab");
      _;
  }



  function getUserReports(address _address) public view returns(string [] memory){
    return UserReports[_address];
  }

  function GetDetailedReport(string memory _fileHash) public view returns(File memory){
    return Files[_fileHash];
  }

  function GetAllLabs() public view returns(address[] memory){
    return Labs;
  }

  function GetAllDoctors() public view returns(address[] memory){
    return Doctors;
  }
  
  function GetAuthDetails(address _address) public view returns(AuthUser memory){
    return AuthDetails[_address];
  }

  //currently for testing purposes any one can verify, 
  //planning to integrate apis to check doctors regisrtration number and then authorise them.
  function addAuthLab(address _authAddress,string memory name, string memory _authId ) public {
    require(!AuthorisedLab[_authAddress],"Already registered!");

    Labs.push(_authAddress);
    AuthorisedLab[_authAddress] = true;
    
    AuthUser memory _authuser;
    _authuser.name = name;
    _authuser._address = _authAddress;
    _authuser.auth_id = _authId;
    _authuser.authOnDate = block.timestamp;
    AuthDetails[_authAddress] = _authuser;

    emit LabAuthorised(name,_authAddress,_authId,block.timestamp); //emit an event when new authorisation is given
  }

 function addAuthDoc(address _authAddress,string memory name, string memory _authId ) public {
    require(!AuthorisedDoc[_authAddress],"Already registered!");
    
    Doctors.push(_authAddress);
    AuthorisedDoc[_authAddress] = true;
    
    AuthUser memory _authuser;
    _authuser.name = name;
    _authuser._address = _authAddress;
    _authuser.auth_id = _authId;
    _authuser.authOnDate = block.timestamp;
    AuthDetails[_authAddress] = _authuser;

    emit DoctorAuthorised(name,_authAddress,_authId,block.timestamp); //emit an event when new authorisation is given
  } 


  function SaveReport(string memory _fileHash,address user_address, string memory category) public OnlyLabs returns(bool){
    UserReports[user_address].push(_fileHash);
    if(!UserExists[user_address]){
         UserExists[user_address] = true;
       }

    File memory _file;
    _file.fileHash = _fileHash;
    _file.category = category;
    _file.User = user_address;
    _file.ByLab = msg.sender;
    _file.dated = block.timestamp;
  
    Files[_fileHash] = _file;

    emit ReportSaved(_fileHash,category,user_address,msg.sender,block.timestamp);
    return true;
  }

  function setOwner(address _owner) public OnlyOwner returns(bool){
    owner = _owner;
    return true;
  }
}