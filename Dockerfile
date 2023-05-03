FROM cypress/browsers:node-18.16.0-chrome-112.0.5615.121-1-ff-112.0.1-edge-112.0.1722.48-1

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