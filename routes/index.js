const 
	express = require('express'),
	router = express.Router(),
	auth = require('basic-auth'),
	masterUser = 'username',
    masterPass = 'password';

/* GET home page. */
router.get('/', (req, res) => {
    res.render('workshop/index', { title: 'Lab Perangkat Keras - Introduction to WLAN' });
});

router.get('/workshop/sesi1/admin', (req, res) => {
	var user = auth(req);

    if (user === undefined || user['name'] !== masterUser || user['pass'] !== masterPass) {
        res.statusCode = 401;
        res.setHeader('Authentication', 'Buktikan bahwa kalian salah satu dari Noobers!');
        res.end('Unauthorized');
    } else {
        res.render('workshop/admin', { title: 'Lab Perangkat Keras - Introduction to WLAN - Sesi 1' });
    }
});

/* GET home page. */
router.get('/workshop/sesi1/praktikan', (req, res) => {
	res.render('workshop/index', { title: 'Lab Perangkat Keras - Introduction to WLAN - Sesi 1' });
});


module.exports = router;
