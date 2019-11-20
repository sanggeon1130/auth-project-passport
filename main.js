var express = require('express');
var app = express();
var template = require('./lib/template.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var fs = require('fs');
var auth = require('./lib/auth.js');


app.use(session({
    secret:'abcdefg',
    resave:false,
    saveUninitialized:true,
    store: new FileStore
}))


var authData = {
    email:'tom333@gmail.com',
    password:'1234',
    nickname:'tom'
}

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user.email)
    })

    passport.deserializeUser(function(id, done){
        done(null, authData)
    })

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
function(username, password, done){
    if(username === authData.email){
        if(password === authData.password){
            return done(null, authData)
        }
        else{
            return done(null, false, {message:'wrong password'})
        }
    }else{
        return done(null, false, {message:'wrong username'})
    }
}
))



app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(request, response){
    var title = "Welcome";
    var _template = template.html(title,'','Welcome to our page.In this page you can experience the very basic form of an authentication.Hope you enjoy.......'
    ,'',auth.authStatusUI(request, response))

    response.send(_template);
})



app.get('/login', function(request, response){
 var title = "login";
 var _template = template.html(title,'',`
    <form action = "/login" method = "post">
    <p><input type = "text" name = "email" placeholder = "type your email!"</p>
    <p><input type = "password" name = "password" placeholder = "type your password!"</p>
    <input type = "submit" value = "login">
    </form>

 `,'',auth.authStatusUI(request, response));
 response.send(_template);
})



app.post('/login', passport.authenticate('local', {
successRedirect:'/',
failureRedirect:'/login'
})
   
)

app.get('/logout', function(request, response){
    request.logout();
    request.session.save(function(){
        response.redirect('/');
    })
})


app.listen(5000, function(){
    console.log('port 5000!')
})