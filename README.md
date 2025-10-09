# Fire & Ice SPA — Angular 20 Application

## Overview  
**IceFire SPA** is a Single Page Application built with **Angular 20**, with data from the public [An API of Ice and Fire](https://anapioficeandfire.com/).  
It displays books, characters, and detailed information from the *Game of Thrones* universe.  
The project demonstrates Angular concepts such as routing, reactive programming with RxJS, NgRx state management, Material UI integration, and end-to-end testing with Cypress.

---

## Tech Stack
- **Framework:** Angular 20  
- **UI Library:** Angular Material  
- **State Management:** NgRx Store & Effects  
- **Testing:** Jasmine + Karma (unit), Cypress (e2e)  
- **Mock Server:** Express (local mock data)  
- **Loader:** ngx-ui-loader  
- **Reactive Library:** RxJS  

---

## Note: Before running the front-end
- make sure the back-end API is running and accessible locally.
The application relies on live API endpoints (e.g. /api/books, /api/characters).
If the API is not running, data will not be loaded correctly.
- git clone https://github.com/IvanJohnson571/Fire-IceBE.git

---

## Installation & Setup

### 1. Clone the repository

- git clone https://github.com/IvanJohnson571/Fire-IceFE.git
- cd ice-fire-spa

### 2. Install dependencies
	npm install

### 3. Start the development server
	npm start

App will be available at http://localhost:4200

## Testing

### 1. Unit Tests
	npm test
### 2. Code Coverage
	npm run test:coverage
### 3. End-to-End Tests (Cypress)
	npm run e2e

## Build
	npm run build

## Author

Ivan Ivanov