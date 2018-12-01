module.exports = context => {
  context.status = 301;
  context.redirect(`https://medium.com/digital-linguistics`);
};
