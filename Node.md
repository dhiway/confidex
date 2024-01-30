#### Generate **'node key'**

> [!IMPORTANT]
> A 'node key' is associated with only one node, so for creating 'N' nodes, you need 'N' node keys

Create `/data` directory to store the generated `node.key`, and update the permissions for this directory using the following commands.

```sh
sudo mkdir -p /data 
sudo chmod 777 /data
```
In a ledger, each process is not just identified by 'IP:port', but with a specific node-key too, so IP address can change for the given process over time, but node-key is considered as the exact process w.r.to ledger.

```sh
docker run -i -v /data:/data dhiway/cord:develop key generate-node-key --file /data/node.key
```

The above command generates a public and private key pair
private key is inside node.key file, and node.key file is generated in /data folder

This above command gives the output of public information of nodeKey, something like `12D3KooWMzmZ2g7LBPQuTBsb2HVTszsAToSzXuJJNQzHvbPKWbnq`. This also needs to be stored securely, and sent to the council for adding the node to the network

> Note
> `generate-node-key` too generates a random key for every invocation.
