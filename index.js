const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.get('/dataBreakdown', function(req, res, next) {
        res.render('./pages/dataBreakdown');
});

app.get('/compareWordFrequencies', function(req, res, next) {
        res.render('./pages/compareWordFrequencies');
});
