const fs = require('fs');
const less = require('less');

const filenames = fs.readdirSync('./public/less');

filenames.forEach(filename => {

  fs.readFile(`./public/less/${filename}`, 'utf8', (err, res) => {

    if (err) {
      console.error(err, err.stack);
    } else {

      less.render(res).then(output => {

        fs.writeFileSync(`./public/css/${filename.replace('.less', '.css')}`, output.css, 'utf8');

      }).catch(err => console.error(err, err.stack));

    }


  });

});
