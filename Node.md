#### Generate **'node key'**

> [!IMPORTANT]
> A 'node key' is associated with only one node, so for creating 'N' nodes, you need 'N' node keys


In a ledger, each process is not just identified by 'IP:port', but with a specific node-key too, so IP address can change for the given process over time, but node-key is considered as the exact process w.r.to ledger.

`docker run -i -v $(pwd):/data dhiway/cord:develop key generate-node-key --file /data/node.key`

This above command gives the output of public information of nodeKey, something like `12D3KooWMzmZ2g7LBPQuTBsb2HVTszsAToSzXuJJNQzHvbPKWbnq`. This also needs to be stored securely. Also note, similar to key generate, `generate-node-key` too generates a random key for every invocation.
