require('babel-core/register');

const Koa = require('koa');
const app = new Koa();

app.use(function *xResponseTime (next) {
 var start = new Date;
 yield next;

 var ms = new Date - start;
 this.set("X-Response-Time", ms + " ms");
});

app.use(function *consoleLogger (next) {
 var start = new Date;
 yield next;

 var ms = new Date - start;
 console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(async ctx => {
  ctx.body = 'such response time';
});

app.listen(3000);

console.log('The app is now listening on port 3000!');