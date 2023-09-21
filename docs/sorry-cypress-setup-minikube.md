# Host Sorry-Cypress Locally using Minikube's Kubernetes

Before you proceed, you should setup and start minikube using [this guide](/docs/minikube-setup.md).

---

After minikube has been properly installed and started on your machine, open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following command:

    kubectl apply -f ./.kube/sorry-cypress.yml

That will start full Sorry-Cypress kit, Director, API, Dashboard with MongoDB and Minio Object Storage.

After everything is up and running you will have:

- Sorry-Cypress Director available at `http://kube.local:1234`
- Sorry-Cypress API available at `http://kube.local:4000`
- Sorry-Cypress Dashboard available at `http://kube.local:8080`
- MinIO Object Storage available at `http://kube.local:9000` and `http://storage.sorry-cypress:9000`
  - username: `sorry-cypress`
  - password: `cypress-sorry`

It is configured that by default sorry-cypress-director will have value `secret_key` as Allowed Keys. That value must be sent for `--key` flag, other wise sorry-cypress-director will reject test results.

Example of command how to run your Cypress Tests with your local Sorry-Cypress:

    npx cross-env CURRENTS_API_URL='http://kube.local:1234' cypress-cloud run --record --key secret_key --parallel --ci-build-id ${CYPRESS_CI_BUILD_ID}

Where:

- `${CYPRESS_CI_BUILD_ID}` - unique build identifier used by Sorry-Cypress to distinguish cypress test runs one from another, i.e. `docker-build-001`

> :bangbang: IMPORTANT :bangbang:
>
> If you want to have parallel execution, just run same command **WITH SAME** --ci-build-id flag value in multiple terminals.
