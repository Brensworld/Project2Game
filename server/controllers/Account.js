const models = require('../models');
const AccountModel = require('../models/Account');

const { Account } = models;

const loginPage = (req, res) => res.render('login');
const homePage = (req, res) => res.render('app');
const changeAlienPage=(req,res)=>res.render('changeAlien');

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }
    req.session.account = Account.toAPI(account);
    console.log(req.session.account);
    return res.json({ redirect: '/home' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/home' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

const passChange = async (req, res) => {
  const username = `${req.body.username}`;
  const oldPass = `${req.body.oldPass}`;
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  if (!username || !oldPass || !newPass || !newPass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (newPass !== newPass2) {
    return res.status(400).json({ error: 'New passwords do not match!' });
  }

  if (newPass === oldPass) {
    return res.status(400).json({ error: 'New password must be new!' });
  }

  return Account.authenticate(username, oldPass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    try {
      const hash = await Account.generateHash(newPass);
      await AccountModel.findOneAndUpdate(
        { username },
        { $set: { password: hash } },
        { new: true },
      );
      return res.json({ redirect: '/login' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'An error occured!' });
    }
  });
};


const changeAlien=async (req,res)=>{
  const username=`${req.body.username}`;
  const alien=`${req.body.alien}`;

  if(!alien || !username){
    return res.staus(400).json({error:'Username or alien is missing'});
  }

  try{
    await AccountModel.findOneAndUpdate(
      {username},
      {$set:{alien}},
      {new:true}
    );
    return res.status(200);
  }catch(err){
    return res.status(500).json({error:'an error occured'});
  }
}

module.exports = {
  loginPage,
  homePage,
  login,
  logout,
  signup,
  passChange,
  changeAlienPage,
  changeAlien
};
