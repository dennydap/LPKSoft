const   
    express = require('express'),
    http = require('http'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');
    routes = require('./routes/index'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'lpk', cookie: { maxAge: 1080000 }}))
app.use(checkAuth);

app.use('/', routes);
app.use('/login', routes);
app.use('/logout', routes);
app.use('/workshop/sesi1/admin', routes);
app.use('/workshop/sesi1/praktikan', routes)

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

function checkAuth (req, res, next) {
    if (req.url === '/workshop/sesi1/admin' && (!req.session || !req.session.authenticated)) {
        res.redirect('/login');
        return;
    } else {
        next();
    }
    
}

module.exports = app;
