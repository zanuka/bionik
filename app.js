const Koa = require('koa')
const app = module.exports = new Koa();

const router = require('koa-router')();
const parse = require('co-body');

const monk = require('monk');
const wrap = require('co-monk');
const db = monk('localhost/koa_users');
const users = wrap(db.get('users'));

router.get('/user', saveUser);
router.get('/user/:id', getUser);

app
 .use(router.routes())
 .use(router.allowedMethods());

function *saveUser () {
 var userFromRequest = yield parse(this);
 try {
  var user = yield users.insert(userFromRequest);
 }
 catch(e) {
  this.body = "An error occurred: " + e;
  this.status = 401;
  return;
 }
 finally {}
 this.body = user;
 this.set("Location", "/user/" + user._id);
 this.status = 201; // CREATED OK
};

function *getUser (id) {
 var user = yield users.findById(id);
 this.body = user;
 this.status = 200; //OK
};

app.listen(3000);
console.log("The app is listening. Port 3000");