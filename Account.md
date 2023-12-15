### Create an account and ask for membership.
> [!IMPORTANT]
> Account is associated with only one node, so for creating 'N' nodes, you need 'N' different accounts

You can check [this document](https://docs.cord.network/cord/createaccounts/) for more details of account creation.

Below is the way one would generate an account on CLI.

```
$ docker run -i dhiway/cord:0.9.0 key generate -w 24 -n cord
Secret phrase:       climb extend beyond thing romance eyebrow double ocean knee rebuild under cat spare equip furnace manual play million frame spatial double boring crop else
  Network ID:        cord
  Secret seed:       0x1ef83609b52ffb52e926c10a2cb0e08d75d52698597c4f4da65ae872e38a4523
  Public key (hex):  0x76e64f8bd771044f3c1b4bde24b93bd140184a20d9aa631da85b8c9348f17637
  Account ID:        0x76e64f8bd771044f3c1b4bde24b93bd140184a20d9aa631da85b8c9348f17637
  Public key (SS58): 5EkbvZ2xdbAzhZKs154UrnYPp6hffq4FJ7xvZ58HWMLvvec3
  SS58 Address:      5EkbvZ2xdbAzhZKs154UrnYPp6hffq4FJ7xvZ58HWMLvvec3
```

Notice that every execution of the above command would generate a random key. It is very crucial to store the information in a secure way for future use. Specially the **'secret seed'** from the above command, so one can generate the same keys in any machine/application of user's choice.

#### Install browser extension

One can install [Account management browser extension](https://polkadot.js.org/extension/) which helps in managing the accounts on the laptop.
Import the account created from the above into extension here using the steps mentioned [here](https://docs.cord.network/cord/createaccounts/)
