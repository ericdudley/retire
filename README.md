# Debt Collection Calculator ![build workflow status](https://github.com/ericdudley/retire/actions/workflows/build.yml/badge.svg?branch=main)

The purpose of this application is to provide a tool for people to calculate what percent of their paycheck they should contribute to their 401k in order to hit a target contribution amount by the end of the year. This tool will be useful for people who are:

- Joining a new company
- Changing 401k providers
- Having a change in salary
- Wanting to adjust how much they're saving for retirement

## Example 1: Beginning of year

| Annual Salary | Paycheck Frequency | Last Paycheck         | Target Contribution | YTD Contribution |
| ------------- | ------------------ | --------------------- | ------------------- | ---------------- |
| $72,000       | Semi-Monthly       | December of last year | $12,000             | $0               |

You need to contribute $12,000 over 24 paychecks, so you should contribute $500 per paycheck. Each of your paychecks is $3,000, so you should set your contribution percent to `$500 / $3,000` which is `16.6%`. This is the same as dividing `$12,000 / $72,000`.

## Example 2: Middle of year with YTD contributions

| Annual Salary | Paycheck Frequency | Last Paycheck | Target Contribution | YTD Contribution |
| ------------- | ------------------ | ------------- | ------------------- | ---------------- |
| $90,000       | Semi-Monthly       | March 24th    | $13,000             | $3,000           |

Let's say in March you got a promotion, your salary is now $90,000, and you want to increase your target contribution to $13,000. There are now 18 paychecks before the end of the year, you've already contributed $3,000, so you have $10,000 still to contribute. Therefore, you must contribute $555.56 per paycheck. With your new salary, each of your paychecks is now $3,750, so your contribution percent should be updated to `$555.56 / $3,750` which is `14.8%`.

## Development

This project is a [Create React App](https://github.com/facebook/create-react-app) web application.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
