# Madrid Recicla Web  <!-- omit in toc -->

[![Linkedin](https://img.shields.io/badge/LinkedIn-carlosmartinezm-blue)](https://www.linkedin.com/in/carlosmartinezm/)

**Madrid Recicla Web** is part of the distributed application **Madrid Recicla**.

Madrid Recicla Web allows user to find and filter recycling points of interes like recycling containers (for clothes, vegetable oil, batteries, paper, glass, organic, etc.) as well as static and mobile recycling units.

## Contents  <!-- omit in toc -->

- [Using the service](#using-the-service)
- [Developer information](#developer-information)
  - [Build argument variables](#build-argument-variables)
  - [Running the application in a Docker container](#running-the-application-in-a-docker-container)
  - [Running the application in your local machine](#running-the-application-in-your-local-machine)
- [Others](#others)

## Using the service

Madrid Recicla Web displays a map with the recycling points of interest, centered on the user's location. Different icons will represent different types of recycling points for quick identification. Also, times and abailability of the recycling points will be presented in the point's description.

## Developer information

### Build argument variables

Madrid Recicla Web uses a set of argument variables that need to be setup before building the application. These arguments are used to build static files which will eventually be added to the Docker image. To do so, create a file called `build.args` in the root directory of the project with proper values for the following keys:

```sh
ARG SERVER_URL=${SERVER_URL} # Madrid Recicla Server's URL
ARG CLOTHES_CONTAINERS_PATH=${CLOTHES_CONTAINERS_PATH} # Path provided by Madrid Recicla Server.
ARG MAPBOX_WEB_TOKEN:${MAPBOX_WEB_TOKEN} # Mapbox Token, specific for Madrid Recicla Web.
```
>⚠️ Notice the `ARG` keyword before each key=value pairs.

>⚠️ Notice that `build.args` file is ignored for commits in `.gitignore` file as this should never be pushed to the repo.

### Running the application in a Docker container
The source code contains a `Dockerfile` and a `.dockerignore` file that allow for quick building and running an image in local [Docker Containers].

While located in the directory where these files are located, run the following commands:

To build the image

```bash
% docker build -t madrid-recicla-web $(for i in `cat .build.args`; do out+="--build-arg $i " ; done; echo $out;out="") .
```

> \* Notice the dot (.) at the end of the command.

To run the image inside a Docker container

```zsh
% docker run -p 8000:80 madrid-recicla-web
```
> \* `-p "${WEB_PORT}:${WEB_CONTAINER_PORT}"` will expose port _WEB_CONTAINER_PORT_ inside the container to port _WEB_PORT_ outside the container.

### Running the application in your local machine

You can, however, manually run your web app without using Docker by following these steps:

1. Install dependencies described in `package.json`.

    ```zsh
    % npm install
    ```

2. Create a file called `.env` in the root directory of the project with proper values for the following keys:

    ```sh
    SERVER_URL=${SERVER_URL} # Madrid Recicla Server's URL
    CLOTHES_CONTAINERS_PATH=${CLOTHES_CONTAINERS_PATH} # Path provided by Madrid Recicla Server.
    MAPBOX_WEB_TOKEN:${MAPBOX_WEB_TOKEN} # Mapbox Token, specific for Madrid Recicla Web.
    ```
    >⚠️ Notice there are **NO** `ARG` keyword before each key=value pairs as it was in the `.build.args` file in the previous section.

    >⚠️ Notice that `.env` file is ignored for commits in `.gitignore` file as this should never be pushed to the repo.

3. Build static files for `dev` environment using

    ```zsh
    % npm run build:dev
    ```
    or build static files for `prod` environment using

    ```zsh
    % npm run build:prod
    ```

4. A `dist` folder will be created in the root directory of the project. In there, an `index.html` file will allow you to run the app.

## Others

[![Linkedin](https://img.shields.io/badge/LinkedIn-carlosmartinezm-blue)](https://www.linkedin.com/in/carlosmartinezm/)
[![Hex.pm](https://img.shields.io/hexpm/l/plug)](http://www.apache.org/licenses/LICENSE-2.0)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

<!-- Links -->
[Docker Containers]: <https://docs.docker.com/language/nodejs/>
