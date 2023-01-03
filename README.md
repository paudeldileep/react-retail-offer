# A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

- A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point
  for every dollar spent between $50 and $100 in each transaction.
  (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

- Given a record of every transaction during a three month period, calculate the reward points earned

# Basic project structure

    ## App.js
        - Contains the main logic for the application UI
    ## services folder
        ### api.js
            - Contains the logic for the API calls(mock data)
        ### dataSet.js
            - Contains the mock data
        ### helper.js
            - Contains the helper functions for the calculation of reward points
    ## components folder
        ### Loader.js
            - Contains the loader component

    ## screenshots folder
        - Contains the screenshots of the application

## external libraries Used

    ### react-data-table-component
        - Used for the table component
    ### tailwindcss
        - Used for the styling of the application

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
