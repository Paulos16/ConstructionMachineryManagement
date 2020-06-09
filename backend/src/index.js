const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const moment = require('moment');

const AuthController = require('./controllers/AuthController');
const MachinesController = require('./controllers/MachinesController');
const ApplicationsController = require('./controllers/ApplicationsController');
const DefinitionsController = require('./controllers/DefinitionsController');
const OverwievsController = require('./controllers/OverwievsController');

const AuthService = require('./services/AuthService');

const cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
})

const server = restify.createServer({name: 'CMM Backend API'});

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

server.pre(function(req, res, next) {
  if(req.path() != '/api/auth/login') {
    if(req.header('Authorization') === undefined || !req.header('Authorization').startsWith('Bearer ') || req.header('Authorization') <= 7) {
      res.send(401);
      return next(new Error('Unauthorized'));
    } else {
      if(!AuthService.verifyToken(req.header('Authorization').split(' ')[1])) {
        res.send(401);
        return next(new Error('Unauthorized'));
      }
    }
    
  }
  return next();
});

server.on('after', function (req, res, route, error) {
  if(req !== undefined && req.route !== undefined && req.route.method !== undefined) {
    console.log(`[${moment().format('hh:mm:ss')}] ${req.route.method}\t${req.path()}` + (res.statusCode === undefined ? '' : `\tstatus: ${res.statusCode}`));
  }
});

server.on('uncaughtException', function (req, res, route, error) {
  console.warn('!!! Uncaught Exception !!!');
  res.send(500, 'Internal server error');
});

server.post('/api/auth/login', AuthController.login);
server.get('/api/rodzajeMaszyn', MachinesController.getMachinesTypes);
server.put('/api/wnioski', ApplicationsController.addApplication);
server.get('/api/wnioski', AuthController.login);
server.patch('/api/wnioski', AuthController.login);
server.put('/api/maszyny', AuthController.login);
server.get('/api/maszyny', AuthController.login);
server.get('/api/definicje', AuthController.login);
server.put('/api/zleceniaDefinicji', AuthController.login);
server.get('/api/zleceniaDefinicji', AuthController.login);
server.put('/api/definicje', AuthController.login);
server.put('/api/przeglady', AuthController.login);
server.put('/api/rodzajePrzegladow', AuthController.login);
server.patch('/api/przeglady', AuthController.login);
server.post('/api/przeglady', AuthController.login);
server.patch('/api/maszyny', AuthController.login);

server.listen(5000, () =>  console.log('%s listening at %s\n', server.name, server.url));