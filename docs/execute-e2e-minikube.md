# Execute Cypress Cucumber Tests using Minikube's Kubernetes locally

Before you proceed, you should setup and start minikube using [this guide](/docs/minikube-setup.md).

After minikube has been properly installed and started on your machine, open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following commands:

    docker build . -t e2e
    kubectl apply -f .kubes/restful-booker-platform.yml
    kubectl apply -f .kubes/sorry-cypress.yml
    kubectl apply -f .kubes/e2e-tests.yml
    minikube dashboard

That will:

1. Build Docker Image containing Cypress and your Tests tagged with `e2e:latest`
2. Start Restful Booker Platform in local kubernetes under `restful-booker-platform` namespace
    - Available at `http://kube.local`.
3. Start Sorry-Cypress in local kubernetes under `sorry-cypress` namespace
    - Director available at `http://kube.local:1234`
    - API available at `http://kube.local:4000`
    - Dashboard available at `http://kube.local:8080`
    - Minio Object Storage available at `http://kube.local:9000` and `http://storage.sorry-cypress:9000`
      - username: `sorry-cypress`
      - password: `cypress-sorry`
4. Create 4 Kubernetes Cron Jobs in local kubernetes under `e2e-tests` namespace
    - scheduled-e2e-chrome (scheduled for 9:00 each day)
    - scheduled-e2e-firefox (scheduled for 9:10 each day)
    - scheduled-e2e-electron (scheduled for 9:20 each day)
    - scheduled-e2e-edge (scheduled for 9:30 each day)
5. Start and Open Minikube Dashboard in browser

Status of everything running in Minikube's Kubernetes can be monitored on Minikube Dashboard.

To check status of Restful Booker Platform:

- Open Minikube Dashboard
- Change namespace to `restful-booker-platform`
- Navigate to Workloads on left side panel

![Restful Booker Platform Workloads](/docs/imgs/minikube-dashboard-restful-booker-platform.png)

To check status of Sorry-Cypress:

- Open Minikube Dashboard
- Change namespace to `sorry-cypress`
- Navigate to Workloads on left side panel

![Sorry-Cypress Workloads](/docs/imgs/minikube-dashboard-sorry-cypress.png)

To check status of E2E Tests Cron Jobs:

- Open Minikube Dashboard
- Change namespace to `e2e-tests`
- Navigate to Workloads on left side panel

![E2E Tests Cron Jobs Workloads](/docs/imgs/minikube-dashboard-e2e-tests.png)

Each of E2E Tests Cron Jobs is configured to run on specific browser and with 2 parallel Cypress Agents. Than configuration is located in [e2e-tests.yml](/.kubes/e2e-tests.yml) file.

To see the list of all configured Cron Jobs: Open Minikube Dashboard > Change namespace to `e2e-tests` > Navigate to Cron Jobs on left side panel.

To see the list of all running or finished Jobs: Open Minikube Dashboard > Change namespace to `e2e-tests` > Navigate to Jobs on left side panel. On Jobs panel you can also monitor logs of running Cypress Agent (which are running as kubernetes pods).

E2E Tests Cron Jobs can also be triggered manually by clicking on 3 dots button next to Cron Job and click on Trigger button.

![E2E Tests Cron Jobs Manual Trigger](/docs/imgs/minikube-dashboard-manual-trigger.gif)

Progress and results can be also followed on Sorry-Cypress Dashboard `http://kube.local:8080` under run named the same as running or finished job name:

- for scheduled jobs `scheduled-e2e-[chrome|firefox|edge|electron]-########`
- for manually triggered jobs `scheduled-e2e-[chrome|firefox|edge|electron]-manual-###`.
