#!/bin/sh

docker stop oyster-test-database oyster-test-backend oyster-test-frontend
docker container rm oyster-test-database oyster-test-backend oyster-test-frontend

docker stop oyster-test-database-prod oyster-test-backend-prod oyster-test-frontend-prod
docker container rm oyster-test-database-prod oyster-test-backend-prod oyster-test-frontend-prod

docker image rm oyster-fullstack-test_database oyster-fullstack-test_backend oyster-fullstack-test_frontend