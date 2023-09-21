import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  ApplicationResult,
  ChainlinkCancelled,
  ChainlinkFulfilled,
  ChainlinkRequested,
  DoctorAuthorised,
  LabAuthorised,
  ReportSaved
} from "../generated/Docthereum/Docthereum"

export function createApplicationResultEvent(
  applicantAddress: Address,
  AuthId: string,
  status: boolean
): ApplicationResult {
  let applicationResultEvent = changetype<ApplicationResult>(newMockEvent())

  applicationResultEvent.parameters = new Array()

  applicationResultEvent.parameters.push(
    new ethereum.EventParam(
      "applicantAddress",
      ethereum.Value.fromAddress(applicantAddress)
    )
  )
  applicationResultEvent.parameters.push(
    new ethereum.EventParam("AuthId", ethereum.Value.fromString(AuthId))
  )
  applicationResultEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromBoolean(status))
  )

  return applicationResultEvent
}

export function createChainlinkCancelledEvent(id: Bytes): ChainlinkCancelled {
  let chainlinkCancelledEvent = changetype<ChainlinkCancelled>(newMockEvent())

  chainlinkCancelledEvent.parameters = new Array()

  chainlinkCancelledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkCancelledEvent
}

export function createChainlinkFulfilledEvent(id: Bytes): ChainlinkFulfilled {
  let chainlinkFulfilledEvent = changetype<ChainlinkFulfilled>(newMockEvent())

  chainlinkFulfilledEvent.parameters = new Array()

  chainlinkFulfilledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkFulfilledEvent
}

export function createChainlinkRequestedEvent(id: Bytes): ChainlinkRequested {
  let chainlinkRequestedEvent = changetype<ChainlinkRequested>(newMockEvent())

  chainlinkRequestedEvent.parameters = new Array()

  chainlinkRequestedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkRequestedEvent
}

export function createDoctorAuthorisedEvent(
  name: string,
  _authAddre: Address,
  AuthId: string,
  AuthOnDate: BigInt
): DoctorAuthorised {
  let doctorAuthorisedEvent = changetype<DoctorAuthorised>(newMockEvent())

  doctorAuthorisedEvent.parameters = new Array()

  doctorAuthorisedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  doctorAuthorisedEvent.parameters.push(
    new ethereum.EventParam(
      "_authAddre",
      ethereum.Value.fromAddress(_authAddre)
    )
  )
  doctorAuthorisedEvent.parameters.push(
    new ethereum.EventParam("AuthId", ethereum.Value.fromString(AuthId))
  )
  doctorAuthorisedEvent.parameters.push(
    new ethereum.EventParam(
      "AuthOnDate",
      ethereum.Value.fromUnsignedBigInt(AuthOnDate)
    )
  )

  return doctorAuthorisedEvent
}

export function createLabAuthorisedEvent(
  name: string,
  _authAddre: Address,
  AuthId: string,
  AuthOnDate: BigInt
): LabAuthorised {
  let labAuthorisedEvent = changetype<LabAuthorised>(newMockEvent())

  labAuthorisedEvent.parameters = new Array()

  labAuthorisedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  labAuthorisedEvent.parameters.push(
    new ethereum.EventParam(
      "_authAddre",
      ethereum.Value.fromAddress(_authAddre)
    )
  )
  labAuthorisedEvent.parameters.push(
    new ethereum.EventParam("AuthId", ethereum.Value.fromString(AuthId))
  )
  labAuthorisedEvent.parameters.push(
    new ethereum.EventParam(
      "AuthOnDate",
      ethereum.Value.fromUnsignedBigInt(AuthOnDate)
    )
  )

  return labAuthorisedEvent
}

export function createReportSavedEvent(
  fileId: string,
  category: string,
  PatientName: Address,
  LabName: Address,
  AddedAt: BigInt,
  age: BigInt,
  height: BigInt,
  weight: BigInt,
  bloodGroup: string,
  gender: string
): ReportSaved {
  let reportSavedEvent = changetype<ReportSaved>(newMockEvent())

  reportSavedEvent.parameters = new Array()

  reportSavedEvent.parameters.push(
    new ethereum.EventParam("fileId", ethereum.Value.fromString(fileId))
  )
  reportSavedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  reportSavedEvent.parameters.push(
    new ethereum.EventParam(
      "PatientName",
      ethereum.Value.fromAddress(PatientName)
    )
  )
  reportSavedEvent.parameters.push(
    new ethereum.EventParam("LabName", ethereum.Value.fromAddress(LabName))
  )
  reportSavedEvent.parameters.push(
    new ethereum.EventParam(
      "AddedAt",
      ethereum.Value.fromUnsignedBigInt(AddedAt)
    )
  )
  reportSavedEvent.parameters.push(
    new ethereum.EventParam("age", ethereum.Value.fromSignedBigInt(age))
  )
  reportSavedEvent.parameters.push(
    new ethereum.EventParam("height", ethereum.Value.fromSignedBigInt(height))
  )
  reportSavedEvent.parameters.push(
    new ethereum.EventParam("weight", ethereum.Value.fromSignedBigInt(weight))
  )
  reportSavedEvent.parameters.push(
    new ethereum.EventParam("bloodGroup", ethereum.Value.fromString(bloodGroup))
  )
  reportSavedEvent.parameters.push(
    new ethereum.EventParam("gender", ethereum.Value.fromString(gender))
  )

  return reportSavedEvent
}
