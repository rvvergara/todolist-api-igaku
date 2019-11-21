# todolist-api

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> A simple JSON API app built using ExpressJS

Version 1 Features:

- User account creation and update
- Token authentication using `bcryptjs` and `jsonwebtoken`

## Background

This simple project is a showcase of my skills in building JSON API's using NodeJS/Express. I have built some fun API's using Ruby on Rails and I want to compare building using a non-opinionated framework.

## Table of Contents

- [todolist-api](#todolist-api)
  - [Table of Contents](#table-of-contents)
  - [Technologies used](#main-technologies-used)
  - [Install](#install)
  - [Usage](#usage)
  - [API](#api)
  - [Maintainer](#maintainer)
  - [Contributing](#contributing)
  - [License](#license)

## Main Technologies used

- NodeJS
- ExpressJS
- MongoDB/Mongoose
- JSONWebToken
- BcryptJS

## Install

Follow these steps:

- clone this repo
- `cd todolist-api-igaku`
- `npm i`

## Usage

```
npm run dev
```

Goto `localhost:3000`

Use either `httpie` on the terminal or Postman to do requests

**Endpoints (all examples use httpie)**

1. User Creation

```bash
$ http POST :3000/v1/users username=user1 email=user1@example.com password=password
```

Sample response:

```bash
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 281
Content-Type: application/json; charset=utf-8
Date: Thu, 21 Nov 2019 06:48:17 GMT
ETag: W/"119-FvnKOC5XA2TNS6BhXDb8fYfY5nk"
X-Powered-By: Express

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ2MzMzMWJiYzllYTE0YTFkYTUxNjkiLCJpYXQiOjE1NzQzMTg4OTcsImV4cCI6MTU3NDQwNTI5N30.0aYwhxyi
LShfelLX4JIjtl2Ib0UEd11M5h6rNaIseEk",
    "user": {
        "__v": 1,
        "_id": "5dd63331bbc9ea14a1da5169",
        "email": "user1@example.com",
        "username": "user1"
    }
}
```

2. User data update

```bash
$ http PUT :3000/v1/users/me username=myNewUsername "Authorization: Bearer <your token>"
```

3. Deleting user

```bash
$ http DELETE :3000/v1/users/me "Authorization: Bearer <your token>"
```

4. Signing in a user through email and password

```bash
$ http POST :3000/v1/sessions email=user1@example.com password=password
```

5. Logging out from current session

```bash
$ http DELETE :3000/v1/sessions "Authorization: Bearer <your token>"
```

6. Logging out from all sessions (i.e, from multiple devices)

```bash
$ http DELETE :3000/v1/sessionsAll "Authorization: Bearer <your token>"
```

7. Creating a todo

```bash
$ http POST :3000/v1/todos description="Do something nice" "Authorization: Bearer <your token>"
```

Sample response:

```bash
HTTP/1.1 201 Created
Connection: keep-alive
Content-Length: 192
Content-Type: application/json; charset=utf-8
Date: Thu, 21 Nov 2019 06:50:18 GMT
ETag: W/"c0-trmeeEYnYt4h++pATBXBcCnWqUs"
X-Powered-By: Express

{
    "__v": 0,
    "_id": "5dd633aabbc9ea14a1da516b",
    "completed": false,
    "description": "Do something nice",
    "owner": {
        "__v": 1,
        "_id": "5dd63331bbc9ea14a1da5169",
        "email": "user1@example.com",
        "username": "user1"
    }
}
```

8. Updating a todo

```bash
$ http PUT :3000/v1/todos/<todoID> completed: true description="This is a new description" "Authorization: Bearer <your token>"
```

9. Deleting a todo

```bash
$ http DELETE :3000/v1/todos/<todoID> "Authorization: Bearer <your token>"
```

## Maintainer

[Ryan](https://github.com/rvvergara)

## Contributing

[Ryan](https://github.com/rvvergara)

PRs accepted.

## License

MIT © 2019 Ryan Vergara
