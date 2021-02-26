# Interview Scheduler

Interview Scheduler is a single page application built using React, where user can book, edit, and delete appointments. Data is persisted by an API server using a PostgreSQL database. Tests were made using Jest and Cypress.

## Screenshots 

!['Homepage'](https://github.com/jangjinny/scheduler/blob/master/public/images/homepage.png?raw=true)
!['Add new appointments'](https://github.com/jangjinny/scheduler/blob/master/public/images/newApp.png?raw=true)
!['Edit existing appointments'](https://github.com/jangjinny/scheduler/blob/master/public/images/editBox.png?raw=true)
!['Confirm before deleting appointments'](https://github.com/jangjinny/scheduler/blob/master/public/images/deleteConfirm.png?raw=true)
!['Error message if appointment cannot be deleted'](https://github.com/jangjinny/scheduler/blob/master/public/images/ErrorDelete.png?raw=true)

## Setup

Install dependencies with `npm install`.
Install Cypress with `npm install cypress --save-dev` for testing.
Install scheduler-api from https://github.com/jangjinny/scheduler-api with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
