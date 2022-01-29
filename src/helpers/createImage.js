function createImage(file) {
  var FileReader = require('filereader')
    , reader = new FileReader()
    ;
  return new Promise((resolve) => {
    reader.onload = (e) => {
      resolve({ uri: e.target.result, file });
    };
    reader.readAsDataURL(file);
  });
}

module.exports = createImage;