import http from 'http';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import joiRouter from 'koa-joi-router';
import mongoose from 'mongoose';
import Donate from '@/models/Donate';

const { Joi } = joiRouter;

const app = new Koa();
const router = joiRouter();

app.use(cors());
app.use(bodyParser({
  enableTypes: ['json'],
}));

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose.connect(process.env.MONGO_DB_CONNECTION, config);

router.route({
  method: 'post',
  path: '/donate',
  validate: {
    body: {
      amount: Joi.number().greater(0).required(),
      currency: Joi.any().custom((value, helpers) => {
        if (['USD', 'EUR', 'GBP', 'RUB'].includes(value)) {
          return value;
        }

        return helpers.error('any.invalid');
      }).required(),
    },
    type: 'json',
  },
  handler: async (ctx) => {
    try {
      await Donate.create(ctx.request.body);

      ctx.status = 200;
      ctx.body = { ok: true };
    } catch (e) {
      ctx.status = 500;
    }
  },
});

app.use(router.middleware());

http.createServer(app.callback()).listen(process.env.PORT);
