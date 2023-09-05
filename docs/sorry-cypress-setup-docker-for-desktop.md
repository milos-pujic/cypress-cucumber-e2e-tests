# Host Sorry-Cypress Locally using Docker for Desktop

Before you proceed, you should install Docker Desktop depending on your OS and start it:

- [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)
- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

Inside this repository there is [docker-compose-sorry-cypress.yml](/docker-compose-sorry-cypress.yml) Docker Compose file which can be used to locally start full sorry-cypress kit with Docker. Read more on [Sorry-cypress Docker Images](https://docs.sorry-cypress.dev/cloud-setup/docker-images).

After Docker has been installed on your machine, open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following command:

    docker compose -f ./.docker/docker-compose-sorry-cypress.yml up -d 

That will start full Sorry-Cypress kit, Director, API, Dashboard with MongoDB and Minio Object Storage.

After everything is up and running you will have:

- Sorry-Cypress Director available at `http://localhost:1234`
- Sorry-Cypress API available at `http://localhost:4000`
- Sorry-Cypress Dashboard available at `http://localhost:8080`
- MongoDB available at `mongodb://sorry-cypress:cypress-sorry@mongo:27017`
- Minio Object Storage available at `http://localhost:9000`
  - username: `sorry-cypress`
  - password: `cypress-sorry`

It is configured that by default sorry-cypress-director will have value `secret_key` as Allowed Keys. That value must be sent for `--key` flag, other wise sorry-cypress-director will reject test results.

Example of command how to run your Cypress Tests with your local Sorry-Cypress:

    CURRENTS_API_URL='http://localhost:1234' cypress-cloud npx run --record --key secret_key --parallel --ci-build-id ${CYPRESS_CI_BUILD_ID}

Where:

- `${CYPRESS_CI_BUILD_ID}` - unique build identifier used by Sorry-Cypress to distinguish cypress test runs one from another, i.e. `docker-build-001`

> :bangbang: IMPORTANT :bangbang:
>
> If you want to have parallel execution, just run same command **WITH SAME** --ci-build-id flag value in multiple terminals.
