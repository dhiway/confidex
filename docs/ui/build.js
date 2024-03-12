let build_spec = {"openapi":"3.0.0","info":{"title":"Issue and Grievance Management (IGM) for ONDC","description":"ONDC Issue and Grievance Management (IGM)  API Specification","version":"1.0.0"},"security":[{"SubscriberAuth":[]}],"paths":{"/publish":{"post":{"tags":["Rating API Server"],"description":"Publish the ratings to the chain, for the given transaction / message ID","operationId":"publishRatings","requestBody":{"description":"Write the ratings to the chain. Notice that this can take 1 or more entries from the NP (Network Participant) and submit it to the API (which inturn will write to the chain).","content":{"application/json":{"schema":{"$ref":"#/components/schemas/PublishRating"}}},"required":"true"},"responses":{"default":{"$ref":"#/components/schemas/DefaultResponse"}}}},"/on_publish":{"post":{"tags":["Rating API Client (NP)"],"description":"Inform the client about success or failure of the publish rating","operationId":"onPublishRating","requestBody":{"description":"Callback of publish rating operation to the chain. Considering the /publish call will have multiple entries, this can collate all the entries and send the response, upon completion.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/OnPublishRating"}}},"required":"true"},"responses":{"default":{"$ref":"#/components/schemas/DefaultResponse"}}}},"/revise":{"post":{"tags":["Rating API Server"],"description":"Revise ratings in the chain. This can happen due to 2 reasons. 1 is when the user themself changes the given rating over the period (possible for seller to settle bad rating with the buyer), or some discrepancies are found during the auditing.","operationId":"reviseRatings","requestBody":{"description":"revise the ratings","content":{"application/json":{"schema":{"$ref":"#/components/schemas/ReviseRating"}}},"required":"true"},"responses":{"default":{"$ref":"#/components/schemas/DefaultResponse"}}}},"/on_revise":{"post":{"tags":["Rating API Client (NP)"],"description":"Callback of the revise operation on the chain.","operationId":"onReviseRating","requestBody":{"description":"update the ratings","content":{"application/json":{"schema":{"$ref":"#/components/schemas/OnReviseRating"}}},"required":"true"},"responses":{"default":{"$ref":"#/components/schemas/DefaultResponse"}}}},"/query":{"post":{"tags":["Rating API Server"],"description":"Read aggregate score, read all given entities ratings, more details based on parameters","operationId":"Query","requestBody":{"description":"query the score","content":{"application/json":{"schema":{"$ref":"#/components/schemas/QueryRating"}}},"required":"true"},"responses":{"default":{"$ref":"#/components/schemas/DefaultResponse"}}}},"/on_query":{"post":{"tags":["Rating API Client (NP)"],"description":"Response / Callback to the query call","operationId":"onQuery","requestBody":{"description":"query the ratings / score","content":{"application/json":{"schema":{"$ref":"#/components/schemas/OnQueryRating"}}},"required":"true"},"responses":{"200":{"description":"Aggregated Score details","content":{"application/json":{"schema":{"$ref":"#/components/schemas/200_Res"}}}},"400":{"description":"Invalid parameters","content":{"application/json":{"schema":{"$ref":"#/components/schemas/Error"}}}}}}}},"components":{"securitySchemes":{"SubscriberAuth":{"type":"apiKey","in":"header","name":"Authorization","description":"Signature of message body using Collector or Receiver subscriber's signing public key. <br/><br/>Format:<br/><br/><code>Authorization : Signature keyId=\"{subscriber_id}|{unique_key_id}|{algorithm}\",algorithm=\"ed25519\",created=\"1606970629\",expires=\"1607030629\",headers=\"(created) (expires) digest\",signature=\"Base64(signing string)\"</code>"}},"schemas":{"Error":{"description":"Describes an error object","type":"object","properties":{"type":{"type":"string","enum":["CONTEXT-ERROR","CORE-ERROR","DOMAIN-ERROR","POLICY-ERROR","JSON-SCHEMA-ERROR"]}}},"DefaultResponse":{"description":"Acknowledgement of message received after successful validation of schema and signature","content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"object","properties":{"ack":{"allOf":[{"$ref":"#/components/schemas/Ack"},{"type":"object"},{"properties":{"status":{"enum":["ACK","NACK"]}}}]}},"required":["ack"]},"error":{"$ref":"#/components/schemas/Error"}},"required":["message"]}}}},"200_Res":{"type":"object","properties":{"ack":{"$ref":"#/components/schemas/Ack"}}},"Ack":{"description":"Describes the acknowledgement sent in response to an API call. If the implementation uses HTTP/S, then Ack must be returned in the same session. Every API call to a BPP must be responded to with an Ack whether the BPP intends to respond with a callback or not. This has one property called `status` that indicates the status of the Acknowledgement.","type":"object","additionalProperties":false,"properties":{"status":{"type":"string","description":"The status of the acknowledgement. If the request passes the validation criteria of the BPP, then this is set to ACK. If a BPP responds with status = `ACK` to a request, it is required to respond with a callback. If the request fails the validation criteria, then this is set to NACK. Additionally, if a BPP does not intend to respond with a callback even after the request meets the validation criteria, it should set this value to `NACK`.","enum":["ACK","NACK"]}}},"Descriptor":{"description":"Physical description of something.","type":"object","additionalProperties":false,"properties":{"name":{"type":"string"},"code":{"type":"string"},"short_desc":{"type":"string"},"long_desc":{"type":"string"},"additional_desc":{"type":"object","additionalProperties":false,"properties":{"url":{"type":"string"},"content_type":{"type":"string","enum":["text/plain","text/html","application/json"]}}}}},"Tag":{"description":"Describes a tag. This is used to contain extended metadata. This object can be added as a property to any schema to describe extended attributes. For BAPs, tags can be sent during search to optimize and filter search results. BPPs can use tags to index their catalog to allow better search functionality. Tags are sent by the BPP as part of the catalog response in the `on_search` callback. Tags are also meant for display purposes. Upon receiving a tag, BAPs are meant to render them as name-value pairs. This is particularly useful when rendering tabular information about a product or service.","type":"object","additionalProperties":false,"properties":{"descriptor":{"description":"Description of the Tag, can be used to store detailed information.","allOf":[{"$ref":"#/components/schemas/Descriptor"}]},"value":{"description":"The value of the tag. This set by the BPP and rendered as-is by the BAP.","type":"string"},"display":{"description":"This value indicates if the tag is intended for display purposes. If set to `true`, then this tag must be displayed. If it is set to `false`, it should not be displayed. This value can override the group display value.","type":"boolean"}}},"TagGroup":{"description":"A collection of tag objects with group level attributes. For detailed documentation on the Tags and Tag Groups schema go to https://github.com/beckn/protocol-specifications/discussions/316","type":"object","additionalProperties":false,"properties":{"display":{"description":"Indicates the display properties of the tag group. If display is set to false, then the group will not be displayed. If it is set to true, it should be displayed. However, group-level display properties can be overridden by individual tag-level display property. As this schema is purely for catalog display purposes, it is not recommended to send this value during search.","type":"boolean","default":true},"descriptor":{"description":"Description of the TagGroup, can be used to store detailed information.","allOf":[{"$ref":"#/components/schemas/Descriptor"}]},"list":{"description":"An array of Tag objects listed under this group. This property can be set by BAPs during search to narrow the `search` and achieve more relevant results. When received during `on_search`, BAPs must render this list under the heading described by the `name` property of this schema.","type":"array","items":{"$ref":"#/components/schemas/Tag"}}}},"OnPublishResult_20x":{"type":"object","properties":{"status":{"type":"boolean","example":"true"},"did":{"type":"string","example":"did:cord:3vYxCfRTWVJM8WYP39KFs2FMtpfBTmSjMexRnqeLbf5dmVQF"},"message_id":{"type":"string"},"referenceId":{"type":"string","example":"rating:cord:r35tLfL1ouJhXLGqnGM4rK9hCM5RQrpjNN47KZ8cEBQbdoKtn"}}},"PublishRating":{"type":"object","properties":{"context":{"$ref":"#/components/schemas/Context"},"message":{"$ref":"#/components/schemas/PublishMessage"}}},"OnPublishRating":{"type":"object","properties":{"context":{"$ref":"#/components/schemas/Context"},"message":{"$ref":"#/components/schemas/OnPublishResult_20x"}}},"OnReviseResult_20x":{"type":"object","properties":{"status":{"type":"boolean","example":"true"},"did":{"type":"string","example":"did:cord:3vYxCfRTWVJM8WYP39KFs2FMtpfBTmSjMexRnqeLbf5dmVQF"},"message_id":{"type":"string"},"rating_identifier":{"type":"string","example":"rating:cord:r35tLfL1ouJhXLGqnGM4rK9hCM5RQrpjNN47KZ8cEBQbdoKtn"}}},"ReviseRating":{"type":"object","properties":{"context":{"$ref":"#/components/schemas/Context"},"message":{"$ref":"#/components/schemas/ReviseMessage"}}},"OnReviseRating":{"type":"object","properties":{"context":{"$ref":"#/components/schemas/Context"},"message":{"$ref":"#/components/schemas/OnReviseResult_20x"}}},"QueryRating":{"type":"object","properties":{"context":{"$ref":"#/components/schemas/Context"},"message":{"$ref":"#/components/schemas/QueryMessage"}}},"QueryMessage":{"type":"object","properties":{"entity_list":{"type":"array","items":{"type":"object","properties":{"entityUid":{"type":"string","example":"286cf1b1-3e16-448f-b675-3b232e82174d"},"ratingType":{"type":"string","example":"Overall"},"entityType":{"type":"string","example":"Retail"}}}}}},"OnQueryRating":{"type":"object","properties":{"context":{"$ref":"#/components/schemas/Context"},"message":{"type":"object","properties":{"scores":{"type":"array","items":{"type":"object","properties":{"entityUid":{"type":"string","example":"286cf1b1-3e16-448f-b675-3b232e82174d"},"entityName":{"type":"string"},"score":{"type":"number","example":3.7},"totalRating":{"type":"number","example":280},"countOfTxn":{"type":"number","example":73}}}}}}}},"Context":{"type":"object","properties":{"domain":{"type":"string","example":"seller-rating"},"action":{"type":"string","example":"/on_publish"},"version":{"type":"string","example":"0.0.1"},"provider_uid":{"type":"string","example":"446c67bd-9aa7-4aef-8d62-c69e3a669ce0"},"provider_id":{"type":"string","example":"All in One - Market Place"},"confidex_did":{"type":"string","example":"did:cord:3vYxCfRTWVJM8WYP39KFs2FMtpfBTmSjMexRnqeLbf5dmVQF"},"registry_id":{"type":"string","example":"Confidex - Rating Provider Registry's ID"},"transaction_id":{"description":"The transaction ID to be kept same across revisions","type":"string"},"message_id":{"description":"The message ID is unique to every call, and should be used to match the callback","type":"string"},"timestamp":{"type":"string","example":"2021-06-29T10:52:01.620Z"},"key":{"type":"string"},"ttl":{"type":"string"},"location":{"type":"object","example":"currently empty, but can be used in future for different contexts of network"}}},"PublishMessage":{"type":"object","properties":{"rating":{"description":"List of entity ratings","type":"array","items":{"$ref":"#/components/schemas/PublishEntry"}}}},"ReviseMessage":{"type":"object","properties":{"rating":{"description":"List of entity rating to be revised","type":"array","items":{"$ref":"#/components/schemas/ReviseEntry"}},"referenceId":{"type":"string","example":"rating:cord:r35tLfL1ouJhXLGqnGM4rK9hCM5RQrpjNN47KZ8cEBQbdoKtn"}}},"PublishEntry":{"type":"object","properties":{"entity_uid":{"type":"string","example":"226c67bd-9aa7-4aef-8d62-c69e3a669ce0"},"entity_id":{"type":"string","example":"Gupta Kirana Store"},"entityType":{"type":"string","example":"Retail"},"ratingType":{"type":"string","example":"Overall"},"countOfTxn":{"type":"number","example":"100"},"totalRating":{"type":"number","example":"320"}}},"ReviseEntry":{"type":"object","properties":{"entityType":{"type":"string","example":"Retail"},"ratingType":{"type":"string","example":"Overall"},"countOfTxn":{"type":"number","example":"80"},"totalRating":{"type":"number","example":"280"}}}}},"servers":[{"description":"Staging Network","url":"https://virtserver.swaggerhub.com/ONDC/ONDC-Protocol-Rating/0.0.1"}],"x-enum":{"publish":{"message":{"rating":{"entityType":[{"code":"Overall","description":"Overall Experience","reference":"<PR/Issue/Discussion Links md format text"},{"code":"Delivery","description":"Delivery Experience","reference":"<PR/Issue/Discussion Links md format text"}]}}},"revise":{"message":{"rating":{"entityType":[{"code":"Overall","description":"Overall Experience","reference":"<PR/Issue/Discussion Links md format text"},{"code":"Delivery","description":"Delivery Experience","reference":"<PR/Issue/Discussion Links md format text"}]}}},"query":{"message":{"rating":{"entityType":[{"code":"Overall","description":"Overall Experience","reference":"<PR/Issue/Discussion Links md format text"},{"code":"Delivery","description":"Delivery Experience","reference":"<PR/Issue/Discussion Links md format text"}]}}},"on_query":{"message":{"rating":{"entityType":[{"code":"Overall","description":"Overall Experience","reference":"<PR/Issue/Discussion Links md format text"},{"code":"Delivery","description":"Delivery Experience","reference":"<PR/Issue/Discussion Links md format text"}]}}}},"x-tags":{"publish":{"message":{"rating":{"tags":[{"code":"GENERAL_INFO","description":"Describes the general information of the rating like rating, count, entity name","reference":"<PR/Issue/Discussion Links md format text>","list":[{"code":"RATING_COUNT","description":"Number of ratings received for an entity","reference":"<PR/Issue/Discussion Links md format text>"}]}]}}}},"x-flows":[{"summary":"Rating Flow","details":[{"description":"Detailed process of Market Place publishing the entry","mermaid":"sequenceDiagram\n     participant MARKET PLACE\n     participant API\n     participant CORD.JS\n     participant CONFIDEX\n     MARKET PLACE->>API: /publish\n     note over MARKET PLACE,API: Sign and send the rating entry\n     API->>MARKET PLACE: Ack\n     API->>CORD.JS: Signed entry\n     CORD.JS->>CORD.JS: Verify and transform entry\n     CORD.JS->>API: transformedEntry\n     API->>CORD.JS:Call Cord.Score.buildFromRatingProperties\n     note over API, CORD.JS: Input: transformedEntry\n     CORD.JS->>CONFIDEX: Call register_rating method\n     CONFIDEX->>CORD.JS: Extrinsic\n     CORD.JS->>API: Extrinsic\n     API->>CORD.JS: Cord.Score.dispatchRatingToChain\n     note over API,CORD.JS: Input: Extrinsic\n     CORD.JS->>CONFIDEX: Anchors the extrinsic to the chain\n     CONFIDEX->>CORD.JS: Rating Identifier\n     CORD.JS->>API: Rating Identifier\n     API->>MARKET PLACE: (/on_publish)Rating Identifier \n     MARKET PLACE->>API: ACK"},{"description":"Detailed process of Market Place revising the entry","mermaid":"sequenceDiagram\n  participant MARKET PLACE\n  participant API\n  participant CORD.JS\n  participant CONFIDEX\n  MARKET PLACE ->> API: /revise \n  note over MARKET PLACE, API: Sign and send RatingEntry, Revised Entry\n  API->>MARKET PLACE: Ack\n  API->>CORD.JS: RatingEntry\n  CORD.JS->>CORD.JS: verify and transform entry\n  CORD.JS ->> API: transformedEntry\n  note over API,CORD.JS: Input: transformedEntry\n  API->>CORD.JS: Call Cord.Score.buildFromRevokeRatingProperties\n  CORD.JS->>CONFIDEX: Call revoke_rating method\n  CONFIDEX->>CORD.JS: Extrinsic\n  CORD.JS->>API: Extrinsic\n  API->>CORD.JS: Call Cord.Score.dispatchRevokeRatingToChain\n  note over API,CORD.JS: Input: Extrinsic\n  CORD.JS->>CONFIDEX: Anchors the extrinsic to the chain\n  CONFIDEX->>CORD.JS: Rating Identifier\n  CORD.JS->>API: Rating Identifier\n  API->>MARKET PLACE: Rating Identifier\n\n  API->>CORD.JS: revisedEntry\n  CORD.JS->>CORD.JS: verify and transform entry\n  CORD.JS ->> API: transformedEntry\n\n  API->>CORD.JS: Call Cord.Score.buildFromRatingProperties\n  note over API,CORD.JS: Input: transformedEntry\n  CORD.JS->>CONFIDEX: Call revise_rating method\n  CONFIDEX->>CORD.JS: Extrinsic\n  CORD.JS->>API: Extrinsic\n  API->>CORD.JS: Call Cord.Score.dispatchReviseRatingToChain\n  note over API,CORD.JS: Input: Extrinsic\n  CORD.JS->>CONFIDEX: Anchors the extrinsic to the chain\n  CONFIDEX->>CORD.JS: Rating Identifier\n  CORD.JS->>API: Rating Identifier\n  API->>MARKET PLACE: (/on_revise) Rating Identifier\n  MARKET PLACE->>API: ACK"},{"description":"Detailed process of Market Place querying the entry","mermaid":"sequenceDiagram\n  participant MARKET PLACE\n  participant API\n  participant CORD.JS\n  participant CONFIDEX\n  MARKET PLACE->>API:/query\n  note over MARKET PLACE,API: Input: rating identifier, ScoreRatingTypeOf\n  API->>CORD.JS: Call Cord.Score.fetchFromChain()\n  CORD.JS->>CONFIDEX: Call api.query.score.aggregateScore()\n  CONFIDEX->>CORD.JS: Encoded score\n  CORD.JS->>CORD.JS: Decode the encoded score\n  CORD.JS->>API: Decoded Score\n  API->>MARKET PLACE: (/on_query) Decoded Score\n  MARKET PLACE->>API: ACK"}]}],"x-examples":{"score":{"summary":"Rating API Implemention","description":"Rating Example","example_set":{"publish":{"examples":[{"summary":"publish","description":"Publish Rating","value":{"context":{"domain":"seller-rating","action":"/on_publish","version":"0.0.1","messageId":"3bcef961-cad5-456b-af85-91a7a3efe956","provider_uid":"446c67bd-9aa7-4aef-8d62-c69e3a669ce0","provider_id":"All in One - Market Place","confidex_did":"did:cord:3vYxCfRTWVJM8WYP39KFs2FMtpfBTmSjMexRnqeLbf5dmVQF","registry_id":"Confidex - Rating Provider Registry's ID","transaction_id":"string","timestamp":"2021-06-29T10:52:01.620Z","key":"string","ttl":"string","location":{"country":"India"},"rating":[{"entity_uid":"226c67bd-9aa7-4aef-8d62-c69e3a669ce0","entity_id":"Gupta Kirana Store","entityType":"Retail","ratingType":"Overall","countOfTxn":100,"totalRating":320}]}}}]},"on_publish":{"examples":[{"summary":"on_publish","description":"On Publish","value":{"context":{"domain":"ONDC:FIS12","country":"IND","city":"*","action":"on_issue","core_version":"1.0.0","bap_id":"buyerapp.com","bap_uri":"https://buyerapp.com/ondc","bpp_id":"sellerapp.com","bpp_uri":"https://sellerapp.com/ondc","transaction_id":"T1","message_id":"M1","timestamp":"2023-01-15T10:10:00.142Z"},"message":{"issue":{"id":"1","issue_actions":{"respondent_actions":[{"respondent_action":"PROCESSING","short_desc":"Complaint is being processed","updated_at":"2023-01-15T10:10:00.142Z","updated_by":{"org":{"name":"sellerapp.com/ondc"},"contact":{"phone":"9450394140","email":"respondentapp@respond.com"},"person":{"name":"Jane Doe"}},"cascaded_level":1}]},"created_at":"2023-01-15T10:00:00.469Z","updated_at":"2023-01-15T10:10:00.142Z"}}}}]},"revise":{"examples":[{"summary":"revise","description":"TBD","value":{"context":{"domain":"ONDC:FIS12","country":"IND","city":"*","action":"issue_status","core_version":"1.0.0","bap_id":"buyerapp.com","bap_uri":"https://buyerapp.com/ondc","bpp_id":"sellerapp.com","bpp_uri":"https://sellerapp.com/ondc","transaction_id":"T1","message_id":"M2","timestamp":"2023-01-15T10:30:00.469Z","ttl":"PT30S"},"message":{"issue_id":"1"}}}]},"on_revise":{"examples":[{"summary":"on_revise","description":"TBD","value":{"context":{"domain":"ONDC:FIS12","country":"IND","city":"*","action":"on_issue_status","core_version":"1.0.0","bap_id":"buyerapp.com","bap_uri":"https://buyerapp.com/ondc","bpp_id":"sellerapp.com","bpp_uri":"https://sellerapp.com/ondc","transaction_id":"T1","message_id":"M2","timestamp":"2023-01-15T10:31:00.523Z"},"message":{"issue":{"id":"1","issue_actions":{"respondent_actions":[{"respondent_action":"PROCESSING","short_desc":"Complaint is being processed","updated_at":"2023-01-15T10:10:00.142Z","updated_by":{"org":{"name":"sellerapp.com"},"contact":{"phone":"9450394140","email":"respondentapp@respond.com"},"person":{"name":"Jane Doe"}},"cascaded_level":1},{"respondent_action":"RESOLVED","short_desc":"Complaint resolved","updated_at":"2023-01-15T10:31:00.523Z","updated_by":{"org":{"name":"sellerapp.com::ONDC:RET10"},"contact":{"phone":"9450394140","email":"respondentapp@respond.com"},"person":{"name":"Jane Doe"}},"cascaded_level":1}]},"created_at":"2023-01-15T10:00:00.469Z","updated_at":"2023-01-15T10:31:00.523Z","resolution_provider":{"respondent_info":{"type":"TRANSACTION-COUNTERPARTY-NP","organization":{"org":{"name":"sellerapp.com::ONDC:RET10"},"contact":{"phone":"9059304940","email":"email@resolutionproviderorg.com"},"person":{"name":"resolution provider org contact person name"}},"resolution_support":{"chat_link":"http://chat-link/respondent","contact":{"phone":"9949595059","email":"respondantemail@resolutionprovider.com"},"gros":[{"person":{"name":"Sam D"},"contact":{"phone":"9605960796","email":"email@gro.com"},"gro_type":"TRANSACTION-COUNTERPARTY-NP-GRO"}]}}},"resolution":{"short_desc":"Loan disbursed","long_desc":"For this complaint, loan is now disbursed","action_triggered":"CANCEL","refund_amount":"100"}}}}}]}}}},"x-attributes":{"rating":{"attribute_set":{"publish":{"message":{"rating":{"id":{"required":true,"type":false,"owner":false,"usage":false,"description":false}}}},"on_publish":{"message":{"rating":{"id":{"required":false,"type":false,"owner":false,"usage":false,"description":false}}}},"revise":{"message":{"rating":{"id":{"required":false,"type":false,"owner":false,"usage":false,"description":false}}}},"on_revise":{"message":{"rating":{"id":{"required":false,"type":false,"owner":false,"usage":false,"description":false}}}}}}}}