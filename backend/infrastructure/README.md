# Infrastructure

## k8s

### Prerequisites

- Install kubectl
- Download kube config and place in proper place.
    - Linux
      ```bash
      ~/.kube/config
      ```
    - Windows
      ```bash
      To Do
      ```
- **Private containers registry** - deploying containers using images from private registry requires to provide
  authorization information. To do it, you can provide secret to deployment command **(ex. k8s-deployment.yaml)**. To
  create example secret with authorization data, let's execute command with your kubectl:
  ```bash
  kubectl create secret docker-registry {SECRET_NAME} --docker-server={REGISTRY_SERVER} --docker-username={REGISTRY_LOGIN} --docker-password={REGISTRY_PASSWORD} -n {CLUSTER_NAMESPACE}
  ```
