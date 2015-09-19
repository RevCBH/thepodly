var Firebase = require('firebase');
var cfgenv = process.argv[2] || 'dev';
var Config = require('../.config/' + cfgenv + '.json');
var ref = new Firebase(Config.firebase.rootUrl);

ref.on('value', function(snapshot) {
  console.log(JSON.stringify(snapshot.val()));
  process.exit(0);
});
