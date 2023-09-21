# Execute Cypress Cucumber Tests using Minikube's Kubernetes Locally

>Before you proceed, you should setup and start minikube using [this guide](/docs/minikube-setup.md).

After minikube has been properly installed and started on your machine, open the terminal inside `<local_path>\cypress-cucumber-e2e-tests` and use the following commands:

    docker build . -t e2e
    kubectl apply -f .kube/restful-booker-platform.yml
    kubectl apply -f .kube/sorry-cypress.yml
    kubectl apply -f .kube/e2e-tests.yml
    minikube dashboard

That will:

1. Build Docker Image containing Cypress and your Tests tagged with `e2e:latest`
2. Start Restful Booker Platform in local Kubernetes under `restful-booker-platform` namespace
    - Available at `http://kube.local`.
3. Start Sorry-Cypress in local Kubernetes under `sorry-cypress` namespace
    - Director available at `http://kube.local:1234`
    - API available at `http://kube.local:4000`
    - Dashboard available at `http://kube.local:8080`
    - Minio Object Storage available at `http://kube.local:9000` and `http://storage.sorry-cypress:9000`
      - username: `sorry-cypress`
      - password: `cypress-sorry`
4. Create 4 Cron Jobs in local Kubernetes under `e2e-tests` namespace
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

Each of E2E Tests Cron Jobs is configured to run on specific browser and with 2 parallel Cypress Agents. Than configuration is located in [e2e-tests.yml](/.kube/e2e-tests.yml) file.

To see the list of all configured Scheduled Cron Jobs: Open Minikube Dashboard > Change namespace to `e2e-tests` > Navigate to Cron Jobs on left side panel.

>To see the list of all configured Scheduled Cron Jobs using terminal, use bellow command:
>
>     kubectl get cronjob --namespace=e2e-tests

To see the list of all running or finished Jobs: Open Minikube Dashboard > Change namespace to `e2e-tests` > Navigate to Jobs on left side panel. On Jobs panel you can also monitor logs of running Cypress Agent (which are running as Kubernetes pods).

>To see the list of all running or finished Jobs using terminal, use bellow command:
>
>     kubectl get jobs --namespace=e2e-tests

E2E Tests Cron Jobs can also be triggered manually by clicking on 3 dots button next to Cron Job and click on Trigger button.

![E2E Tests Cron Jobs Manual Trigger](/docs/imgs/minikube-dashboard-manual-trigger.gif)

>To manually trigger E2E Tests Cron Jobs using terminal, use bellow command:
>
>     kubectl create job --from=cronjob/<name-of-cron-job> <name-of-job> --namespace=e2e-tests

Where `<name-of-cron-job` is `e2e-[chrome|firefox|edge|electron]` and  `<name-of-job>` can be whatever name you want to give to the job.

Progress and results can be also followed on Sorry-Cypress Dashboard `http://kube.local:8080` under run named the same as running or finished job name:

- for scheduled jobs `e2e-[chrome|firefox|edge|electron]-########`
- for manually triggered jobs via Minikube Dashboard `e2e-[chrome|firefox|edge|electron]-manual-###`.
- for manually triggered jobs via terminal look for the name passed as `<name-of-job>` in terminal command
