### library_api by DecaHub


#### PostGres Database Set-Up:

If you don't Postgres installed locally, please follow the steps the installation that pertains to your operating system:

[Download Postgres](https://www.postgresql.org/download/)


Set the environment variables in the file `.env`
 
`PGDATABASE`=database_name

`PGHOST`=hostname

`PGPORT`=port_number

`PGUSER`=username

`PGPASSWORD`=password

#### Project Set-Up:

Install and run the server by executing the following command:

`npm start`

This command assumes that you are using `yarn` as your Node Package Manager. I recommend `yarn` due to its fast installation nature.

[Installing Yarn](https://yarnpkg.com/en/docs/install)

If you are using `npm`, execute the following:

`npm install && nodemon app/server.js`
