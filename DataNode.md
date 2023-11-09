> Pre-Requisite
> Create Account and Node Key, Add them to network

## Starting a data node
A data node contains all the nodes from genesis, it should be used for reads

```
Note: Anyone can join the network after the council votes and closes the motion with successful membership and 'wellKnownNode' addition based on the specific keys of the user.
```
To join the network, one should be using the chain specification file 'confidex-alpha.json' provided in [this repository](https://github.com/dhiway/confidex/). Follow below steps to download the file and start the instance on the node.

Note: if you do not have wget, install it using 'brew install wget' 
or Download the confidex-alpha.json from the browser and skip the first command

On a GNU/Linux node:
```
$ wget -c https://raw.githubusercontent.com/dhiway/confidex/main/confidex-alpha.json
$ docker run --network host --name cord --detach -v $(pwd):/data dhiway/cord:develop --name Confidex-${OrgName} --chain /data/confidex-alpha.json  --node-key-file /data/node.key --base-path /data --pruning=archive
$ docker logs --since 1m -f cord
```

On a Mac instance:
```
$ wget -c https://raw.githubusercontent.com/dhiway/confidex/main/confidex-alpha.json
$ export ORG_ID="DHIWAY" # this can be changed as per your org
$ docker run -p 9944:9944 --name cord --detach -v $(pwd):/data dhiway/cord:develop --name Confidex-${ORG_ID} --chain /data/confidex-alpha.json  --node-key-file /data/node.key --base-path /data --unsafe-rpc-external
$ docker logs --since 1m -f cord
```

Once the logs have messages like below you are successfully started.

```
2023-10-29 15:22:55 🔍 Discovered new external address for our node: /ip4/219.65.110.26/tcp/30333/ws/p2p/12D3KooWJ4Z2e5NZMR23Yrk1YtxnQKRJYJW3h7w4Z9mTUMCy3eTS    
2023-10-29 15:22:57 ✨ Imported #32155 (0xcc33…bb8a)    
2023-10-29 15:22:58 💤 Idle (8 peers), best: #32155 (0xcc33…bb8a), finalized #32152 (0x1395…62a1), ⬇ 10.2kiB/s ⬆ 5.8kiB/s    
```
