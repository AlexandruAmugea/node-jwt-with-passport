###Quick Start

# install the dependencies with npm
$ npm install

# start the server
$ node bin/www
```

go to [http://localhost:3000](http://localhost:3000) in your browser.

```

Rest api build with authentification build with passport-jwt.
For development requires mongoDB, it can be deployed to Heroku and it will use the enviroment variable for accessing the DB.
Routes can be found in routes/api.js

TODO: can be used with an ACL system for different types of user and permissions