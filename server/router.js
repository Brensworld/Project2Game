const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.post('/passChange', mid.requiresSecure, mid.requiresLogout, controllers.Account.passChange);

  app.get('/home', mid.requiresLogin, controllers.Account.homePage);

  app.get('/changeAlien',mid.requiresLogin,controllers.Account.changeAlienPage)
  app.post('/changeAlien',mid.requiresLogin,controllers.Account.changeAlien)

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
