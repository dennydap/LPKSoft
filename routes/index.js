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

router.post('/login', function (req, res) {
    if (req.body.username && req.body.username === 'lpk' && req.body.password && req.body.password === 'n00bers') {
        req.session.authenticated = true;
        res.redirect('workshop/sesi1/admin');
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
router.get('/workshop/sesi1/admin', (req, res) => {
    res.render('workshop/admin', { title: 'Lab Perangkat Keras - Introduction to WLAN - Sesi 1' });  
});

/* Workshop WLAN */
/*   User Page   */
router.get('/workshop/sesi1/praktikan', (req, res) => {
	res.render('workshop/index', { title: 'Lab Perangkat Keras - Introduction to WLAN - Sesi 1' });
});

module.exports = router;
