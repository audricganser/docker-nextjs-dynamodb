# Pachama Project

## Getting Started
### Installations:
 * Node [node installation](https://nodejs.org/en/download/)
 * Yarn [yarn installation](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
 * Docker [Docker installation](https://docs.docker.com/engine/install/)

## Running locally
* Once Node, Yarn and Docker are installed Run the following:
    * Command in root directory: `sh init.sh`
* `sh init.sh` will kick off multiple commands:
    * Building all docker images
    * Deploying each docker-compose service (Dynamo DB, Application)
    * Installation of packages locally
    * Running DB seeding script

* Visit http://localhost:3000 in your browser

* Shutdown: `docker compose down`

## Notes
### Why Next.js
* SEO
* Speed
* API integration
* Prebuilt routes

### Docker-compose?

Most difficult part of this project was docker compose and its networking between the DB and the app.
Usually I would spin up a test DB in a cloudprovider and work off of that locally.

### Next.js API?

Tradeoff between a POC/MVP and a full fledged scalable app. Serverless would be my preference for the service.

### shell script for seeding

This could have been done within the Dockerfile while the Dynamo Image was building but it seemed faster just to write a quick node script to do this.
