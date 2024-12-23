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

There are 2 GitHub Actions Workflows setup for Cypress Cucumber E2E Tests repository:

- [Cypress Tests](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/cypress.yml): Used for scheduled (and manual) execution of all Cypress Tests across all supported browsers (electron, chrome, firefox and edge) on `local` environment and publishing of test results on GitHub Pages.
- [Sanity Check](https://github.com/milos-pujic/cypress-cucumber-e2e-tests/actions/workflows/sanity-check.yml) - Used for scheduled execution of Sanity Cypress Tests, using only `electron` and `local` environment, on merge events on `main` branch and create / update pull request events

---

### Cypress Tests

GitHub Action Workflow configuration file of this workflow is [cypress.yml](/.github/workflows/cypress.yml).

This GitHub Actions workflow automates the execution of Cypress tests, organizes the results, and publishes detailed test reports. The pipeline is designed for reliability, scalability, and ease of maintenance, supporting multiple browsers and concurrent test runs.

#### Cypress Tests: Key Features

- **Scheduled Execution:** Automatically runs every Monday at 9:00 AM UTC via a cron schedule. Manual execution is also supported.
- **Multi-Browser Testing:** Tests run concurrently on Electron, Chrome, Firefox, and Edge browsers.
- **Parallel Execution:** Tests are split into multiple parts to optimize runtime and improve efficiency.
- **Service Containers:** Utilizes service containers to spin up dependencies (e.g., Restful Booker Platform services) required for testing.
- **Allure Reports:** Generates and publishes detailed Allure reports, including execution history.
- **Cucumber HTML Reports:** Provides human-readable HTML reports for Cucumber tests.
- **GitHub Pages Deployment:** Automatically deploys reports to GitHub Pages for easy access and sharing.
- **Artifact Management:** Uploads and organizes test artifacts, with optional deletion of unnecessary files to maintain cleanliness.

#### Cypress Tests: Workflow Overview

1. **Install Job:**
   - Sets up the testing environment with Node.js and caches dependencies for faster execution.

2. **Test Job:**
   - Executes Cypress tests for each browser, divided into multiple parts for parallelism.
      - Firefox tests are specifically configured with `video=false` as video recording currently doesn't work on Firefox.
   - Generates test artifacts (Allure results and Cucumber messages).
   - Uploads artifacts for further processing.

3. **Report Job:**
   - Downloads and Merges Cucumber Messages (per browser) and Allure Results.
   - Generates consolidated Cucumber HTML reports (per browser) and Allure Report.
   - Deploys reports to GitHub Pages for easy access.
   - Cleans up unnecessary artifacts after deployment.

#### Cypress Tests: Usage

To trigger the workflow:

1. **Manual Run:** Go to the "Actions" tab in your GitHub repository, select the workflow, and click "Run workflow." :warning: This GitHub Actions publishes report on GitHub pages and because of that it can **ONLY** be executed on **main** branch. :warning:
2. **Scheduled Run:** The workflow automatically runs every Monday at 9:00 AM UTC.

#### Cypress Tests: Reports

- **Allure Report:** Comprehensive test reports with execution history and trends.
- **Cucumber HTML Report:** Browser-specific detailed test results.

Access the reports via the GitHub Pages link provided in the workflow logs after execution, or click [here](https://milos-pujic.github.io/cypress-cucumber-e2e-tests/).

---

### Sanity Check

GitHub Action Workflow configuration file of this workflow is [sanity-check.yml](/.github/workflows/sanity-check.yml).

This GitHub Actions workflow ensures that critical components of the codebase are functional by running a set of sanity tests. It is triggered automatically on relevant code changes or pull requests and validates the application's core functionality using Cypress.

#### Sanity Check: Key Features

- **Trigger Conditions:**  
  The workflow runs automatically in the following cases:
  - **Push to the `main` branch:** When changes affect key files such as Cypress tests, configuration files, or dependencies.
  - **Pull Requests to the `main` branch:** On events like opening, updating, or labeling a pull request, ensuring the changes are tested before merging.
- **Service Containers:** Utilizes service containers to spin up dependencies (e.g., Restful Booker Platform services) required for testing.
- **Test Execution:** Runs a targeted suite of sanity tests on the Electron browser with the `@sanity` tag to verify critical workflows, while skipping tests labeled as `@bug`.
- **Allure Reporting:** Generates an Allure report for visualizing test results and trends, making it easy to assess the state of the codebase.
- **Artifact Management:** Uploads the following artifacts for further review or sharing:
  - **Cucumber Report:** HTML reports summarizing test results.
  - **Allure Report:** A detailed report for deeper insights into test execution.

#### Sanity Check: Workflow Overview

1. **Trigger Conditions:**
   - Runs on pushes to the `main` branch that involve critical files like Cypress tests, configuration files, or package dependencies.
   - Runs on pull requests targeting the `main` branch for validation before merging.

2. **Environment Setup:**
   - Spins up required service containers for backend support.
   - Installs Node.js dependencies and caches them for improved speed.

3. **Test Execution:**
   - Executes sanity tests using the Cypress Electron browser with the `@sanity` tag.

4. **Reporting:**
   - Generates and uploads Allure and Cucumber HTML Reports as workflow artifacts for review.

5. **Artifacts Retention:**
   - Test reports are retained for one day, providing quick access for debugging and analysis.

#### Sanity Check: Benefits

- Ensures critical functionality remains intact with every code change.
- Provides rapid feedback during development and pull request reviews.
- Simplifies debugging with detailed and easily accessible reports.
