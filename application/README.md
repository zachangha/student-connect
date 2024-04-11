# Development Scripts

In the project directory:

## To install all necessary dependencies:

`npm install`

## Configure .env file:

    ``` URI='yourmongodbURI'
        PORT='yourPort'
        ```

- Run when pulling the repository for the first time

## For front end development:

`npm start`

- Runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload when you make changes.
- Run this to test frontend functionality

## For backend development:

`npm run build`

- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.
- NEEDS TO BE RUN ANYTIME THERE IS FRONTEND CHANGES

`npm run start node`

- To start the app on the server in port 3000
- Run this to test backend functionality
