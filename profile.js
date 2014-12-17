var http = require("http");

//Print out message
function printMessage(username, badgeCount, points){
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in Javascript.";
  console.log(message);

};

//Print out error message
function printError(error){
  console.error(error.message);
};


//GET request on API data
function get(username){
  var request =  http.get("http://teamtreehouse.com/" + username + ".json", function (response){
    var body = "";
    response.on('data', function(chunk){
      body += chunk;
    });

    response.on('end', function(){
      if(response.statusCode == 200){
        try{
          //Parse data
          var profile = JSON.parse(body);
          //Print data
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error){
          //Parse Error
          printError(error);
        }
      } else {
        //Status Code Error
        printError ({message: "There was an error getting profile information for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")."})
      }
    });
  });
  //Connection Error
  request.on("error", printError);
}


module.exports.get = get;
