var fs = require('fs');
var Firebase = require('firebase');
var cfgenv = process.argv[2] || 'dev';
var Config = require('../.config/' + cfgenv + '.json');
var ref = new Firebase(Config.firebase.rootUrl);

var json = fs.readFileSync('/dev/stdin').toString();
ref.set(JSON.parse(json), function() {
  process.exit(0);
});
