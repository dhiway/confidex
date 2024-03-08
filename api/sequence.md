
## /publish

```
title Publish Rating
participant Buyer
participant Buyer App
participant Seller
participant Seller Platform (NP)
participant Rating API
participant Ledger
Seller Platform (NP) -> Buyer: Request Rating
note over Buyer App: NP would request \nrating for a seller \nor logistic provider
Buyer->Seller Platform (NP): Provide Rating
note over Seller Platform (NP): Store all rating\nof the day, for\nall sellers
Seller Platform (NP)->Rating API: /publish
Rating API -->Seller Platform (NP): ACK
Rating API ->Ledger: Cord.Score.registerRating()
note over Ledger: Submission happens to Data \nnode through CORD.JS SDK/API\n. Data node processes request \nand sends to transaction pool, \nwhich gets picked up by the \nvalidator and transaction gets \ninto the block.
Ledger -->Rating API: notify about completion\n(websocket, async)
Rating API ->Seller Platform (NP): /on_publish
Seller Platform (NP)-->Rating API: ACK
```


## /revise

```
title Revise Rating
participant Buyer
participant Buyer App
participant Seller
participant Seller Platform (NP)
participant Rating API
participant Ledger
Buyer->Seller Platform (NP): Provide update to the rating
Seller Platform (NP)-->Buyer: ACK
note over Seller Platform (NP): Store updates to the Seller per day.
Seller Platform (NP)->Rating API: /revise
Rating API -->Seller Platform (NP): ACK
Rating API ->Ledger: Cord.Score.amendRating()
note right of Rating API: amend is Done as a \nDebit Entry of ledger
Ledger-->Rating API: notify
note over Ledger: Submission happens to Data \nnode through CORD.JS SDK/API. \nData node processes request \nand sends to transaction pool, \nwhich gets picked up by the \nvalidator and transaction gets \ninto the block.
Rating API ->Ledger: Cord.Score.reviseRating()
Ledger -->Rating API: notify about completion\n(websocket, async)
Rating API ->Seller Platform (NP): /on_revise
Seller Platform (NP)-->Rating API: ACK
```

## /query

```
title Initializing Order
participant Buyer
participant Buyer Platform
participant Seller Platform (NP)
participant Rating API
participant Ledger
Buyer->Seller Platform (NP): /search
Seller Platform (NP)-->Buyer: ACK
Seller Platform (NP)->Buyer: /on_search
Buyer->Seller Platform (NP): ACK
note over Buyer Platform: Get aggregate rating from ledger
Buyer Platform->Rating API: /query
Rating API -->Buyer Platform: ACK
note right of Rating API: All read operations are \ndone on Data node only, \nand no need for getting \nall nodes of chain involved \nfor this.
Rating API ->Ledger: Cord.Score.fetchScoreFromChain()
Ledger -->Rating API: aggregate_rating
Rating API ->Buyer Platform: /on_query
Buyer Platform-->Rating API: ACK
```