# Chart management app

This is a simple chart management app that allows users to create, read, update and delete charts. The app is built using React

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `mv ".env.example" ".env"` to create the environment file
4. Change VITE_API_KEY in `.env` file to your FRED API key (it should be 32 symbols)
5. Run `npm run dev` to start the development server
6. Open `http://localhost:5173/` in your browser

## Features

- Create a chart
- Edit a chart
- Delete a chart
- View charts in a list

## Technologies

- [React](https://react.dev/reference/react) - library for building user interfaces
- [Typescript](https://www.typescriptlang.org/docs/) - superset of Javascript that adds static types
- [Vite](https://vitejs.dev/guide/) - build tool
- [Tailwind CSS](https://tailwindcss.com/docs/installation) - css framework
- [Material UI](https://mui.com/material-ui/getting-started/) - library that implements Google's Material Design
- [Material UI X-Charts](https://mui.com/x/react-charts/) - Material UI chart library

## Phylosophy

- The app is based on [feature-sliced](https://feature-sliced.design/docs) architecture
- This app uses minimum dependencies (no React-Router or Redux, which are usually used in React apps, but not needed for this simple app) to keep it simple and lightweight
- MUI components customized with Tailwind CSS to have unique design
- This app uses data from [https://api.stlouisfed.org](https://api.stlouisfed.org)
- This app uses localstorage as fake database to store the charts
