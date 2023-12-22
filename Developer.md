# High Level Developer Guide

## Important Links

1. Telemetry -  https://telemetry.cord.network 
  - Lists all the networks on CORD
  - Lists the nodes in each network

    
2. Explorer: https://apps.cord.network
  - Explore different networks/chain
  - Ability to select the network/chain of interest

    
3. ONDC Staging Network - "Confidex-Alpha"
  - The ONDC staging network is called Confidex-Alpha, which can be used for the testing purpose for now.
  - Some more details on Confidex network are @ https://github.com/dhiway/confidex

    
4. Discord Channel for communication with Dhiway Team -  https://discord.com/invite/YSfBa8JsAM 
  - We suggest to join the discord channel https://discord.com/invite/YSfBa8JsAM for frequent communication and queries
   

## Running CORD node locally

As a first step, you need to run the cord locally on your machine (preferable to have GNU/Linux or Mac machine)

Check https://github.com/dhiway/cord?tab=readme-ov-file#using-docker to run it with docker. 

Once done - You can clone https://github.com/dhiway/cord-demo-scripts and run the yarn func-test to see the accounts being created. You can also run the network-score test script (both needs identities to be created).

The specific sample of creating an account on chain is in https://github.com/dhiway/cord-demo-scripts/blob/develop/src/utils/generateDid.ts#L10

which can be taken up and built into your app.
