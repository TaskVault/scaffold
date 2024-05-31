import {
  CampaignClosed as CampaignClosedEvent,
  CampaignCreated as CampaignCreatedEvent,
  DonationReceived as DonationReceivedEvent
} from "../generated/DonationContract/DonationContract"
import {
  CampaignClosed,
  CampaignCreated,
  DonationReceived,
  Campaign
} from "../generated/schema"

export function handleCampaignClosed(event: CampaignClosedEvent): void {
  let entity = new CampaignClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.campaignOwner = event.params.campaignOwner
  entity.campaignName = event.params.campaignName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
  
  let campaignEntity = new Campaign(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  campaignEntity.campaignId = event.params.campaignId
  campaignEntity.campaignOwner = event.params.campaignOwner
  campaignEntity.campaignName = event.params.campaignName
  campaignEntity.isLive = true
  campaignEntity.save()
}

export function handleDonationReceived(event: DonationReceivedEvent): void {
  let entity = new DonationReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.donor = event.params.donor
  // entity.tokenAddresses = event.params.tokenAddresses
  // TODO figure out why this doesn't work
  entity.tokenAmounts = event.params.tokenAmounts

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
