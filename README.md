# Cypress Cucumber E2E Testing Framework

Cypress Cucumber E2E Testing Framework project represents a starting point for writing tests in Cypress with Cucumber.</br>
Provided tests are based on examples how to define and use utility functions, explicit wait for some element, usage of **faker** for generating random data and possible solutions for organizing tests using separated files with locators of the elements.

## IDE Setup

- Install [Visual Studio Code](https://code.visualstudio.com/download)
  - _Recommended extensions in Visual Studio Code:_
    - [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)
    - [Cypress Helper](https://marketplace.visualstudio.com/items?itemName=shevtsov.vscode-cy-helper)
    - [ESLint](<https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>)
    - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [Local History](https://marketplace.visualstudio.com/items?itemName=xyz.local-history)
    - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
    - [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- Install [Node JS](https://nodejs.org/en/download/)
- Clone the repository to your local system
- Open the project in Visual Studio Code and open the terminal
  - Make sure the path to the project is correct `<local_path>\cypress-cucumber-e2e-tests`
- In the terminal, execute the following command: ```npm install```
  - The command will install all found in the package.json

## Used Libraries

- [Cypress Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- [Cypress Split](https://github.com/bahmutov/cypress-split)
- [Faker JS](https://github.com/faker-js/faker)
- [Sorry-Cypress](https://docs.sorry-cypress.dev/) and [cy2](https://github.com/sorry-cypress/cy2)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Lint Staged](https://github.com/okonet/lint-staged)

## Launch Cypress and Execute test cases

Open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following commands to:

- Open the Cypress UI to execute test cases against default environnement: ```npx cypress open```
- Execute all test cases without opening the Cypress UI against default environnement: ```npx cypress run```

- Environnement variables
  - `ENV`, which can have value `prod` / `local` / `docker`, depending on which environnement you would like to execute your tests (if not defined, `prod` will be used by default)
  - `TAGS`, which can be any of available tags set in Cucumber features. If not set all scenarios will be executed. Tag expression is an infix boolean expression, some examples:
    - `@management` - Scenarios tagged with `@management` will be filtered
    - `@management and not @room-management` - Scenarios tagged with `@management` that aren't also tagged with `@room-management` will be filtered
    - `@management and @room-management` - Scenarios tagged with both `@management` and `@room-management` will be filtered
    - `@room-management or @login` - Scenarios tagged with either `@room-management` or `@login` will be filtered
    - `(@management or @login) and (not @room-management)` - Scenarios tagged with either `@management` or `@login` that aren't also tagged with `@room-management` will be filtered

Example of above commands with possible variables:

- `npx cypress open --env ENV=local` - Open Cypress UI to execute tests against Local environnement
- `npx cypress run --env ENV=prod` - Execute All tests without opening the Cypress UI against Production environnement
- `npx cypress run --spec "**/login.feature" --env ENV=local` - Execute Login feature without opening the Cypress UI on Local environnement
- `npx cypress run --env ENV=prod,TAGS='(@management or @login) and (not @room-management)'` - Execute tests tagged with `@management` or `@login` which aren't also tagged with `@room-management`, without opening the Cypress UI on Production environnement

Some of predefined scripts in [`package.json`](./package.json) are doing same thing as commands above:

- `npm run cy:open:local` or `npm run cy:open:prod` - Open Cypress UI to execute tests against Local or Production environnement
- `npm run cy:run:local` or `npm run cy:run:prod` - Execute All tests without opening the Cypress UI against Local or Production environnement

## Github Actions Workflows

All Github Actions Workflows are configured in [**GitHub Folder**](./.github/workflows/) yaml files.

They all can be found by navigating to [GitHub Repository > Actions]( https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions).

![GitHub Actions Workflows](/docs/imgs/GitHub-Actions.png)

There are 4 GitHub Actions Workflows setup for Foleon Artie repository:

- [Run All E2E Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all.yaml)
- [Run All E2E Tests in parallel](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all-parallel.yaml)
- [Run All E2E Tests in parallel with Sorry-Cypress](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all-parallel-sorry-cypress.yaml)

### Run All E2E Tests

This GitHub Action Workflow Executes All E2E Cypress Cucumber E2E Tests on `local` (default) or `prod` environnement using `electron` (default), `chrome`, `firefox` or `edge` browser  from defined branch (by default it is `main`).

If `local` environnement is selected, Restful Booker Platform will be started inside GitHub Services and tests will run against it.
If `prod` environnement is selected, tests will run against live version of Restful Booker Platform available at [automationintesting.online](https://automationintesting.online/).

GitHub Action Workflow configuration file of this workflow is [manual-run-all.yaml](./.github/workflows/run-all.yaml).

This workflow is only triggered Manually. Steps to trigger it:

1. Open [Run All E2E Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all.yaml)
2. Click on `Run workflow` button
    - (which opens sub-modal where `Branch`, `Environnement to run Tests` and `Browser in which to run Tests` can be selected)
3. Select `Branch`, `Environnement to run Tests` and `Browser in which to run Tests`
4. Click on `Run workflow` button

![Run All E2E Tests](/docs/imgs/Run-All-E2E-Tests.png)

Also, on [Run All E2E Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all.yaml) page, status of all on-going and previously executed 'Run All E2E Tests' Workflow runs can be found.

### Run All E2E Tests in parallel

This GitHub Action Workflow Executes All E2E Cypress Cucumber E2E Tests in parallel on `local` (default) or `prod` environnement using `electron` (default), `chrome`, `firefox` or `edge` browser  from defined branch (by default it is `main`).

If `local` environnement is selected, Restful Booker Platform will be started inside GitHub Services and tests will run against it.
If `prod` environnement is selected, tests will run against live version of Restful Booker Platform available at [automationintesting.online](https://automationintesting.online/).

Parallel execution is achieved using:

- Cypress Split - Cypress plugin that automatically split the entire list of Cypress specs to run in parallel on any CI
- GitHub Action Strategy Matrix - Automatically create multiple job runs, from single job, that are based on the combinations of the variables

GitHub Action Workflow configuration file of this workflow is [manual-run-all.yaml](./.github/workflows/run-all-parallel.yaml).

This workflow is only triggered Manually. Steps to trigger it:

1. Open [Run All E2E Tests in parallel](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all-parallel.yaml)
2. Click on `Run workflow` button
    - (which opens sub-modal where `Branch`, `Environnement to run Tests` and `Browser in which to run Tests` can be selected)
3. Select `Branch`, `Environnement to run Tests` and `Browser in which to run Tests`
4. Click on `Run workflow` button

![Run All E2E Tests in parallel](/docs/imgs/Run-All-E2E-Tests-in-parallel.png)

Also, on [Run All E2E Tests in parallel](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/run-all-parallel.yaml) page, status of all on-going and previously executed 'Run All E2E Tests in parallel' Workflow runs can be found.

