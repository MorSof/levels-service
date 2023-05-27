<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://t3.ftcdn.net/jpg/02/05/78/12/360_F_205781253_acxA4jXNLyZN3XLFb7h3ySrXAlksPvXq.jpg" /></a>
</p>

## Levels Service

### Run all services with docker compose

#### Prerequisites
Clone 'levels-service' and 'rings-quest-ops' repos from https://github.com/MorSof?tab=repositories

Be sure to complete the guideline of 'rings-quest-ops' README file before proceeding to the instructions below



The service is exposed on http://localhost:3001

OpenApi (Swagger) is exposed here http://localhost:3001/api


## Development

### Prerequisites

### Installation

```shell
$ nvm use
$ npm install
```

## Running locally

#### Build and run docker-compose
```shell
$ docker-compose build
$ docker-compose up
````

#### Run the app
```bash
# development
$ npm run start
````
```bash
# watch mode
$ npm run start:dev
````
```bash
# production mode
$ npm run start:prod
```

## DB creation locally
After your docker-compose is up, you'll nee to create a DB: 
1. Navigate to [pdAdmin](http://localhost:5050/browser/)
2. Press on the "Add New Server" Button, a popup window will appear.
3. On the general tab name your server "rings_quest"
4. On the connection tab:
   - **Host name/address**: db 
   - **Port**: 5432
   - **Username**: user
   - **Password**: admin

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Developer tips

- You should use this CLI commands to generate controllers/services/modules:
```shell
$ nest generate module users
$ nest g controller users/controllers/users
$ nest g service users/services/users
```
