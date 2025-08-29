# Product List App

This project is a React Native (Expo) app that displays a product list with search and category filtering functionality.
The app is built using functional components with hooks and follows a clean architecture with separation of concerns: `screens/` for UI, `services/` for API handling with error management, and `stateManager/` for state management using Context API.
Users can search products by name, filter by category, and see results updated in real time, with a loading indicator during data fetching and a friendly message when no products are found.
The app is styled with a modern UI, makes use of SafeAreaView for consistent layouts across devices, and integrates FlatList and Picker for listing and filtering. To run the project, simply clone the repository, install dependencies with `npm install`, and start with `npx expo start`, or install the provided APK (release build) without needing a development server.

## Folder Structure
.
 screens/ # All UI screens (React Native components)
 Root.js # Main product list screen

 services/ # API handling
 api_service.js # fetchData utility with error handling

stateManager/ # Context API state management
 items.js # ItemsProvider & context for global state

 App.js # Entry point, wraps Root with ItemsProvider
 package.json # Dependencies and scripts

## How to Run
1. Clone the repo below
https://github.com/MohamedRiham/thrive_360_practical
2. Install dependencies: `npm install`
3. Start project: `npx expo start`

## APK
You can download the APK from: [link]

## Tech Stack
- React Native
- Expo
- Context API (state management)
