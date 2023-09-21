# Host Sorry-Cypress Locally using Docker for Desktop

Before you proceed, you should install Docker Desktop depending on your OS and start it:

- [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)
- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

As Docker for Desktop is **paid** software now, instead of it you can setup and start minikube using [this guide](/docs/minikube-setup.md).

---

Inside this repository there are:

- [docker-compose-sorry-cypress.yml](/.docker/docker-compose-sorry-cypress.yml)
- [docker-compose-sorry-cypress-minikube.yml](/.docker/docker-compose-sorry-cypress-minikube.yml)

Docker Compose files which can be used (with Docker for Desktop and minikube as Docker for Desktop alternative, respectively) to locally start full Sorry-Cypress kit with Docker. Read more on [Sorry-cypress Docker Images](https://docs.sorry-cypress.dev/cloud-setup/docker-images).

After Docker for Desktop, or minikube, has been installed on your machine, open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following command:

- Docker for Desktop:

      docker compose -f ./.docker/docker-compose-sorry-cypress.yml up -d

- minikube:

      docker compose -f ./.docker/docker-compose-sorry-cypress-minikube.yml up -d

That will start full Sorry-Cypress kit, Director, API, Dashboard with MongoDB and MinIO Object Storage.

After everything is up and running you will have:

- Sorry-Cypress Director available at:
  - Docker for Desktop: `http://localhost:1234`
  - minikube: `http://kube.local:1234`
- Sorry-Cypress API available at:
  - Docker for Desktop: `http://localhost:4000`
  - minikube: `http://kube.local:4000`
- Sorry-Cypress Dashboard available at:
  - Docker for Desktop: `http://localhost:8080`
  - minikube: `http://kube.local:8080`
- MongoDB available at:
  - Docker for Desktop: `mongodb://sorry-cypress:cypress-sorry@localhost:27017`
  - minikube: `mongodb://sorry-cypress:cypress-sorry@kube.local:27017`
- MinIO Object Storage available at:
  - Docker for Desktop: `http://localhost:9000`
    - username: `sorry-cypress`
    - password: `cypress-sorry`
  - minikube: `http://storage:9000`
    - username: `sorry-cypress`
    - password: `cypress-sorry`

It is configured that by default sorry-cypress-director will have value `secret_key` as Allowed Keys. That value must be sent for `--key` flag, other wise sorry-cypress-director will reject test results.

Example of command how to run your Cypress Tests with your local Sorry-Cypress:

- Docker for Desktop:

      npx cross-env CURRENTS_API_URL='http://localhost:1234' cypress-cloud run --record --key secret_key --parallel --ci-build-id ${CYPRESS_CI_BUILD_ID}

- minikube:

      npx cross-env CURRENTS_API_URL='http://kube.local:1234' cypress-cloud run --record --key secret_key --parallel --ci-build-id ${CYPRESS_CI_BUILD_ID}

Where:

- `${CYPRESS_CI_BUILD_ID}` - unique build identifier used by Sorry-Cypress to distinguish cypress test runs one from another, i.e. `docker-build-001`

> :bangbang: IMPORTANT :bangbang:
>
> If you want to have parallel execution, just run same command **WITH SAME** --ci-build-id flag value in multiple terminals.
