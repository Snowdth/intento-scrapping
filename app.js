var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("http://www.paginasblancas.pe/persona/hans-evangelista", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('ul.m-results-businesses > li.m-results-subscriber').each(function( index ) {
    var title = $(this).find('h3.m-results-business--name > a.no-link').text().trim();
    var score = $(this).find('div.m-results-business--address > span:nth-child(1)').text().trim();
    var user = $(this).find('span.m-icon--single-phone > a').text().trim();
    console.log("Title: " + title);
    console.log("Score: " + score);
    console.log("User: " + user);
    fs.appendFileSync('reddit.txt', title + '\n' + score + '\n' + user + '\n');
  });

});