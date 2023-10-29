
# Confidex Ledger

Confidex (Confidence + Index) is the name for ledger initialized by [ONDC](https://ondc.org). This network is focused on rating and score to start with.

In this document we will try to provide information on how to start and manage the network.


### Network Explorer

Dhiway's [CORD Explorer](https://apps.cord.network) is a key component in managing the ledger. As part of the Confidex network, one can open [this link](https://apps.cord.network/?rpc=wss%3A%2F%2Fconfidex-alpha1.cord.network#/explorer) in your browser. Recommended are Chrome, or Firefox browsers.


### Create an account and ask for membership.

Below is the way one would generate an account on CLI.

```
$ cord key generate -w 24                         
Secret phrase:       climb extend beyond thing romance eyebrow double ocean knee rebuild under cat spare equip furnace manual play million frame spatial double boring crop else
  Network ID:        substrate
  Secret seed:       0x1ef83609b52ffb52e926c10a2cb0e08d75d52698597c4f4da65ae872e38a4523
  Public key (hex):  0x76e64f8bd771044f3c1b4bde24b93bd140184a20d9aa631da85b8c9348f17637
  Account ID:        0x76e64f8bd771044f3c1b4bde24b93bd140184a20d9aa631da85b8c9348f17637
  Public key (SS58): 5EkbvZ2xdbAzhZKs154UrnYPp6hffq4FJ7xvZ58HWMLvvec3
  SS58 Address:      5EkbvZ2xdbAzhZKs154UrnYPp6hffq4FJ7xvZ58HWMLvvec3
```

This works when one has the CLI accessible in shell. Or one can use below command for without binary.

`docker run -i dhiway/cord:develop key generate -w 24`

Notice that every execution of `cord key generate` would generate a random key. It is very crucial to store the information in a secure way for future use. Specially the **'secret seed'** from the above command, so one can generate the same keys in any machine/application of user's choice.

#### Install polkadot extension

One can install [Polkadot.JS browser extension](https://polkadot.js.org/extension/) which helps in managing the accounts on the laptop.


#### Generate **'node key'**

In a ledger, each process is not just identified by 'IP:port', but with a specific node-key too, so IP address can change for the given process over time, but node-key is considered as the exact process w.r.to ledger.

`cord key generate-node-key --file ./node.key`

If you have docker:

`docker run -i -v $(pwd):/data dhiway/cord:develop key generate-node-key --file /data/node.key`

This above command gives the output of public information of nodeKey, something like `12D3KooWMzmZ2g7LBPQuTBsb2HVTszsAToSzXuJJNQzHvbPKWbnq`. This also needs to be stored securely. Also note, similar to key generate, `generate-node-key` too generates a random key for every invocation.


### Send the account information (public info) to council

Send the information to us through [the google form](https://forms.gle/DXyZR9xj4LseJy1H9)


## Add account as member (membership)

## Add node as well-known node, with the given account.

## Starting a node

Anyone can join the network after the council votes and closes the motion with successful membership and 'wellKnownNode' addition based on the specific keys of the user.

To join the network, one should be using the chain specification file provided in [this repository](https://raw.githubusercontent.com/dhiway/confidex/main/confidex-alpha.json). Follow below steps to get the instance started on the node.

```
$ wget -c https://raw.githubusercontent.com/dhiway/confidex/main/confidex-alpha.json
$ docker run --network host --name cord --detach -v $(pwd):/data dhiway/cord:develop --name $NAME_YOU_WANT --chain /data/confidex-alpha.json  --node-key-file /data/node.key --base-path /data
$ docker logs --since 1m -f cord
```

Once the logs have messages like below you are successfully started.

```
2023-10-29 15:22:55 🔍 Discovered new external address for our node: /ip4/219.65.110.26/tcp/30333/ws/p2p/12D3KooWJ4Z2e5NZMR23Yrk1YtxnQKRJYJW3h7w4Z9mTUMCy3eTS    
2023-10-29 15:22:57 ✨ Imported #32155 (0xcc33…bb8a)    
2023-10-29 15:22:58 💤 Idle (8 peers), best: #32155 (0xcc33…bb8a), finalized #32152 (0x1395…62a1), ⬇ 10.2kiB/s ⬆ 5.8kiB/s    
```

## Adding a new validator into ledger

One has to go through another set of account and node-id creation before validator.

After approval, one needs to start the same cord command with extra parameters `--validator --pruning=archive`.

After starting, one needs to do a 'generate-session-keys' from the secret of the account generated above.

```
cord key generate-session-keys --chain ./confidex-alpha.json  --base-path $(pwd)  --suri '0x1ef83609b52ffb52e926c10a2cb0e08d75d52698597c4f4da65ae872e38a4523'
```


## Council activities, and voting for council's motions.

<SCREENSHOTs of EXPLORER>
