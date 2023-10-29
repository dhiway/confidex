
# Confidex Ledger

Confidex (Confidence + Index) is the name for ledger initialized by [ONDC](https://ondc.org). This network is focused on rating and score to start with.

In this document we will try to provide information on how to start and manage the network.


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

`cord key generate-node-key --file node-${org}.key`

This above command gives the output of public information of nodeKey, something like `12D3KooWMzmZ2g7LBPQuTBsb2HVTszsAToSzXuJJNQzHvbPKWbnq`. This also need to be stored securely. Also note, similar to key generate, `generate-node-key` also generates a random key for every invocation.


### Send the account information (public info) to council

Send the information to us through [the google form](https://forms.gle/DXyZR9xj4LseJy1H9)


## Add account as member (membership)

## Add node as well-known node, with the given account.


## Adding a new validator into ledger


## Council activities, and voting for council's motions.

