require('../../credentials/dlx-org');
const AzureStorage = require('azure-storage');

const storage = AzureStorage.createBlobService();

const opts = {
  contentSettings: {
    contentType: 'text/css'
  }
};

const handler = (err, res) => {
  if (err) {
    console.error(err, err.stack);
  } else {
    console.log(res);
  }
};

// Assets to upload when changed
//
// dlx.css
// dlx.less
// favicon.ico
// fonts.css
// fonts.less
// reset.css
// reset.less
//
// Anything in the /img folder that might get reused across subdomains

// NB: make sure to change contentType above when you run this
storage.createBlockBlobFromLocalFile('less', 'dlx.less', './public/less/dlx.less', opts, handler);
