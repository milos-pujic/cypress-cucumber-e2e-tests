[← Back to documentation](readme.md)

# Minikube Setup

Minikube is one of free alternatives to Docker for Desktop. Minikube and Docker for Desktop are both tools that allow developers to run a local Kubernetes cluster on their own machines. However, there are some key differences between the two tools:

- Docker for Desktop is a full-featured desktop application that includes Docker Engine, Kubernetes, and other tools, while Minikube is a command-line tool that provides a lightweight, single-node Kubernetes cluster.
- Docker for Desktop provides a graphical user interface (GUI) that makes it easy to manage your containers and Kubernetes cluster, while Minikube requires you to use the command line to manage your cluster.
- Docker for Desktop supports both Docker Compose and Kubernetes, while Minikube is focused solely on Kubernetes.
- Docker for Desktop can be used for both local development and production deployments, while Minikube is primarily used for local development and testing.

More information on minikube can be found [here](https://github.com/kubernetes/minikube).

## Clean up Docker for Desktop

This section is only applicable if Docker for Desktop is / was installed on machine. If it isn't / wasn't installed on machine this section can be skipped.

If you have Docker for Desktop installed on your machine, uninstall it before installing minikube.

Uninstall guides for Windows/Mac are available [here](https://docs.docker.com/desktop/uninstall/).

After that, clear the leftover Docker for Desktop data and system components.

For Windows:

1. Open the elevated (as Admin) PowerShell window, type the following command and hit Enter to remove the default networks of Docker.

        Get-HNSNetwork | Remove-HNSNetwork

2. Run the following command to clear the program date of Docker from Windows.

        Remove-Item "C:\ProgramData\Docker" -Recurse

3. Run the following command to reboot your system to execute the uninstallation and cleanup.

        Restart-Computer -Force

For MacOS:

Open terminal and execute following commands, one by one, to remove all Docker Desktop dependencies on local file system:

    sudo rm -f /usr/local/bin/docker
    sudo rm -f /usr/local/bin/docker-machine
    sudo rm -f /usr/local/bin/docker-compose
    sudo rm -f /usr/local/bin/docker-credential-desktop
    sudo rm -f /usr/local/bin/docker-credential-ecr-login
    sudo rm -f /usr/local/bin/docker-credential-osxkeychain
    sudo rm -Rf ~/.docker
    sudo rm -Rf ~/Library/Containers/com.docker.docker
    sudo rm -Rf ~/Library/Application\ Support/Docker\ Desktop
    sudo rm -Rf ~/Library/Group\ Containers/group.com.docker
    sudo rm -f ~/Library/HTTPStorages/com.docker.docker.binarycookies
    sudo rm -f /Library/PrivilegedHelperTools/com.docker.vmnetd
    sudo rm -f /Library/LaunchDaemons/com.docker.vmnetd.plist
    sudo rm -Rf ~/Library/Logs/Docker\ Desktop
    sudo rm -Rf /usr/local/lib/docker
    sudo rm -f ~/Library/Preferences/com.docker.docker.plist
    sudo rm -Rf ~/Library/Saved\ Application\ State/com.electron.docker-frontend.savedState
    sudo rm -f ~/Library/Preferences/com.electron.docker-frontend.plist

## Install minikube

Official installation guides are available ono minikube's [Get Started!](https://minikube.sigs.k8s.io/docs/start/) page. This guide recommends and shows installation via package managers, for Windows [Chocolatey](https://chocolatey.org/), for MacOS [Homebrew](https://brew.sh/). You can chose any other method mentioned on minikube's [Get Started!](https://minikube.sigs.k8s.io/docs/start/) page, but than you must install other components and configuration on your own.

This guide will cover installing:

- Package Managers
  - for Windows [Chocolatey](https://chocolatey.org/)
  - for MacOS [Homebrew](https://brew.sh/)
- Virtualization Engine
  - for Windows `Hyper-V`
  - for Mac `HyperKit`
- Additionally needed tools and command line interfaces
  - Docker CLI
  - Docker Build X
- Host File Configuration

### Windows

1. Open PowerShell with administrator privileges
2. Install Chocolatey by running the following command:

        Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

3. Install Hyper-V by running the following command:

        choco install hyper-v -y

4. Install Minikube by running the following command:

        choco install minikube -y

5. Verify the installation by running the following command:

        minikube version

6. Install Docker CLI by running the following command:

        choco install docker-cli -y
  
7. Install Docker Buildx by running the following command:

        choco install docker-buildx -y

8. Verify the installation by running the following command:

        docker version

### MacOS

1. Open Terminal
2. Install Homebrew by running the following command:

        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

3. Install HyperKit by running the following command:

        brew install hyperkit

4. Install Minikube by running the following command:

        brew install minikube

5. Verify the installation by running the following command:

        minikube version

6. Install Docker CLI by running the following command:

        brew install docker

7. Install Docker Buildx by running the following command:

        brew install docker-buildx

    - docker-buildx is a Docker plugin. For Docker to find this plugin, symlink it:

          mkdir -p ~/.docker/cli-plugins
          ln -sfn $HOMEBREW_PREFIX/opt/docker-buildx/bin/docker-buildx ~/.docker/cli-plugins/docker-buildx

8. Verify the installation by running the following command:

        docker version

## Start minikube