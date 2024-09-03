# About

![General Results](/screenshots/results.png)

**spotify-wrapped-up-estimate** is an Angular application designed to give you a sneak peek of what your Spotify Wrapped might look like at the end of 2024. The app retrieves your top tracks and artists using Spotify's Web API, then infers your top genre and estimates your total minutes listened. It presents these insights in a format similar to Spotify's 2023 Wrapped, allowing you to preview your music habits before the official Wrapped is released.

# Built With

* [![Angular][Angular]][Angular-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![RxJS][RxJS]][RxJS-url]

<!-- GETTING STARTED -->
# Getting Started
## Prerequisites


1. **Spotify Developer Account**: To access your Spotify data, you need to create a Spotify Developer account and register an API application.

   - Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
   - Log in with your existing Spotify account.
   - Click on **Create an App** to register a new application.
   - Complete the required fields such as **App Name**, **App Description**, **Website**, and **Redirect URI** (make sure to set this to `http://localhost:4200/callback`).
   - After creating your application, you will be provided with a **Client ID** and **Client Secret**. These credentials will be used to authenticate your application with the Spotify API.

2. **NPM and Node.js**: You need to have Node.js and npm installed to run the application.

   - If you don’t have Node.js installed, download and install it from the [official Node.js website](https://nodejs.org/).
  
## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/FionnMcA/spotify-wrapped-up-estimate.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter Your Spotify API Application Credentials in `environments.ts`

   In your Angular project, navigate to the `src/environments/` directory and open the `environments.ts` file. Enter your Spotify API credentials as follows:

   ```typescript
   export const environment = {
     production: false,
     SPOTIFY_CLIENT_ID: 'YOUR_CLIENT_ID',
     SPOTIFY_CLIENT_SECRET: 'YOUR_CLIENT_SECRET',
     REDIRECT_URI: 'http://localhost:4200/callback'
   };

# Usage

Once you have set up the `spotify-wrapped-up-estimate` application and installed all dependencies, you can start using it to fetch your listening data from Spotify and generate an estimate of your Spotify Wrapped Up.

## Running the Application
1. **Start the Application**

   To run the application, open your terminal, navigate to the project directory, and execute the following command:
   ```sh
   npm start
   ```

2. **Authorize with Spotify**
   Open your web browser and navigate to the following URL to authorize the application with your Spotify account: 
   ```sh
   http://localhost:4200
   ```
   You will be redirected to Spotify's authorization page. Log in and authorize the application to access your listening data.

5. **Generate Your Estimated Spotify Wrapped**
   After authorizing the application, it will automatically fetch your listening data, redirect you to the results page, and generate and display your estimated Spotify Wrapped.

## Results

| Blue | Green | Orange | Red |
|------|-------|--------|-----|
| ![Blue Results](/screenshots/blue-results.png) | ![Green Results](/screenshots/green-results.png) | ![Orange Results](/screenshots/orange-results.png) | ![Red Results](/screenshots/red-results.png) |

   
[Angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/

[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[RxJS]: https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white
[RxJS-url]: https://rxjs.dev/
