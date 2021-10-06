/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, cb) {
  fs.readFile(filePath, 'utf8', function (err, content) {
    if (err) {
      return cb(err);
    } else {
      firstLine = content.split('\n').shift();
      return cb(null, firstLine);
    }

  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, cb) {
  request.get(url, function(err, response) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
