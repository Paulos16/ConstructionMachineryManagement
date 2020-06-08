const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const AuthController = require('./controllers/AuthController');


const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
})

const server = restify.createServer();

server.pre(restify.plugins.pre.dedupeSlashes());
server.pre(function(req, res, next) {
  req.headers.accept = 'application/json';
  return next();
});

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.bodyParser({
  maxBodySize: 0,
  mapParams: true,
  mapFiles: false,
  overrideParams: false,
  keepExtensions: false,
  multiples: true,
  hash: 'sha1',
  rejectUnknown: true,
  requestBodyOnGet: false,
  reviver: undefined,
  maxFieldsSize: 2 * 1024 * 1024
}));

server.post('/auth/login', AuthController.login);

server.listen(5000, () =>  console.log('%s listening at %s', server.name, server.url));