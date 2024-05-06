# Development

In the **project** directory:

## To install all necessary dependencies:

`npm install`

- Run when pulling the repository for the first time.

## Configure .env file:

```
URI=REPLACE_URI
PORT=REPLACE_PORT
API_KEY=YOURGOOGLEGEMINIAPIKEY

```

## For front end development:

`npm start`

- Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload when you make changes.
- Run this to test frontend functionality.

## For backend development:

`npm run build`

- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.
  > [!IMPORTANT]
  >
  > - NEEDS TO BE RUN ANYTIME THERE IS FRONTEND CHANGES in order for backend to be updated.

`nodemon server.mjs`

- To start the app on the server in port specified in .env.
- Run this to test backend functionality.
