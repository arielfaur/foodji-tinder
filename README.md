# FoodTinder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Description

This is a sample Angular project to demonstrate voting in a very basic Tinder-like user interface (still missing Tinder transitions and animations though).
The focus is on the architecture and the use of state management using the NGXS library to maintain the app state and keep track of user actions including:
 - the product list 
 - the current product in the viewport
 - the votes for each product
 
Also, the changes are persisted across reloads using the browser local storage. A very simple polling with an interval has been set, which triggers a fetch action to the store, whicn in turn updates the product list with any additions. There's a toggle to switch between showing all products or food only (comes back empty from API sometimes...)

There are a number of improvements to be done:
- Implement background fetch: e.g. use web workers to poll API
- The current implementation polls the API and updates the product list with new products not currently in the store. However, this doesn't account for product field updates - this would require some fine tuning
- Still missing animation and transitions


## Development server
Run `npm install` at the root to install all dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
