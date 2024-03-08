
## /publish

```
sequenceDiagram
  title Publish Rating
  participant Buyer
  participant Buyer App
  participant Seller
  participant Seller Platform (NP)
  participant Rating API
  participant Ledger
  Seller Platform (NP) ->> Buyer: Request Rating
  note over Buyer App: NP would request rating for a seller or logistic provider
  Buyer->>Seller Platform (NP): Provide Rating
  note over Seller Platform (NP): Store all rating of the day, for all sellers
  Seller Platform (NP)->>Rating API: /publish
  Rating API -->>Seller Platform (NP): ACK
  Rating API ->>Ledger: Cord.Score.registerRating()
  note over Ledger: "Submission happens to Data node through CORD.JS SDK/API. Data node processes request and sends to transaction pool, which gets picked up by the validator and transaction gets into the block."
  Ledger -->>Rating API: notify about completion (websocket, async)
  Rating API ->>Seller Platform (NP): /on_publish
  Seller Platform (NP)-->>Rating API: ACK

```


## /revise

```
sequenceDiagram
  title Revise Rating
  participant Buyer
  participant Buyer App
  participant Seller
  participant Seller Platform (NP)
  participant Rating API
  participant Ledger
  Buyer->>Seller Platform (NP): Provide update to the rating
  Seller Platform (NP)-->>Buyer: ACK
  note over Seller Platform (NP): Store updates to the Seller per day.
  Seller Platform (NP)->>Rating API: /revise
  Rating API -->>Seller Platform (NP): ACK
  Rating API ->>Ledger: Cord.Score.amendRating()
  note right of Rating API: amend is Done as a Debit Entry of ledger
  Ledger -->>Rating API: notify about completion (websocket, async)
  Rating API ->>Ledger: Cord.Score.reviseRating()
  Ledger -->>Rating API: notify about completion (websocket, async)
  Rating API ->>Seller Platform (NP): /on_revise
  Seller Platform (NP)-->>Rating API: ACK

```

## /query

```
sequenceDiagram
  title Query Aggregated Score
  participant Buyer
  participant Buyer Platform
  participant Seller Platform (NP)
  participant Rating API
  participant Ledger
  Buyer->>Seller Platform (NP): /search
  Seller Platform (NP)-->>Buyer: ACK
  Seller Platform (NP)->>Buyer: /on_search
  Buyer->>Seller Platform (NP): ACK
  note over Buyer Platform: Get aggregate rating from ledger
  Buyer Platform->>Rating API: /query
  Rating API -->>Buyer Platform: ACK
  note right of Rating API: All read operations are done on Data node only, and no need for getting all nodes of chain involved for this.
  Rating API ->>Ledger: Cord.Score.fetchScoreFromChain()
  Ledger -->>Rating API: aggregate_rating
  Rating API ->>Buyer Platform: /on_query
  Buyer Platform-->>Rating API: ACK
```