# Pachama Project

## Getting Started
### Installations:
 * Node [node](https://nodejs.org/en/download/)
 * Docker [Docker](https://docs.docker.com/engine/install/)

## Running locally
* Once Node and Docker are installed Run the following:
    * Command: `sh init.sh`

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