FROM cypress/browsers:node16.16.0-chrome107-ff107-edge

RUN node --version
RUN npm --version

WORKDIR /app

# copy project and test files
COPY package.json package-lock.json cypress.config.js .cypress-cucumber-preprocessorrc.json currents.config.js ./
COPY cypress ./cypress

# avoid many lines of progress bars during install
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# install NPM dependencies and Cypress binary
RUN npm ci

# check if the binary was installed successfully
RUN $(npm bin)/cypress verify