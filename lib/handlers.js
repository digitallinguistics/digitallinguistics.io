exports.home = (req, res) => {
  res.render('home');
};

exports.test = (req, res) => {
  res.render('test', { test: 'Test' });
};
