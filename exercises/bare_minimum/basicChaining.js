/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor.js');
var promisification = require('./promisification.js');

var writeJSONresponse = function(writeFilePath, response) {
  return new Promise((resolve, reject) => {
    fs.writeFile(writeFilePath, response, 'utf8', function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then((result) => { return promisification.getGitHubProfileAsync(result); })
    .then((result2) => { return writeJSONresponse(writeFilePath, JSON.stringify(result2)); })
    .catch((err) => { console.log(err); });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
