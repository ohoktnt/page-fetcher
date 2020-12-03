// Page Downloader Challenge
// command line app take a URL as a command-line arugment as
// as well as a local path file and download the resource to the
// specified path

const request = require('request');
const fs = require('fs');

const args = process.argv;
const url = args[2];
const path = args[3];

function getFileSize (file) {
  const stats = fs.statSync(path.slice(2));
  const fileSize = stats.size;
  return fileSize;
};

// requesting information and creating a file
request(url, (error, response, body) => {
  // if URL results in an error
  if(error){
    console.log('error:', error);
  } 
  // if statusCode is not 200
  if(response && response.statusCode !== 200){
    console.log('statusCode:', response && response.statusCode);
  }
  // if path invalid
  if(!path) {
    console.log(`path invalid!`)
  }
  // write the body into a file
  if (!error) {
    fs.writeFile(path.slice(2), body, (err) =>{
      if (err) throw err;
      const size = getFileSize(path.slice(2));
      console.log(`Downloaded and saved ${size} bytes to ${path}`);
    })
  }
});

