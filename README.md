# Oyster fullstack development Test

This project consists on a fullstack development test based on Node JS and React JS

- [Oyster fullstack development Test](#oyster-fullstack-development-test)
  - [Project composition](#project-composition)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [First steps](#first-steps)
    - [Docker](#docker)
  - [Project startup](#project-startup)
    - [Production Mode](#production-mode)
    - [Development Mode](#development-mode)
  - [Project visualization](#project-visualization)
    - [Frontend](#frontend-1)
    - [Backend API Docs](#backend-api-docs)
  - [Test Login](#test-login)
    - [Production Mode](#production-mode-1)
    - [Development Mode](#development-mode-1)
  - [Remove Docker container and images](#remove-docker-container-and-images)
    - [Development containers](#development-containers)
    - [Production containers](#production-containers)

## Project composition

NOTE: Each project has its own `README.md` file for its own development startup process

### Backend

Backend is built on the progresive framework Nest JS and it uses the following main dependencies:

- TypeScript
- Nest JS / Nest Mongoose
- Passport / Nest Passport
- JWT
- Jest

### Frontend

Frontend was created with `create-react-app` command and it uses the dependencies listed below:

- TypeScript
- React
- React-Dom
- React-Router
- Axios
- Jest
- Formik
- React-Bootstrap

## First steps

### Docker

This project has been thinked to run in docker containers, you also can develop without it, but for practicity its recomendable to have installed `docker` and `docker-compose` on your machine

https://docs.docker.com/get-docker/

## Project startup

NOTE: Use [Production Mode](#production-mode) startup only if you want to see full project working

### Production Mode

This mode uses `.env.prod` file for Environment variables for all containers.

1. Run `docker-compose` commad:

NOTE: Please review `startup.sh` commands first if you already ran `docker-compose` for a clean startup

```bash
# Run normally
$ docker-compose -f docker-compose.prod.yml up --build
# Run as daemon
$ docker-compose -f docker-compose.prod.yml up -d --build
```

Or if you are in UNIX based OS and you want a clean startup run:

```bash
$ sh ./startup.sh
```

2. Check [Project visualization](#project-visualization)

### Development Mode

In order to start the full project follow the next steps:

1. Copy `./backend/.env.example` content into a new file `./backend/.env`

```bash
$ cp ./backend/.env.example ./backend/.env
```

2. Replace values in `./backend/.env`

3. Copy `./frontend/.env.example` content into a new file `./frontend/.env`

```bash
$ cp ./frontend/.env.example ./frontend/.env.local
```

4. Replace values in `./frontend/.env.local`

5. Run `docker-compose` commad:

```bash
$ docker-compose up -d --build
```

That command will build the images and will run the containers as a daemons. If you don't want to run containers as daemons just remove the `-d` flag in command.

6. Check [Project visualization](#project-visualization)

## Project visualization

### Frontend

Open http://localhost:3001/ in browser

### Backend API Docs

Open http://localhost:3000/api-docs in browser

## Test Login

### Production Mode

For login please check your `.env.prod` variables:

```dotenv
env_admin_username=admin
env_admin_email=admin@admin.com
env_admin_password=admin123
```

These values will be your credentials to perform a successful login

### Development Mode

For login please check your `.env` variables:

```dotenv
env_admin_username=<your_username>
env_admin_email=<your_email>
env_admin_password=<your_password>
```

The values used on these variables will be your credentials to perform a successful login

## Remove Docker container and images

### Development containers

```bash
# Stop containers
$ docker stop oyster-test-backend oyster-test-database oyster-test-frontend
# Remove containers
$ docker container rm oyster-test-backend oyster-test-database oyster-test-frontend
# Remove images
$ docker image rm oyster-fullstack-test_backend oyster-fullstack-test_frontend
```

### Production containers

```bash
# Stop containers
$ docker stop oyster-test-backend-prod oyster-test-database oyster-test-frontend-prod
# Remove containers
$ docker container rm oyster-test-backend-prod oyster-test-database oyster-test-frontend-prod
# Remove images
$ docker image rm oyster-fullstack-test_backend-prod oyster-fullstack-test_frontend-prod
```
