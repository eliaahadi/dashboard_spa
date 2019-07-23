# Dashboard Single Page Application Stock Exchange
- Single Page Application with 2 APIs and 3 components.
  - APIS
    - Stocks data via a GET request
    - Carts data via GET and POST request
  - Components
    - Date picker for stock data
    - Buy stock data
    - Carts data of bought stock

# Demo
App on heroku here:
- [Heroku App](https://stock-exchange-webapp.herokuapp.com/)

# Overview
- The tech stack for this application is JavaScript/React/Redux for front end and Ruby on Rails for backend with PostsreSQL database.
- Interactive components for the date component and buying stock components.

# Setup
- git clone repository
- Run rails API server:
```
$ cd stock-app
stock-app $ bundle
stock-app $ rails db:migrate
stock-app $ rails db:seed
stock-app $ rails s
```
- Run frontend React server:
```
stock-app $ cd frontend
frontend $ yarn install
frontend $ PORT=4000 yarn --cwd frontend start
```
- Or to run both servers together using heroku, run command:
```
$ yarn heroku
```
- View frontend at localhost:4000 and backend at localhost:3000/api/carts

# References
- [ReactJS](https://reactjs.org/docs/conditional-rendering.html)
- [Redux](https://redux.js.org/basics/example)
- [Stock API](https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,GOOGL,AMZN)
- [React Rails CRUD](https://medium.com/wineofbits/my-first-ruby-on-rails-react-app-in-just-15-minutes-51d73f0de3c6)
- [Ruby on Rails](https://guides.rubyonrails.org/getting_started.html)
- [React/Ruby App on Heroku](https://medium.com/@bruno_boehm/reactjs-ruby-on-rails-api-heroku-app-2645c93f0814)