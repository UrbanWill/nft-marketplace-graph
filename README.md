# The Graph Nft Marketplace

A subgraph to index events from NFT Marketplace contract on Polygon

## How to deploy

- Add event handling changes to `src/contract-name`
- run `graph codegen && graph build` to generate types and build code
- run `graph auth --product hosted-service {api_key}` to authenticate through CLI
- run `graph deploy --product hosted-service urbanwill/graph-nft-marketplace` to deploy
