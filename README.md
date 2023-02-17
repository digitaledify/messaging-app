# Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Main features](#main-features)
  - [Run locally with docker](#run-locally-with-docker)
  - [Screenshots](#screenshots)
    - [Private chat](#private-chat)
    - [Group chat](#group-chat)
    - [View all screenshots](#view-all-screenshots)
- [Techstack](#techstack)
  - [Frontend](#frontend)
  - [Backend](#backend)

# Overview

RealChat is a chat application build with Node.js and Typescript. It provides a real-time chat platform for users to chat with each other. RealChat supports both private and group chat conversations.

## Main features

- Authentication using JWT tokens.
- Private chat.
- Group chat.
- Black theme support.

## Run locally with docker

1. Clone the repo

```bash
git clone https://github.com/ramesh-km/messaging-app.git
```

2. Run the docker-compose file

```bash
docker-compose up
```

3. Open the browser and go to `http://localhost`

## Screenshots

### Private chat

<p align="center">
  <img  src="./screenshots/private-chat.png">
</p>

### Group chat

<p align="center">
  <img  src="./screenshots/group-chat.png">
</p>

### [View all screenshots](screenshots/screenshots.md)

# Techstack

## Frontend

- Reactjs & Vite
- Mantine
- Tanstack Query and React router
- Zod
- Socket.io client

## Backend

- Nodejs/Expressjs
- Socket.io
- Prisma
- jsonwebtokens, pino, zod, swagger

---

[Licence](LICENSE.md)
