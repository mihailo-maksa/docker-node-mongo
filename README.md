# Docker Node MongoDB Example App

> Simple example of a dockerized Node/Mongo app

## Quick Start

```sh

# Run in Docker (use -d flag to run in background)
docker-compose up

# Tear Down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build

```
