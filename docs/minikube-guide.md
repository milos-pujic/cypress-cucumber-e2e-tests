# Minikube Guide

Minikube is one of free alternatives to Docker. Main difference is that minikube is local __Kubernetes__, focusing on making it easy to learn and develop for Kubernetes.
Minikube implements a local Kubernetes cluster on macOS, Linux, and Windows. Minikube's primary goals are to be the best tool for local Kubernetes application development and to support all Kubernetes features that fit.

More information on minikube can be found [here](https://github.com/kubernetes/minikube.)

## Installation

> :bangbang: IMPORTANT :bangbang:
>
> If have Docker for Desktop installed on your machine, uninstall it before installing minikube.
>
> Uninstall guides for Windows/Mac are available [here](https://docs.docker.com/desktop/uninstall/).
>
> After that clear the leftover Docker data and system components.
>
> For Windows:
>
> 1. Open the elevated (as Admin) PowerShell window, type the following command and hit Enter to remove the default networks of Docker.
>
>     `Get-HNSNetwork | Remove-HNSNetwork`
> 2. Run the following command to clear the program date of Docker from Windows.
>
>     `Remove-Item "C:\ProgramData\Docker" -Recurse`
> 3. Run the following command to reboot your system to execute the uninstallation and cleanup.
>
>     `Restart-Computer -Force`
>
> For MacOS:
>
> Open terminal and execute following commands, one by one, to remove all Docker Desktop dependencies on local file system:
>
> - `sudo rm -f /usr/local/bin/docker`
> - `sudo rm -f /usr/local/bin/docker-machine`
> - `sudo rm -f /usr/local/bin/docker-compose`
> - `sudo rm -f /usr/local/bin/docker-credential-desktop`
> - `sudo rm -f /usr/local/bin/docker-credential-ecr-login`
> - `sudo rm -f /usr/local/bin/docker-credential-osxkeychain`
> - `sudo rm -Rf ~/.docker`
> - `sudo rm -Rf ~/Library/Containers/com.docker.docker`
> - `sudo rm -Rf ~/Library/Application\ Support/Docker\ Desktop`
> - `sudo rm -Rf ~/Library/Group\ Containers/group.com.docker`
> - `sudo rm -f ~/Library/HTTPStorages/com.docker.docker.binarycookies`
> - `sudo rm -f /Library/PrivilegedHelperTools/com.docker.vmnetd`
> - `sudo rm -f /Library/LaunchDaemons/com.docker.vmnetd.plist`
> - `sudo rm -Rf ~/Library/Logs/Docker\ Desktop`
> - `sudo rm -Rf /usr/local/lib/docker`
> - `sudo rm -f ~/Library/Preferences/com.docker.docker.plist`
> - `sudo rm -Rf ~/Library/Saved\ Application\ State/com.electron.docker-frontend.savedState`
> - `sudo rm -f ~/Library/Preferences/com.electron.docker-frontend.plist`

See the [Getting Started Guide](https://minikube.sigs.k8s.io/docs/start/) from minikube on how to install it.

This guide recommends to use installation via package managers, for Windows [Chocolatey](https://chocolatey.org/), for MacOS [Homebrew](https://brew.sh/), as this guide will use their commands.

