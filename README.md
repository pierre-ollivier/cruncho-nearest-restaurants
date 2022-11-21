# Presentation

![image](https://user-images.githubusercontent.com/99399264/203172854-c548491f-9a34-42b3-b6d4-18d7b0f9b790.png)

This project uses your localization and the Google Maps API to find and display the 10 closest restaurants from your current position. \
This project was made by Pierre Ollivier for [Cruncho](https://cruncho.com). and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Functionalities

Once the localization is enabled and the request succeed, the application displays 10 restaurants close to your position, ordered by their distance. The name, address, rating and indicative price of the restaurant are displayed when they are available. \
The map on the right is interactive. You can zoom in and out, and you can click on the markers to get the name of the restaurant that you selected.

## API information

The maximum count of requests allowed by the Google Maps API is 6000 by minute. \
Note that an API key was generated and put directly inside the code to let you experiment the app. You can of course replace it with your own API key. Note that the API key may be suspended anytime and without any notice.

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
