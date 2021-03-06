const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const moment = require('moment');

const AuthController = require('./controllers/AuthController');
const MachinesController = require('./controllers/MachinesController');
const ApplicationsController = require('./controllers/ApplicationsController');
const DefinitionsController = require('./controllers/DefinitionsController');
const OverviewsController = require('./controllers/OverviewsController');

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

server.use(restify.plugins.queryParser());

server.pre(function(req, res, next) {
  if(req.path() != '/api/auth/login' &&
     req.path() != '/api/teapot') {
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
    console.log(`[${moment().format('HH:mm:ss')}] ${req.route.method}\t${req.path()}` + (res.statusCode === undefined ? '' : `\tstatus: ${res.statusCode}`));
  }
});

server.on('uncaughtException', function (req, res, route, error) {
  console.warn('!!! Uncaught Exception !!!');
  res.send(500, 'Internal server error');
});

server.post('/api/auth/login', AuthController.login);
server.get('/api/rodzajeMaszyn', MachinesController.getMachinesTypes);
server.put('/api/wnioski', ApplicationsController.addApplication);
server.get('/api/wnioski', ApplicationsController.getApplications);
server.post('/api/wnioski', ApplicationsController.setApplicationStatus);
server.patch('/api/wnioski', ApplicationsController.setApplicationApproval);
server.put('/api/maszyny', MachinesController.addMachine);
server.get('/api/maszyny', MachinesController.getMachines);
server.get('/api/definicje', DefinitionsController.getDefinitions);
server.put('/api/zleceniaDefinicji', DefinitionsController.addDefinitionTask);
server.get('/api/zleceniaDefinicji', DefinitionsController.getDefinitionTask);
server.put('/api/definicje', DefinitionsController.addDefinition);
server.patch('/api/definicje', DefinitionsController.addDefinitionDocument);
server.put('/api/przeglady', OverviewsController.addOverview);
server.put('/api/zleceniaPrzegladow', OverviewsController.addOverviewTask);
server.get('/api/zleceniaPrzegladow', OverviewsController.getOverviewTasks);
server.get('/api/przeglady', OverviewsController.getOverviews);
server.patch('/api/przeglady', OverviewsController.addCorrectOverview);
server.post('/api/maszyny', MachinesController.setNextOverviewDate);
server.patch('/api/maszyny', MachinesController.setMachineApproval);
server.get('/api/teapot', (req, res, next) => {
  res.send(418, "Request can't be processed, because the server is a teapot! Please see https://http.cat/418 to get visualization")
  next();
});

server.listen(5000, () =>  console.log('%s listening at %s\n', server.name, server.url));