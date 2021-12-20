module.exports = async (app, passport) => {

    // Login
    app.get('/', (req, res) => {
        res.render('index');
    })

    app.get('/login', isLoggedIn2, (req, res) => {
        res.render('login/login', {
            message: req.flash('loginMessage')
        })
    })

    app.get('/signup', isLoggedIn2, (req, res) => {
        res.render('login/signup', {
            message: req.flash('signupMessage')
        })
    })

    app.get('/err-login', (req, res) => {
        res.render('err/notLoged')
    })

    app.get('/err-nlogin', (req, res) => {
        res.render('err/yepLoged')
    })

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile', {
            user: req.user
        })
    })

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login', 
        failureFlash: true
    }))

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup', 
        failureFlash: true
    }))

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
            return res.redirect('/err-login')
    }

    function isLoggedIn2(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
            return res.redirect('/err-nlogin')
            
    }
}