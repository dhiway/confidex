> Pre-Requisite
> Create Account and Node Key, Add account to network


## Adding a new validator into ledger

```
$ docker ps
## make sure no cord process is running
$ docker run -p 9944:9944 --name cord-validator --detach -v $(pwd):/data dhiway/cord:0.9.0 --name Confidex-${ORG_ID}-validator --chain /data/confidex-alpha.json  --node-key-file /data/node.key --base-path /data --unsafe-rpc-external --validator --pruning=archive
```
> $(pwd) - Current Working Directory
> ORG_ID - Enter your organisation name here - Ex:'Confidex'

More information on what are the parameters to add for running different type of nodes are present in [CORD Documentation](https://docs.cord.network).


NOTE: A node which started without `--pruning=archive`, you may need to perform `docker run -v $(pwd):/data dhiway/cord:0.9.0 purge-chain --chain /data/confidex-alpha.json --base-path /data` before running this.

For becoming 'Validator', there are 2 important steps:

1. set the 'session' keys in the validator process. 
2. needs approval for the given account to be added as the 'authorityMembership'.


After starting the process, one needs to do a 'generate-session-keys' from the secret of the account generated above.

```
docker run -i -v $(pwd):/data dhiway/cord:0.9.0 key generate-session-keys --chain /data/confidex-alpha.json  --base-path /data  --suri $SECRET
grandpa: 5GhwzstFiBGozFCHqzXo9TCNvGJbXYf9mdjhx1H8W2UcPkXz
babe: 5HWYN2LpFFxgs6cYEWNkwwuyC8MraS4kaUeCYHo6fDnm9dQT
im_online: 5HWYN2LpFFxgs6cYEWNkwwuyC8MraS4kaUeCYHo6fDnm9dQT
authority_discovery: 5HWYN2LpFFxgs6cYEWNkwwuyC8MraS4kaUeCYHo6fDnm9dQT
Session Keys: 0xcd589e524dd4302e07a7df839abc8792c8994e91e9c5d790ebac7f86a6c1c6f4f0e196aac23e28c4363ee50d43e83da67ab714b30216b2cb898e5593d0f3873cf0e196aac23e28c4363ee50d43e83da67ab714b30216b2cb898e5593d0f3873cf0e196aac23e28c4363ee50d43e83da67ab714b30216b2cb898e5593d0f3873c
```
Once the session keys are generated, one needs to set the session keys using RPC with respective node.


```
$ export SESSIONKEYS=$('Session Keys:' field from above)
$ git clone https://github.com/dhiway/cord-session-setkey
$ cd cord-session-setkey
$ yarn
$ yarn set-key
```
