const 
	express = require('express'),
	router = express.Router();

/* Home Page */
router.get('/', (req, res) => {
    res.render('index', { title: 'Lab Perangkat Keras' });
});

/* Login & Logout */
router.get('/login',  function (req, res) {
    res.render('login', { title: 'Lab Perangkat Keras - Login' });
});

router.post('/login/sesi1', function (req, res) {
    if (req.body.username && req.body.username === 'lpk' && req.body.password && req.body.password === 'n00bers') {
        req.session.authenticated = true;
        res.redirect('workshop/sesi1/admin');
    } else {
        res.redirect('/login');
    }
});

router.post('/login/sesi2', function (req, res) {
    if (req.body.username && req.body.username === 'lpk' && req.body.password && req.body.password === 'n00bers') {
        req.session.authenticated = true;
        res.redirect('workshop/sesi2/admin');
    } else {
        res.redirect('/login');
    }
});

router.get('/logout', function (req, res) {
    delete req.session.authenticated;
    res.redirect('/');
});    

/* Workshop WLAN */
/*   Admin Page  */
router.get('/workshop/sesi1/admin/', checkAuth, (req, res) => {
    res.render('workshop/sesi1/admin', { title: 'Lab Perangkat Keras - Introduction to WLAN - Sesi 1' });  
});

router.get('/workshop/sesi2/admin/', checkAuth, (req, res) => {
    res.render('workshop/sesi2/admin', { title: 'Lab Perangkat Keras - Introduction to WLAN - Sesi 2' });  
});

/* Workshop WLAN */
/*   User Page   */
router.get('/workshop/sesi1/praktikan/', (req, res) => {
	res.render('workshop/sesi1/index', { title: 'Lab Perangkat Keras - Introduction to WLAN - Sesi 1' });
});

router.get('/workshop/sesi2/praktikan/', (req, res) => {
    res.render('workshop/sesi2/index', { title: 'Lab Perangkat Keras - Introduction to WLAN - Sesi 2' });
});

function checkAuth (req, res, next) {
    if (!req.session.authenticated) {
         res.redirect('/login');
         return;
     } else {
         next();
     }
}

module.exports = router;
