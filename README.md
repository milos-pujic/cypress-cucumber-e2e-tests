# Cypress Cucumber E2E Testing Framework

Cypress Cucumber E2E Testing Framework project represents a starting point for writing tests in Cypress with Cucumber.

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
- [Faker JS](https://github.com/faker-js/faker)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Lint Staged](https://github.com/okonet/lint-staged)

## Launch Cypress and Execute Test Cases

Open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following commands to:

- Open the Cypress UI to execute test cases against default environment: ```npx cypress open```
- Execute all test cases without opening the Cypress UI against default environment: ```npx cypress run```

- Environment variables:
  - `ENV`, which can have value `prod` / `local` / `docker` / `kube` / `kubeLocal` , depending on which environment you would like to execute your tests (if not defined, `prod` will be used by default)
    - `prod` uses `https://automationintesting.online` as app URL
    - `local` uses `http://localhost` as app URL
    - `kubeLocal` uses `http://kube.local` as app URL
    - `docker` uses `http://rbp-proxy` as app URL
    - `kube` uses `http://rbp-proxy.restful-booker-platform` as app URL
  - `TAGS`, which can be any of available tags set in Cucumber features. If not set all scenarios will be executed. Tag expression is an infix boolean expression, some examples:
    - `@sanity` - Scenarios tagged with `@sanity` will be filtered
    - `@management and not @room-management` - Scenarios tagged with `@management` that are not also tagged with `@room-management` will be filtered
    - `@management and @room-management` - Scenarios tagged with both `@management` and `@room-management` will be filtered
    - `@booking or @contact` - Scenarios tagged with either `@booking` or `@contact` will be filtered
    - `(@booking or @contact) and (not @bug)` - Scenarios tagged with either `@booking` or `@contact` that are not also tagged with `@bug` will be filtered

Example of above commands with possible variables:

- `npx cypress open --env ENV=local` - Open Cypress UI to execute tests against Local environment
- `npx cypress run --env ENV=prod` - Execute All tests without opening the Cypress UI against Production environment
- `npx cypress run --spec "**/login.feature" --env ENV=local` - Execute Login feature without opening the Cypress UI on Local environment
- `npx cypress run --env ENV=prod,TAGS='(@booking or @contact) and (not @bug)'` - Execute tests tagged with `@booking` or `@contact` which are not also tagged with `@bug`, without opening the Cypress UI on Production environment

Some of predefined scripts in [`package.json`](/package.json) are doing same thing as commands above:

- `npm run cy:open:local` or `npm run cy:open:prod` - Open Cypress UI to execute tests against Local or Production environment
- `npm run cy:run:local` or `npm run cy:run:prod` - Execute All tests without opening the Cypress UI against Local or Production environment

## Local Docker Environment with Docker for Desktop

>Before you proceed, you should install Docker Desktop depending on your OS and start it:
>
>- [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
>- [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
>
>As Docker for Desktop is **paid** software now, instead of it you can set up and start minikube using bellow guides:
>
>- [Minikube Setup for Windows](/docs/minikube-setup-windows.md)
>- [Minikube Setup for Mac](/docs/minikube-setup-mac.md)

After Docker for Desktop, or minikube, has been installed on your machine, open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following command:

    docker compose -f ./docker-compose-restful-booker.yml up -d 

That will start Restful Booker Platform locally.

After everything is up and running you will have Restful Booker Platform available at:

- Docker for Desktop: `http://localhost`
- minikube: `http://kube.local`

## Local Kubernetes Environment with Minikube's Kubernetes

>Before you proceed, you should set up and start minikube using bellow guides:
>
>- [Minikube Setup for Windows](/docs/minikube-setup-windows.md)
>- [Minikube Setup for Mac](/docs/minikube-setup-mac.md)

After minikube has been properly installed and started on your machine, open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following command:

    kubectl apply -f .kube/restful-booker-platform.yml 

That will start Restful Booker Platform locally.

After everything is up and running you will have Restful Booker Platform available at `http://kube.local`.

## Gherkin standards and rules

### Describing Features

Every feature must only contain scenarios related to that it. When grouping scenarios under one feature make sure that `@Background` for that feature is common for all scenarios.
If some feature is complex and there are different `@Background` for group them in multiple feature file.

If you have problems describing feature you can use next template, known as a Feature Injection template:

    In order to <meet some goal>
    As a <type of stakeholder>
    I want <a feature>

By starting with the goal or value that the feature provides, you’re making it explicit to everyone who ever works on this feature why they’re giving up their precious time. You’re also offering people an opportunity to think about other ways that the goal could be met.

### Writing Scenarios

Using Given-When-Then in sequence is a great reminder for several great test design ideas. It suggests that pre-conditions and post-conditions need to be identified and separated. It suggests that the purpose of the test should be clearly communicated, and that each scenario should check one and only one thing. When there is only one action under test, people are forced to look beyond the mechanics of test execution and really identify a clear purpose.

When used correctly, Given-When-Then helps teams design specifications and checks that are easy to understand and maintain. As tests will be focused on one particular action, they will be less brittle and easier to diagnose and troubleshoot. When the parameters and expectations are clearly separated, it’s easier to evaluate if we need to add more examples, and discover missing cases.

#### General Rules

To prevents most of accidental misuse of Given-When-Then use:

- Write **_Given_** in Past tense as Passive sentences - these statements are describing preconditions and parameters (values rather than actions)
- Write **_When_** in Present tense as Active sentences - these statements are describing action under test
- Write **_Then_** in Future tense as Passive sentences - these statements are describing post-conditions and expectations (values rather than actions)

Make sure that there is only **one** **_When_** statement for each scenario.

Also make sure that there are no **and** conjunctions in sentences. If there is, it must be split into separate step.

### Matching Step Definition with Cucumber Expressions

- To match Gherkin Scenario Step text **_Cucumber Expression_** are used
- When writing **_Cucumber Expressions_** matchers always make sure that at least similar words and plurals are covered and will be matched by using:
  - [Optional text](https://github.com/cucumber/cucumber-expressions#optional-text)
  - [Alternative text](https://github.com/cucumber/cucumber-expressions#alternative-text)
  - [Escaping](https://github.com/cucumber/cucumber-expressions#escaping)

## Execute E2E Cypress Cucumber Tests using GitHub Actions Workflows on GitHub

All Github Actions Workflows are configured in [**GitHub Folder**](/.github/workflows/) yml files.

They all can be found by navigating to [GitHub Repository > Actions](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions).

![GitHub Actions Workflows](/docs/imgs/GitHub-Actions.png)

There are 3 GitHub Actions Workflows setup for Cypress Cucumber E2E Tests repository:

- [Cypress Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/cypress.yml): Used to manually trigger execution set of Cypress Tests, using specified browser and environment.
- [Cypress Tests in Electron](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/cypress-electron.yml): Used for scheduled (and manual) execution of all Cypress Tests, using `electron` and `local` environment and publishing of test results on GitHub Pages.
- [Sanity Check](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/sanity-check.yml) - Used for scheduled execution of Sanity Cypress Tests, using `electron` and `local` environment, on merge events on `main` branch and create / update pull request events

---

### Cypress Tests

This GitHub Action Workflow Executes All Cypress Cucumber E2E Tests on `local` (default) or `prod` environnement using `electron` (default), `chrome`, `firefox` or `edge` browser from defined branch (by default it is `main`).

If `local` environnement is selected, Restful Booker Platform will be started inside GitHub Services and tests will run against it.
If `prod` environnement is selected, tests will run against live version of Restful Booker Platform available at [automationintesting.online](https://automationintesting.online/).

GitHub Action Workflow configuration file of this workflow is [cypress.yml](/.github/workflows/cypress.yml).

This workflow is only triggered Manually. Steps to trigger it:

1. Open [Cypress Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/cypress.yml)
2. Click on `Run workflow` button
    - (which opens sub-modal where `Branch`, `Environnement to run Tests`, `Browser in which to run Tests` and `Skip Test with Known Bugs` can be selected)
3. Select `Branch`, `Environnement to run Tests`, `Browser in which to run Tests` and `Skip Test with Known Bugs`
4. Click on `Run workflow` button

![Cypress Tests](/docs/imgs/Cypress-Tests.png)

On [Cypress Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/cypress.yml) page, status of all on-going and previously executed 'Cypress Tests' Workflow runs can be found.

---

### Cypress Tests Electron

This GitHub Action Workflow Executes All Cypress Cucumber E2E Tests on `local` environnement using `electron` browser from defined branch (by default it is `main`).

:warning: This GitHub Actions publishes report on GitHub pages and beacuse of that it can **ONLY** be executed on **main** branch. :warning:

Environment `local` means that, Restful Booker Platform will be started inside GitHub Services and tests will run against it.

GitHub Action Workflow configuration file of this workflow is [cypress-electron.yml](/.github/workflows/cypress-electron.yml).

This workflow has two triggers:

1. Scheduled Trigger at 09:00 on every Monday, using cron expression `0 9 * * 1`
2. Manual Trigger

Steps to trigger it manually:

1. Open [Cypress Tests Electron](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/cypress-electron.yml)
2. Click on `Run workflow` button
    - (which opens sub-modal where `Branch` can be selected)
3. Select `Branch` (:warning: **main** branch must be used :warning:)
4. Click on `Run workflow` button

![Cypress Tests Electron](/docs/imgs/Cypress-Tests-Electron.png)

On [Cypress Tests Electron](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/cypress-electron.yml) page, status of all on-going and previously executed 'Cypress Tests' Workflow runs can be found.

This GitHub Action publishes Cucumber HTML and Allure Report on GitHub Pages of this project, located [here](https://milos-pujic.github.io/cypress-cucumber-e2e-tests/).

---

### Sanity Check

This GitHub Action Workflow Executes `@sanity` tagged scenarios of Cucumber E2E Tests on `local` environnement using `electron` browser from `main` or Pull Request source branch.

GitHub Action Workflow configuration file of this workflow is [sanity-check.yml](/.github/workflows/sanity-check.yml).

This workflow is only triggered automatically on specific events:

- Merge Events on `main` branch
- Create / Update GitHub Pull Request Events

On [Sanity Check](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/sanity-check.yml) page, status of all on-going and previously executed 'Sanity Check' Workflow runs can be found.
