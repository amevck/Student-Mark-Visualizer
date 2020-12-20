# Student Marks Analysis System

This is a small application built using [MERN](https://www.educative.io/edpresso/what-is-mern-stack) stack. this is an education application used to visualize a large scale of student's marks.

## Prerequisites

- Docker
- Docker-compose
- Node

should be installed.

## Running it locally

Clone the project.

Install dependencies: (All the below commands should execute from the root of the project)

```
$ npm install
```

Run your mongo instance locally:

```
$ docker-compose up
```

Run Node script to generate mock data <b>\*important</b></br>
This will take some time because it will insert 10M rows.
To change the number of generation of data rows, change the `DATA_GENERATION_MULTIPLIER` in the .env file (in the backend module).
`DATA_GENERATION_MULTIPLIER = 100` will generate ~1M data rows, 1000 will generate ~10M data rows.

```
$ npm run insert_data
```

Launch the application: (React and Node at once)

```
$ npm run start
```

Launch the application: (React, Node and Mongo at once)

```
$ npm run start:withdb
```

## License

MIT
