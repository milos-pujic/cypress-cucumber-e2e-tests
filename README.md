# Cypress Cucumber E2E Testing Framework

Cypress Cucumber E2E Testing Framework project represents a starting point for writing tests in Cypress with Cucumber.</br>
Provided tests are based on examples how to define and use utility functions, explicit wait for some element, usage of **faker** for generating random data and possible solutions for organizing tests using separated files with locators of the elements.

## IDE Setup for Cypress Cucumber E2E Testing Framework

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
