# Oyster fullstack development Test

This project consists on a fullstack development test based on Node JS and React JS

- [Oyster fullstack development Test](#oyster-fullstack-development-test)
	- [Project composition](#project-composition)
		- [Backend](#backend)
		- [Frontend](#frontend)
	- [First steps](#first-steps)
		- [Docker](#docker)
		- [Environment configuration](#environment-configuration)
	- [Project startup](#project-startup)
	- [Project visualization](#project-visualization)

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
- React-Redux
- React-Bootstrap

## First steps

### Docker

This project has been thinked to run in docker containers, you also can develop without it, but for practicity its recomendable to have installed `docker` and `docker-compose` on your machine

https://docs.docker.com/get-docker/

### Environment configuration

First copy the contents `.env.example` file into a new file `.env`

```bash
$ cp ./.env.example ./.env
```

And finally replace the values in `.env` for the values you need for your environment

## Project startup

As mentioned above you can start the project using `docker` and `docker-compose`

A `docker-compose.yml` exits on the root to handle all containers creation. So please just run:

```bash
$ docker-compose up -d
```

That command will build the images and the containers as a daemons. If you don't want to run containers as daemons just remove the `-f` flag in command.

## Project visualization

After successfull creation of containers you can just type http://localhost:3001/ in your browser and start using the application (The url shows up the frontend application)
