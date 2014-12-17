var profile = require("./profile.js");

// console.dir(process);

var users = process.argv.slice(2);

// var users = ["chalkers", "nataliemiller"];

users.forEach(profile.get);
