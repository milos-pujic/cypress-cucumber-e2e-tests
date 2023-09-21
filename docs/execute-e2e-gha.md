# Execute E2E Cypress Cucumber Tests using Github Actions Workflows on GitHub

All Github Actions Workflows are configured in [**GitHub Folder**](/.github/workflows/) yml files.

They all can be found by navigating to [GitHub Repository > Actions](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions).

![GitHub Actions Workflows](/docs/imgs/GitHub-Actions.png)

There are 3 GitHub Actions Workflows setup for Cypress Cucumber E2E Tests repository:

- [Run All E2E Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all.yml)
- [Run All E2E Tests with Sorry-Cypress](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all-with-sorry-cypress.yml)
- [Sanity Check](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/sanity-check.yml)

## Run All E2E Tests

This GitHub Action Workflow Executes All Cypress Cucumber E2E Tests on `local` (default) or `prod` environnement using `electron` (default), `chrome`, `firefox` or `edge` browser from defined branch (by default it is `main`).

If `local` environnement is selected, Restful Booker Platform will be started inside GitHub Services and tests will run against it.
If `prod` environnement is selected, tests will run against live version of Restful Booker Platform available at [automationintesting.online](https://automationintesting.online/).

GitHub Action Workflow configuration file of this workflow is [run-all.yml](/.github/workflows/run-all.yml).

This workflow is only triggered Manually. Steps to trigger it:

1. Open [Run All E2E Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all.yml)
2. Click on `Run workflow` button
    - (which opens sub-modal where `Branch`, `Environnement to run Tests`, `Browser in which to run Tests` and `Skip Test with Known Bugs` can be selected)
3. Select `Branch`, `Environnement to run Tests`, `Browser in which to run Tests` and `Skip Test with Known Bugs`
4. Click on `Run workflow` button

![Run All E2E Tests](/docs/imgs/Run-All-E2E-Tests.png)

Also, on [Run All E2E Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all.yml) page, status of all on-going and previously executed 'Run All E2E Tests' Workflow runs can be found.

## Run All E2E Tests with Sorry-Cypress

>:bangbang: IMPORTANT :bangbang:
>
>If you want to execute this GitHub Action you MUST have Sorry Cypress instance accessible by GitHub Action runner, meaning that you will need to have publicly accessible Sorry-Cypress. One of the examples on how you can have publicly accessible Sorry Cypres is to [Host Sorry-Cypress Publicly on AWS](/docs/sorry-cypress-setup-aws.md).
>
>Workflow is configured to fetch Director URL and Allowed Keys from Project's Secretes and variables under CYPRESS_DIRECTOR_URL and CYPRESS_RECORD_KEY. They need to be populated with correct values to make integration with Sorry-Cypress working.

This GitHub Action Workflow Executes All Cypress Cucumber E2E Tests in parallel with Sorry-Cypress on `local` (default) or `prod` environnement using all `electron`, `chrome`, `edge` and `firefox` browsers from defined branch (by default it is `main`).

If `local` environnement is selected, Restful Booker Platform will be started inside GitHub Services and tests will run against it.
If `prod` environnement is selected, tests will run against live version of Restful Booker Platform available at [automationintesting.online](https://automationintesting.online/).

Parallel execution is achieved using:

- GitHub Action Strategy Matrix - Automatically create multiple job runs, from single job, that are based on the combinations of the variables
- Sorry Cypress - An open-source, on-premise, self-hosted alternative to Cypress Cloud

GitHub Action Workflow configuration file of this workflow is [run-all-with-sorry-cypress.yml](/.github/workflows/run-all-with-sorry-cypress.yml).

This workflow is only triggered Manually. Steps to trigger it:

1. Open [Run All E2E Tests with Sorry-Cypress](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all-with-sorry-cypress.yml)
2. Click on `Run workflow` button
    - (which opens sub-modal where `Branch`, `Environnement to run Tests` and `Skip Test with Known Bugs` can be selected)
3. Select `Branch`, `Environnement to run Tests` and `Skip Test with Known Bugs`
4. Click on `Run workflow` button

![Run All E2E Tests with Sorry-Cypress](/docs/imgs/Run-All-E2E-Tests-with-Sorry-Cypress.png)

Also, on [Run All E2E Tests with Sorry-Cypress](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all-with-sorry-cypress.yml) page, status of all on-going and previously executed 'Run All E2E Tests with Sorry-Cypress' Workflow runs can be found.

## Sanity Check

This GitHub Action Workflow Executes `@sanity` tagged scenarios of Cucumber E2E Tests on `local` environnement using `electron` browser from `main` or Pull Request source branch.

GitHub Action Workflow configuration file of this workflow is [sanity-check.yml](/.github/workflows/sanity-check.yml).

This workflow is only triggered automatically on specific events:

- Merge Events on `main` branch
- Create / Update GitHub Pull Request Events

Also, on [Sanity Check](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/sanity-check.yml) page, status of all on-going and previously executed 'Sanity Check' Workflow runs can be found.
