# Presentation

This project uses your localization and the Google Maps API to find and display the 10 closest restaurants from your current position. \
This project was made by Pierre Ollivier for [Cruncho](https://cruncho.com). \
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Limits

The maximum count of requests allowed by the Google Maps API is 6000 by minute.

# Frequent issues

If the application is blocked and says "Acquiring your localization...", please double-check that you enabled the localization on your device and that you allowed your browser to access it. \
If the application is blocked and says "Crunching restaurant data", there might be a connection issue. Do not hesitate to double-check your internet connection.

## Run the application on your device

The first step is to clone this repository where you want to find the application, running the following command: \
`git clone https://github.com/pierre-ollivier/cruncho-nearest-restaurants.git` \
or \
`git clone git@github.com:pierre-ollivier/cruncho-nearest-restaurants.git`.

Then, in the project directory, you can run:

### `npm run build`

Builds the app, giving you the smoothest experience. It requires you, after the build, to run `serve -s build` before using the application.

### `npm start`

Runs the app in the development mode. This command is sufficient to run the application, but the performances might be a bit slower.

# License

This project is provided without any license. However, some of the components of the project may be linked to a license.
