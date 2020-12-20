# Student Marks Analysis System

This is a small application built using [MERN](https://www.educative.io/edpresso/what-is-mern-stack) stack. this is an education application used to visualize a large scale of student's marks.

## Prerequisites

- Docker
- Docker-compose
- Node

should be installed

## Running it locally

Install dependencies:
(from the root of the project)

```
$ npm run install
```

Run your mongo instance locally: (from the root of the project):

```
$ docker-compose up
```

Run Node script to generate mock data <b>\*important</b></br>
This will take some time because it will insert 10M rows

```
$ npm run insert_data
```

Launch the application: (React and Node apps at once)

```
$ npm run start
```

Launch the application: (React and Node and Mongo at once)

```
$ npm run start:withdb
```

## License

MIT
