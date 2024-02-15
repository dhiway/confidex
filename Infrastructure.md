# CORD Node - System Requirements for various types of nodes

|   | Data Node | RPC Node | Validator | Boot Node |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| **CPU**  | 4  | 2  | 4 | 2 |
| **Memory(GB)**  | 32  | 8 | 32 | 8 |
| **Storage**  | 1 TB external SSD drive attachable disk and 40 GB boot disk  | 50 GB  | 1 TB (The disk must be attachable) | 50 GB |
| **Min Instances**  | 2  | 1 | 3 | 2 |



#  CORD Node - System Requirements in terms of type of VMs in GCP and AWS

|   | Data Node | RPC Node | Validator  | Boot Node |
| --- | --- | ---| --- | --- |
|**GCP**|n2-standard-4|e2-medium|n2-standard-4|e2-medium|
|**AWS**|t2.xlarge / t3.xlarge |t2.large / t3.large |t2.xlarge / t3.xlarge|t2.large / t3.large|



# PORTS

| Ports| Needed for |
|---|---|
| 22 | SSH (22) is required for setup and any debug/maintenance activity, This is needed for nodes to which we need a SSH connection |
| 80, 443 | For application access, it is recommended to have nginx (webserver, HTTP-80, HTTPS-443) frontend the requests. So, port 80 and 443 open is required. Typically for RPC nodes|
| 30333 | We need port 30333 open for blockchain internal traffic, for all nodes in the chain |








