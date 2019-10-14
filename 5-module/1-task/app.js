const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();
let users = [];

router.get('/subscribe', async (ctx, next) => {

    const user = await new Promise( resolve => {        
        users = users.concat({id: ctx.request.query.r, resolve: resolve});
        ctx.res.on('close', () => {
            users = users.filter(user => user.id !== ctx.request.query.r );
        });
    })
    ctx.body = user;
});

router.post('/publish', async (ctx, next) => {
    
    const {message} = ctx.request.body;
    
    if (!message) {
        ctx.status = 400;
        ctx.body = '';
    } else {
        ctx.status = 200;
        users.forEach( user => user.resolve(message) );
        users = [];
    }
});

app.use(router.routes());

module.exports = app;
