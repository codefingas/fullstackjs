const express = require('express'),
	   app = express(),
	   bodyParser = require('body-parser'),
	   cors = require('cors'),
	   firebase = require('firebase-admin');

/**I WOULD TRY DESTRUCTURING THE BODY-PARSER URLENCODED CHARACTER AFTER I SEE IT WORKS */

let port = process.env.PORT || 3000;