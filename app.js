var express = require('express');
var app = express();
require('dotenv').config();

app.set('port', (process.env.PORT || 80));
app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
    const redirection_domain = process.env.DESTINATION;
    const permanent_redirect = process.env.PERMANENT_REDIRECT;
    const include_route = process.env.INCLUDE_ROUTE;

    let redirect_code = permanent_redirect ? 301 : 302;
    let redirect_path = include_route ? redirection_domain + req.path : redirection_domain;

    res.set('location', redirect_path);
    res.status(redirect_code).send();
});

app.listen(app.get('port'), function() {
  console.log("301 Redirect is running on " + app.get('port'));
});