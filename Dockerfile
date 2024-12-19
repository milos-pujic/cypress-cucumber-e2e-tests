FROM cypress/browsers:node-20.5.0-chrome-114.0.5735.133-1-ff-114.0.2-edge-114.0.1823.51-1

RUN node --version
RUN npm --version

WORKDIR /app

# copy project and test files
COPY package.json package-lock.json cypress.config.js .cypress-cucumber-preprocessorrc.json ./
COPY cypress ./cypress

# avoid many lines of progress bars during install
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# install NPM dependencies and Cypress binary
RUN npm ci

# check if the binary was installed successfully
RUN npx cypress verify