# Simple Koa Server

Server boilerplate build on Koa and TypeScript

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

A step by step series of examples that tell you how to get a development env running

copy .env.example on .env file, edit the .env config depending on your needs

```
cp .env.example .env
```

Install npm packages.

```
npm install
```
Set up database and seed data.

```
npm run db -- reset -w seeding
```
Run the server.

```
npm run watch
```
Run the server on debug.

```
npm run watch-debug
```
Navigate to url
```
http://localhost:3000/health
```

## Running the tests

How to run the automated tests for this system

### Unit testing

Test api endpoints, test will generate html report.

```
npm run test
```

Open mochawesome html report on root directory.

```
/mochawesome-report/mochawesome.html
```


## Built With

* [Koa](https://koajs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Typeorm](https://github.com/typeorm/typeorm)
* [routing-controllers](https://github.com/typestack/routing-controllers)
* [typedi](https://github.com/typestack/typedi)
* [mysql](https://www.mysql.com/)

## Authors

* **Mark Matute** (https://github.com/MarkMatute)
