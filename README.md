## sdk-email-sender

This project is built using Node.js, typescript, React, and MariaDB. It provides
functionality to send emails, manage users, clients, and licenses, and serves
API documentation.

**Features**

- Send Emails: Utilize the `/` route access the view with different scenarios in
  which you want to send emails.
- Admin Panel: Manage users, clients, and licenses through the `/admin` route.
- API Documentation: Access the API documentation via the `/docs` route.

**Usage**

1. Clone the repository:
   `git clone <git@github.com:arturolopm/sdk-email-sender-js.git>`
2. Install dependencies for both client and server:

cd client && npm install cd ../server && npm install

3. Build the client application: cd client && npm run build

4. Run the server:

cd ../server && npm start, you can do this or if already have docker just use
docker-compose up

Access the application in your browser: Emails: http://localhost:8080/ Admin
Panel: http://localhost:8080/admin API Documentation: http://localhost:8080/docs
Configuration Update the config.json file to configure your MariaDB database
connection.

An email ( afinichallenge@gmail.com )demo access is already provided, it will
work if you use it, please be sure to update env variables if you need to use
another one.

The data has already been provided for testing purposes, if you need your own
data or start with empty database be sure to not run the migrations on file
server/src/db/migrate.ts or just delete the seeders files.

Contributing Feel free to contribute to this project by opening issues or
creating pull requests.
