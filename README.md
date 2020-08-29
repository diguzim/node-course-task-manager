# About

This is an application that manages users and its tasks.
We use [MongoDB](https://www.mongodb.com/) to store data in the database, [Sendgrid](https://sendgrid.com/) to send mail upon user creation and deletion, authenticate things with [JWT](https://www.npmjs.com/package/jsonwebtoken) and use [validator.js](https://www.npmjs.com/package/validator) to validate the request parameters.

This is an purely backend application, and with that I mean, you don't have any GUI to see it working.

This is meant to be used by sending http requests

# Installation

## Pre requisites

* Have [node](https://nodejs.org/en/) installed
* Have [MongoDB](https://www.mongodb.com/) installed (you need to have access to the mongod command in the terminal)

## Steps to run locally

In order to run this code, you have to
1. Clone this repo
2. Navigate to the config folder, create a dev.env file from the template.env file, and fill it with proper values.
3. Navigate to the root folder
4. Run **npm install** to install the project dependencies
5. Run **npm run start-database** to start the database instance
6. Run **npm run dev**

You can try to see if everything is running fine by running in the terminal:
```
$ curl --location --request POST 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Rodrigo",
    "email": "rodrigomarcondes2000@gmail.com",
    "password": "rodrigo123"
}'
```
> This will fail if you have already create this user. So if you see some message like "E11000 duplicate key error collection" it means that things are working, is just that this user already exists.

# Usage

## Using Postman collection

The easies way to understand all the endpoints and their usage is by importing the postman collection and use it. You can read how to do it [here](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/)

After importing, you have to define an environment, with values on the variables we use internally. You only need to add an **url** with the value of **localhost:3000** in order to use it locally.

Usually the first step to testing the APIs are by registering a new user (Create User, *POST /users*). If this is done on Postman, it will register another variable called **authToken** with the JWT token value, that will be used on subsequent requests thats depends on authentication. The login (Login User, *POST /users/login*) also sets the authToken. The authToken is removed by loggin off (Logout user, *POST /users/logout* and Logout all, *POST /users/logoutAll*) and upon deletion (Delete User, *DELETE /users/me*).

After authentication, you can use other endpoints. Most likely you will be able to manage the user, getting/updating it's avatar, and CRUD tasks.