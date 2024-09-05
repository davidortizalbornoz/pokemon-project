
## Description

He creado este componente para que pueda ser ejecutado sin la necesidad de recrear previamente un esquema de datos. Usé para este propósito sqlite3, donde los esquemas de datos pueden ser embebidos y usados en memoria.

TypeORM quedó configurado para que pueda recrear sus entidades en memoría, a partir de un modelo prestablecido en base los @Entity incluidos en el proyecto

## Installation

```bash
$ npm install
```

## Running the app (ambiente local)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Arranque desde Docker

Tenemos dos opciones:
```bash

# docker-compone
$ docker-compose up --build
$ docker-compose down

# docker
$ docker build -t pokemon-project .
$ docker run -p 3000:3000 pokemon-project

```
