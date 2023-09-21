import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { ApplicationResult } from "../generated/schema"
import { ApplicationResult as ApplicationResultEvent } from "../generated/Docthereum/Docthereum"
import { handleApplicationResult } from "../src/docthereum"
import { createApplicationResultEvent } from "./docthereum-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let applicantAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let AuthId = "Example string value"
    let status = "boolean Not implemented"
    let newApplicationResultEvent = createApplicationResultEvent(
      applicantAddress,
      AuthId,
      status
    )
    handleApplicationResult(newApplicationResultEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ApplicationResult created and stored", () => {
    assert.entityCount("ApplicationResult", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ApplicationResult",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "applicantAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ApplicationResult",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "AuthId",
      "Example string value"
    )
    assert.fieldEquals(
      "ApplicationResult",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "status",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
