# Todo service

## Features

 - No transpilers, just vanilla javascript
 - ES2017 latest features like Async/Await
 - CORS enabled
 - Uses [yarn](https://yarnpkg.com)
 - Express + MongoDB ([Mongoose](http://mongoosejs.com/))
 - Soft delete
 - Uses Mongoose (Class, plugin ... )
 - [Docker](https://www.docker.com/) support
 - Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
 - Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
 - Request validation with [joi](https://github.com/hapijs/joi)
 - Gzip compression with [compression](https://github.com/expressjs/compression)
 - API documentation geratorion with [swagger](https://swagger.io/)
 - API docs view: <host>:<port>/swagger/view
 - Monitoring with [pm2](https://github.com/Unitech/pm2)

## Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [npm] or [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

Clone the repo and make it yours:

```bash
git clone --depth 1 https://github.com/cedricVu/NodeJs-Todo-Service.git
cd Nodejs-todo-service
rm -rf .git
```

Install dependencies:

```bash
yarn install
```

Set environment variables:

```bash
cp .env.example .env
```

## Running in your local

```bash
yarn start
```

## Docker

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```
## Deploy

Set your server ip:

```bash
DEPLOY_SERVER=127.0.0.1
```

Replace my Docker username with yours:

```bash
nano deploy.sh
```

Run deploy script:

```bash
sh ./deploy.sh
```

## License

[MIT License](README.md) - [Cedric](https://github.com/cedricVu)
