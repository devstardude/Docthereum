import { BigInt } from "@graphprotocol/graph-ts"
import {
  Docthereum,
  ApplicationResult,
  ChainlinkCancelled,
  ChainlinkFulfilled,
  ChainlinkRequested,
  DoctorAuthorised,
  LabAuthorised,
  ReportSaved
} from "../generated/Docthereum/Docthereum"
import { docAuthorisedEntity,labAuthorisedEntity,reportSavedEntity,applicationResultEntity} from "../generated/schema"


export function handleDoctorAuthorised(event: DoctorAuthorised): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = new docAuthorisedEntity(event.params.AuthOnDate.toHex()+ event.params._authAddre.toHex())

  entity.name = event.params.name
  entity._authAddress = event.params._authAddre
  entity.authId = event.params.AuthId
  entity.authOnDate = event.params.AuthOnDate
  entity.save()
}

export function handleLabAuthorised(event: LabAuthorised): void {
  let entity = new labAuthorisedEntity(event.params.AuthOnDate.toHex()+ event.params._authAddre.toHex())


  entity.name = event.params.name
  entity._authAddress = event.params._authAddre
  entity.authId = event.params.AuthId
  entity.authOnDate = event.params.AuthOnDate
  entity.save()
}

export function handleReportSaved(event: ReportSaved): void {
  // let entity = reportSavedEntity.load(event.transaction.from.toHex())


  let entity = new reportSavedEntity(event.params.AddedAt.toHex()+ event.params.fileId.toString())

  entity.patientName = event.params.PatientName
  entity.labName = event.params.LabName
  entity.fileId = event.params.fileId
  entity.category = event.params.category
  entity.addedAt = event.params.AddedAt
  entity.age = event.params.age
  entity.weight = event.params.weight
  entity.height = event.params.height
  entity.bloodGroup = event.params.bloodGroup
  entity.Gender = event.params.gender
  
  entity.save()
}
export function handelApplicationResult(event: ApplicationResult) :void{

  let entity = new applicationResultEntity(event.params.applicantAddress.toHex())

  entity._applicantAddres = event.params.applicantAddress
  entity.status = event.params.status
  
  entity.save()  
}

export function handleChainlinkCancelled(event: ChainlinkCancelled): void {}

export function handleChainlinkFulfilled(event: ChainlinkFulfilled): void {}

export function handleChainlinkRequested(event: ChainlinkRequested): void {}
