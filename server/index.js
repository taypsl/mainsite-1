// Importing Node modules and initializing Express
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  router = require('./router'),
  mongoose = require('mongoose'),
  socketEvents = require('./socketEvents'),
  config = require('./config/main'),
  path = require('path'),
  expressSession = require('express-session'),
  MongoStore = require('connect-mongo')(expressSession),
  passport = require('passport'),
  cookieParser = require('cookie-parser');

// Database Setup
mongoose.Promise = require('bluebird');
//connect to test database
mongoose.connect(config.database, { useMongoClient: true })
        .then(
            ()=> {console.log("Connected to DB")},
            (err) => {console.log("error: ", err)}
          )

// Start the server
let server;
const port = process.env.PORT || config.testPort; 
server = app.listen(port);
console.log(`Your server is running on port ${port}.`);

//Serve the front end
app.use(express.static(path.join(__dirname, '../client/')));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root : path.join(__dirname, '../client/')});
});

app.get(/^(?:(?!\/api).)*$/, (req, res) => {
  res.sendFile('index.html', {root : path.join(__dirname, '../client/')});
});

//set up sockets for multi-client chat
const io = require('socket.io').listen(server);

socketEvents(io);

// Set static file location for production
// app.use(express.static(__dirname + '/public'));

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan

//set up session middleware using mongoStore *** this needs to happen before initializing passport ***
app.use(expressSession({
  secret: 'secret',
  cookie: {maxAge: config.mongoDBSessionMaxAge * 1000},
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    clear_interval: config.mongoDBSessionMaxAge
  })
}));

app.use(cookieParser());

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


// Enable CORS 
app.use((req, res, next) => {

  // console.log("adding header");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});




// Import routes to be served
router(app);

// necessary for testing
module.exports = server;
