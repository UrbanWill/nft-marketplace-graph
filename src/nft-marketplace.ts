import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  ItemBought as ItemBoughtEvent,
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/NftMarketplace/NftMarketplace";
import {
  ActiveItem,
  ItemBought,
  ItemListed,
  ItemCanceled,
} from "../generated/schema";

export function handleItemListed(event: ItemListedEvent): void {
  const id = getIdFromEventParams(
    event.params.tokenId,
    event.params.nftAddress
  );

  let itemListed = ItemListed.load(id);
  let activeItem = ActiveItem.load(id);

  if (!itemListed) {
    itemListed = new ItemListed(id);
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemListed.seller = event.params.seller;
  activeItem.seller = event.params.seller;

  itemListed.nftAddress = event.params.nftAddress;
  activeItem.nftAddress = event.params.nftAddress;

  itemListed.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activeItem.price = event.params.price;

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();
}

export function handleItemBought(event: ItemBoughtEvent): void {
  const id = getIdFromEventParams(
    event.params.tokenId,
    event.params.nftAddress
  );

  let itemBought = ItemBought.load(id);
  const activeItem = ActiveItem.load(id);

  if (!itemBought) {
    itemBought = new ItemBought(id);
  }

  itemBought.buyer = event.params.buyer;
  itemBought.nftAddress = event.params.nftAddress;
  itemBought.tokenId = event.params.tokenId;
  activeItem!.buyer = event.params.buyer;

  itemBought.save();
  activeItem!.save();
}

export function handleItemCanceled(event: ItemCanceledEvent): void {
  const id = getIdFromEventParams(
    event.params.tokenId,
    event.params.nftAddress
  );
  let itemCanceled = ItemCanceled.load(id);
  const activeItem = ActiveItem.load(id);

  if (!itemCanceled) {
    itemCanceled = new ItemCanceled(id);
  }
  itemCanceled.seller = event.params.seller;
  itemCanceled.nftAddress = event.params.nftAddress;
  itemCanceled.tokenId = event.params.tokenId;
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  itemCanceled.save();
  activeItem!.save();
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}
