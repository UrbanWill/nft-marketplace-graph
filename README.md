# The Graph Nft Marketplace

A subgraph to index events from NFT Marketplace contract on Polygon

## Developing:

- Add schemas to `schema.graphql` and run `graph codegen`to generate schema and types
- Add event handling changes to `src/contract-name`
- run `graph build` to build code
- run `graph auth --product hosted-service {api_key}` to authenticate through CLI

## How to deploy:

- run `graph deploy --product hosted-service urbanwill/graph-nft-marketplace` to deploy
