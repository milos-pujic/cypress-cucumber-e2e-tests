# Host Sorry-Cypress publicly on AWS

> :warning: **WARNING** :warning:
>
> Hosting Sorry-Cypress on AWS is **NOT FREE**. :moneybag: :moneybag: :moneybag:
>
> Here's a rough estimation of price / month for using the resources used. The actual usage might be higher (or lower) based on actual usage.
>
> - Fargate pricing based on calculator 35,55 USD (1 vCPU, 2GB RAM) or 17,78 USD (0.5 vCPU, 1GB RAM)
> - EC2 Application Load Balancer based on calculator 19,35 USD (0.5 GB / hour, 0.5 connections / second)
> - S3 + Cloudwatch = varies based on usage

Inside this repository there is [sorry-cypress-stack.yml](/.aws/sorry-cypress-stack.yml) AWS Cloud Formation template which can be used to deploy full sorry-cypress kit in just 5 minutes on AWS. Read more on [Sorry-cypress installation instructions for AWS](https://docs.sorry-cypress.dev/cloud-setup/aws).

> :bangbang: IMPORTANT :bangbang:
>
> Stack Name - It serves a prefix name for all the entities created by the stack. Keep name of your **unique**, **short** and **with no special characters** as AWS limits service names.

Template Configuration _(slightly changed than one available on `sorry-cypress.dev` page)_:

- TaskCpu _(default: `512`)_ - The amount of CPU units dedicated to running the services. Sorry-cypress uses AWS Fargate as compute platform, and runs all the services as a single task, i.e. those CPU units are shared among all the services. Read more about at [AWS Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_size).
- TaskMemory _(default: `1024`)_ - The amount of memory units dedicated to running the services. This resource is also shared between the services and defined at task-level. Read more at [AWS Documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_size).
- DirectorPort _(default: `8080`)_ - The port number for accessing the director service. You'll need to use it as a destination when configuring cypress agents.
- DirectorAllowedKeys _(default: `unique-key`)_ - List of comma delimited record keys (provided to the Cypress Runner using --key option) which are accepted by the director service.
- DirectorInactivityTimeout _(default: `600`)_ - Director uses the timeout value in seconds to define how long it should wait before checking for a run's inactivity.

The stack creates [AWS Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) to provide access to the underlying services. By default, AWS LB URL points to the web dashboard (on port 80). The director service is available via the same URL but different port.

For example, if the access URL created by the stack is: `http://sorry-cypress-1502240720.us-east-1.elb.amazonaws.com`, and `DirectorPort=8080` then director service will be available at `http://sorry-cypress-1502240720.us-east-1.elb.amazonaws.com:8080`.

With above example in mind, command to run your Cypress Tests with your AWS Hosted Sorry-Cypress will look like:

    CURRENTS_API_URL='http://sorry-cypress-1502240720.us-east-1.elb.amazonaws.com:8080' cypress-cloud npx run --record --key ${CYPRESS_RECORD_KEY} --parallel --ci-build-id ${CYPRESS_CI_BUILD_ID}

Where:

- `${CYPRESS_RECORD_KEY}` - secret record key configured in Template configuration under `DirectorAllowedKeys` property
- `${CYPRESS_CI_BUILD_ID}` - unique build identifier used by Sorry-Cypress to distinguish cypress test runs one from another, i.e. `aws-build-001`

> :bangbang: IMPORTANT :bangbang:
>
> If you want to have parallel execution, just run same command **WITH SAME** --ci-build-id flag value in multiple terminals.
