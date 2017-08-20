require('babel-core/register');

const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = '"I can drive anything on wheels... I can drive anything, actually." -- Stone Cold Steve Austin';
});

app.listen(3000);

console.log('The app is now listening on port 3000!');