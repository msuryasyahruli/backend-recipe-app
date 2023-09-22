# Recipe-app-BE
<br />
<p align="center">
  <div align="center">
    <img height="150" src="src/img/logo.png" alt="Recipe" border="0"/>
  </div>
  <h3 align="center">Mama Recipe</h3>
  <p align="center">
    <a href="https://github.com/msuryasyahruli/backend-recipe-app.git"><strong>Explore the docs »</strong></a>
    <br />
    <a href="">View Demo</a>
    ·
    <a href="">Api Demo</a>
  </p>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
  - [Documentation](#documentation)
  - [Related Project](#related-project)
- [Contributors](#contributors)
  - [Meet The Team Members](#meet-the-team-members)

# About The Project

Mama Recipe is a food recipe website project that aims to inspire users to cook and share their favorite recipes. The name Mama Recipe means "let's cook" in Indonesian. On this website, users can search for recipes, share their own recipes, and connect with other food enthusiasts.

One of Mama Recipe's main features is its user-friendly search function. Users can search for recipes by food name. The website also provides detailed recipe instructions, ingredient lists, and video tutorials to assist users in the cooking process.

Another unique feature of Mama Recipe is that users can create their own profiles, connect with other users, and share their favorite recipes. This allows users to learn from each other and explore new culinary ideas.

To use the Mama Recipe website, users simply need to create an account and start searching or sharing recipes. The site is designed to be easy to use and accessible to all levels of culinary expertise

## Built With

These are the libraries and service used for building this backend API

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [Json Web Token](https://jwt.io)
- [Multer](https://github.com/expressjs/multer)

# Installation

1. Clone this repository

```sh
git clone https://github.com/msuryasyahruli/backend-recipe-app.git
```

2. Change directory to Mama Recipe

```sh
cd backend-recipe-app
```

3. Install all of the required modules

```sh
npm install
```

4. Create PostgreSQL database, query are provided in [query.sql](./query.sql)

5. Create and configure `.env` file in the root directory, example credentials are provided in [.env.example](./.env.example)

```txt
- Please note that this server requires Google Drive API credentials and Gmail service account
- Otherwise API endpoint with image upload and account register won't work properly
```

6. Run this command to run the server

```sh
npm run server
```

- Or run this command for running in development environment

```sh
npm run dev
```

- Run this command for debugging and finding errors

```sh
npm run lint
```

## Documentation

Documentation files are provided in the [docs](./docs) folder

- [Postman API colletion]()
- [PostgreSQL database query](./query.sql)

API endpoint list are also available as published postman documentation

[![Run in Postman](https://run.pstmn.io/button.svg)]()

## Related Project

:rocket: [`Backend Recipe`](https://github.com/msuryasyahruli/backend-recipe-app.git)

:rocket: [`Frontend Recipe`](https://github.com/msuryasyahruli/recipe-mobile-app.git)

:rocket: [`Demo Recipe`]()

Project link : [https://github.com/msuryasyahruli/recipe-mobile-app.git](https://github.com/msuryasyahruli/recipe-mobile-app.git)
