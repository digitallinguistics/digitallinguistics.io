const fs = require('fs');
const path = require('path');

const logErrors = err => console.error(err);

exports.convert = (converter, config) => {

  if (!config.src || !config.dest) {
    throw new Error('Source and destination configs required.');
  }

  if (!config.src.path || !config.src.ext || !config.dest.path || !config.dest.ext) {
    throw new Error('Additional attributes needed in config object.');
  }

  const convert = input => {
    return new Promise((resolve, reject) => {
      converter(input.data)
      .then(output => resolve({ data: output, fileName: input.fileName }))
      .catch(reject);
    });
  };

  const getInput = fileName => {
    return new Promise((resolve, reject) => {
      fs.readFile(config.src.path + '/' + fileName, { encoding: 'utf8' }, (err, inputData) => {
        if (err) { reject(err); }
        else { resolve({ data: inputData, fileName }); }
      });
    });
  };

  const generateFile = output => {
    var regexp = new RegExp('.' + config.src.ext + '$');
    const newFileName = output.fileName.replace(regexp, '.' + config.dest.ext);
    fs.writeFile(path.join(config.dest.path, '/', newFileName), output.data);
  };

  fs.readdir(config.src.path, (err, fileNames) => {
    if (err) { logErrors(err); }
    else {
      fileNames.forEach(fileName => {
        getInput(fileName)
        .then(convert)
        .then(generateFile)
        .catch(logErrors);
      });
    }
  });

};

exports.convertFile = (converter, config) => {

  const convert = input => new Promise((resolve, reject) => {
    converter(input).then(resolve).catch(reject);
  });

  const generateFile = output => {
    fs.writeFile(config.dest.path, output);
  };

  const getInput = () => new Promise((resolve, reject) => {
    fs.readFile(config.src.path, { encoding: 'utf8' }, (err, data) => {
      if (err) { reject(err); }
      else { resolve(data); }
    });
  });

  getInput()
  .then(convert)
  .then(generateFile)
  .catch(logErrors);
};
