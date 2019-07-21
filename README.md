# dashboard_spa
Dashboard Single Page Application

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


# References
- [ReactJS](https://reactjs.org/docs/conditional-rendering.html)
- [Redux](https://redux.js.org/basics/example)
- [Stock API](https://financialmodelingprep.com/api/v3/historical-price-full/AAPL,GOOGL,AMZN)
- [React Rails CRUD](https://medium.com/wineofbits/my-first-ruby-on-rails-react-app-in-just-15-minutes-51d73f0de3c6)
- [Ruby on Rails](https://guides.rubyonrails.org/getting_started.html)