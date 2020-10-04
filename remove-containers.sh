#!/bin/bash

docker stop oyster-test-backend oyster-test-database oyster-test-frontend
docker container rm oyster-test-backend oyster-test-database oyster-test-frontend
docker image rm oyster-fullstack-test_backend oyster-fullstack-test_frontend

docker stop oyster-test-backend-prod oyster-test-database oyster-test-frontend-prod
docker container rm oyster-test-backend-prod oyster-test-database oyster-test-frontend-prod
docker image rm oyster-fullstack-test_backend-prod oyster-fullstack-test_frontend-prod