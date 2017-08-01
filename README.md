[![Known Vulnerabilities](https://snyk.io/test/github/davidep87/koa2-react/badge.svg)](https://snyk.io/test/github/davidep87/koa2-react)
### Info: General project information
### Stack: Node.JS (7.7.1) - KoaJS (2) - Sequelize (Postgres) - Redis - React - Redux - NGINX

### How to Start the App
  - Install yarn:
    - MAC: brew install yarn
    - Linux: sudo apt-get update && sudo apt-get install yarn
    - Win: choco install yarn || scoop install yarn
  - Install NGINX, Redis, Postgresql
  - in the main directory type:
    - `$ yarn install`
    - `$ sudo npm install -g pm2`
    - `$ sudo npm install -g eslint`
    - `$ yarn [options]`
      - options:
        - dev ( development )
        - prod ( production )
        - logs ( see logs )
        - start:hot ( start webpack webserver hot)
        - webpack:color ( watch progress color )
        - build ( classic build )
        - doc ( generate documentation )

### How to modify database structure with sequelize:
  - Create a migration file running this command example in the main dir of the project:
    - `$ sequelize migration:create --name "nameOfMigrationFile" --migrations-path migrations/`
  - Write logic to change db structure in the new generated file in migrations/
    - Documentation: http://docs.sequelizejs.com/en/latest/docs/migrations/
  - Run the command sequelize db:migrate to update database structure

### BackEnd
- [x] HTTP / HTTP2 / SSL Support
- [x] Sequelize ORM
- [x] Redis Session Handler
- [x] Auth Middleware

### frontend
- [x] React
- [x] Semantic-UI
- [x] Draft-js rich text editor framework
- [x] Website
- [x] Dashboard
  - [x] Login / Logout
  - []  Main dashboard view
  - [x] Settings

### NOTE: This is not a completed boilerplate (React is not using PROPTYPES)
