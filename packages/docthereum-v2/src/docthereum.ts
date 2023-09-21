import {
  ApplicationResult as ApplicationResultEvent,
  ChainlinkCancelled as ChainlinkCancelledEvent,
  ChainlinkFulfilled as ChainlinkFulfilledEvent,
  ChainlinkRequested as ChainlinkRequestedEvent,
  DoctorAuthorised as DoctorAuthorisedEvent,
  LabAuthorised as LabAuthorisedEvent,
  ReportSaved as ReportSavedEvent
} from "../generated/Docthereum/Docthereum"
import {
  ApplicationResult,
  ChainlinkCancelled,
  ChainlinkFulfilled,
  ChainlinkRequested,
  DoctorAuthorised,
  LabAuthorised,
  ReportSaved
} from "../generated/schema"

export function handleApplicationResult(event: ApplicationResultEvent): void {
  let entity = new ApplicationResult(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.applicantAddress = event.params.applicantAddress
  entity.AuthId = event.params.AuthId
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChainlinkCancelled(event: ChainlinkCancelledEvent): void {
  let entity = new ChainlinkCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Docthereum_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChainlinkFulfilled(event: ChainlinkFulfilledEvent): void {
  let entity = new ChainlinkFulfilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Docthereum_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChainlinkRequested(event: ChainlinkRequestedEvent): void {
  let entity = new ChainlinkRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Docthereum_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDoctorAuthorised(event: DoctorAuthorisedEvent): void {
  let entity = new DoctorAuthorised(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity._authAddre = event.params._authAddre
  entity.AuthId = event.params.AuthId
  entity.AuthOnDate = event.params.AuthOnDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLabAuthorised(event: LabAuthorisedEvent): void {
  let entity = new LabAuthorised(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity._authAddre = event.params._authAddre
  entity.AuthId = event.params.AuthId
  entity.AuthOnDate = event.params.AuthOnDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReportSaved(event: ReportSavedEvent): void {
  let entity = new ReportSaved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.fileId = event.params.fileId
  entity.category = event.params.category
  entity.PatientName = event.params.PatientName
  entity.LabName = event.params.LabName
  entity.AddedAt = event.params.AddedAt
  entity.age = event.params.age
  entity.height = event.params.height
  entity.weight = event.params.weight
  entity.bloodGroup = event.params.bloodGroup
  entity.gender = event.params.gender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
