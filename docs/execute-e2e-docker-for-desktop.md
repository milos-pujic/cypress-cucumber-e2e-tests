# Execute E2E Cypress Cucumber Tests using Docker for Desktop locally

Before you proceed, you should install Docker Desktop depending on your OS and start it:

- [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)
- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

After Docker has been installed on your machine, open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following commands:

    docker compose build
    docker compose up -d 

That will:

1. Build Docker Image containing Cypress and your Tests
2. Start Restful Booker Platform locally
    - Available at `http://localhost`.
3. Start Sorry-Cypress Locally
    - Director available at `http://localhost:1234`
    - API available at `http://localhost:4000`
    - Dashboard available at `http://localhost:8080`
    - MongoDB available at `mongodb://sorry-cypress:cypress-sorry@mongo:27017`
    - Minio Object Storage available at `http://localhost:9000`
      - username: `sorry-cypress`
      - password: `cypress-sorry`
4. Execute Tests in parallel using Local Restful Booker Platform and Local Sorry Cypress.

Progress and results can be followed on Sorry-Cypress Dashboard `http://localhost:8080` under run named `chrome_YYYY-MM-DD_HH:MM`.
