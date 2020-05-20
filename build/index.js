/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/bin/www.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cookie-parser */ "cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! morgan */ "morgan");
/* harmony import */ var morgan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(morgan__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _routes_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/index */ "./src/routes/index.js");
/* harmony import */ var _routes_cable_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/cable.routes */ "./src/routes/cable.routes.js");
/* harmony import */ var _routes_pool_routes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/pool.routes */ "./src/routes/pool.routes.js");






// import placesRouter from './routes/places.routes';

var app = express__WEBPACK_IMPORTED_MODULE_0___default()();

app.use(morgan__WEBPACK_IMPORTED_MODULE_2___default()('dev'));
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.json());
app.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({ extended: false }));
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_1___default()());

app.use('/', _routes_index__WEBPACK_IMPORTED_MODULE_3__["default"]);
app.use('/cable', _routes_cable_routes__WEBPACK_IMPORTED_MODULE_4__["default"]);
app.use('/pool', _routes_pool_routes__WEBPACK_IMPORTED_MODULE_5__["default"]);
// app.use('/places', placesRouter);

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ "./src/bin/config.js":
/*!***************************!*\
  !*** ./src/bin/config.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);


dotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config({ silent: "development" === 'production' });

/***/ }),

/***/ "./src/bin/www.js":
/*!************************!*\
  !*** ./src/bin/www.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/bin/config.js");
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/stable */ "core-js/stable");
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_stable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! regenerator-runtime/runtime */ "regenerator-runtime/runtime");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app */ "./src/app.js");







var debug = __webpack_require__(/*! debug */ "debug")('beanfeast:server');

var port = process.env.PORT || 3000;
_app__WEBPACK_IMPORTED_MODULE_4__["default"].set('port', port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? "Pipe ".concat(port) : "Port ".concat(port);

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error("".concat(bind, " requires elevated privileges"));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error("".concat(bind, " is already in use"));
      process.exit(1);
      break;
    default:
      throw error;}

}

var server = http__WEBPACK_IMPORTED_MODULE_3___default.a.createServer(_app__WEBPACK_IMPORTED_MODULE_4__["default"]);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? "pipe ".concat(addr) : "port ".concat(addr.port);
  debug("Listening on ".concat(bind));
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/***/ }),

/***/ "./src/controllers/cable.controller.js":
/*!*********************************************!*\
  !*** ./src/controllers/cable.controller.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_cable_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/cable.services */ "./src/services/cable.services.js");
/* harmony import */ var _services_pool_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/pool.services */ "./src/services/pool.services.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}


var newCable = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {var _req$query, _req$query$fromTime, fromTime, _req$query$toTime, toTime, _req$query$maxPeople, maxPeople, latitude, longitude, sessionId, cable, poolEntry;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_req$query =







            req.query, _req$query$fromTime = _req$query.fromTime, fromTime = _req$query$fromTime === void 0 ? Date.now() : _req$query$fromTime, _req$query$toTime = _req$query.toTime, toTime = _req$query$toTime === void 0 ? Date.now() : _req$query$toTime, _req$query$maxPeople = _req$query.maxPeople, maxPeople = _req$query$maxPeople === void 0 ? Infinity : _req$query$maxPeople, latitude = _req$query.latitude, longitude = _req$query.longitude, sessionId = _req$query.sessionId;_context.prev = 1;_context.next = 4;return (


              _services_cable_services__WEBPACK_IMPORTED_MODULE_0__["default"].generateNewCable({
                fromTime: fromTime,
                toTime: toTime,
                maxPeople: maxPeople }));case 4:cable = _context.sent;

            console.log(cable);_context.next = 8;return (
              _services_pool_services__WEBPACK_IMPORTED_MODULE_1__["default"].addNewUser({
                cableId: cable._id,
                latitude: latitude,
                longitude: longitude,
                sessionId: sessionId }));case 8:poolEntry = _context.sent;if (!

            poolEntry) {_context.next = 13;break;}_context.next = 12;return (
              _services_cable_services__WEBPACK_IMPORTED_MODULE_0__["default"].incrementPoolSize({ cable: cable }));case 12:cable = _context.sent;case 13:return _context.abrupt("return",

            res.
            status(200).
            json({ status: 200, data: cable, message: 'Cable created succesfully' }));case 16:_context.prev = 16;_context.t0 = _context["catch"](1);return _context.abrupt("return",

            res.status(400).json({ status: 400, message: _context.t0.message }));case 19:case "end":return _context.stop();}}}, _callee, null, [[1, 16]]);}));return function newCable(_x, _x2, _x3) {return _ref.apply(this, arguments);};}();



var updateCable = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {var _req$params, cableId, _req$params$fromTime, fromTime, _req$params$toTime, toTime, _req$params$maxPeople, maxPeople, cable;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_req$params =
            req.params, cableId = _req$params.cableId, _req$params$fromTime = _req$params.fromTime, fromTime = _req$params$fromTime === void 0 ? Date.now : _req$params$fromTime, _req$params$toTime = _req$params.toTime, toTime = _req$params$toTime === void 0 ? Date.now : _req$params$toTime, _req$params$maxPeople = _req$params.maxPeople, maxPeople = _req$params$maxPeople === void 0 ? Infinity : _req$params$maxPeople;_context2.prev = 1;_context2.next = 4;return (


              _services_cable_services__WEBPACK_IMPORTED_MODULE_0__["default"].updateCable({
                cableId: cableId,
                fromTime: fromTime,
                toTime: toTime,
                maxPeople: maxPeople }));case 4:cable = _context2.sent;return _context2.abrupt("return",

            res.
            status(200).
            json({ status: 200, data: cable, message: 'Cable updated succesfully' }));case 8:_context2.prev = 8;_context2.t0 = _context2["catch"](1);return _context2.abrupt("return",

            res.status(400).json({ status: 400, message: _context2.t0.message }));case 11:case "end":return _context2.stop();}}}, _callee2, null, [[1, 8]]);}));return function updateCable(_x4, _x5, _x6) {return _ref2.apply(this, arguments);};}();



var CableController = {
  newCable: newCable,
  updateCable: updateCable };


/* harmony default export */ __webpack_exports__["default"] = (CableController);

/***/ }),

/***/ "./src/controllers/pool.controller.js":
/*!********************************************!*\
  !*** ./src/controllers/pool.controller.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var PoolController = {
  newPool: function newPool() {
    console.log('new pool');
  },
  updatePool: function updatePool() {
    console.log('update pool');
  } };


/* harmony default export */ __webpack_exports__["default"] = (PoolController);

/***/ }),

/***/ "./src/db/models/cable.model.js":
/*!**************************************!*\
  !*** ./src/db/models/cable.model.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_cable_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schemas/cable.schema */ "./src/db/schemas/cable.schema.js");

var

model = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model;
var Cable = model('Cable', _schemas_cable_schema__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Cable);

/***/ }),

/***/ "./src/db/models/pool.model.js":
/*!*************************************!*\
  !*** ./src/db/models/pool.model.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schemas_pool_schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schemas/pool.schema */ "./src/db/schemas/pool.schema.js");

var

model = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model;
var Pool = model('Pool', _schemas_pool_schema__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Pool);

/***/ }),

/***/ "./src/db/schemas/cable.schema.js":
/*!****************************************!*\
  !*** ./src/db/schemas/cable.schema.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shortid */ "shortid");
/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_1__);

var

Schema = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema;

var CableSchema = new Schema(
{
  _id: {
    type: String,
    "default": shortid__WEBPACK_IMPORTED_MODULE_1___default.a.generate },

  fromTime: {
    type: Date,
    "default": Date.now() },

  toTime: {
    type: Date,
    "default": Date.now() },

  maxPoolSize: {
    type: Number,
    "default": Infinity },

  currPoolSize: {
    type: Number,
    "default": 0 },

  centroidLatitude: {
    type: Number },

  centroidLongitude: {
    type: Number } },


{
  timestamps: true });



/* harmony default export */ __webpack_exports__["default"] = (CableSchema);

/***/ }),

/***/ "./src/db/schemas/pool.schema.js":
/*!***************************************!*\
  !*** ./src/db/schemas/pool.schema.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ "mongoose");
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);

var

Schema = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Schema;

var PoolSchema = new Schema(
{
  cableId: {
    type: String,
    ref: 'Cable',
    index: true },

  sessionId: {
    type: String,
    required: true },

  longitude: {
    type: mongodb__WEBPACK_IMPORTED_MODULE_1__["Decimal128"],
    required: true },

  latitude: {
    type: mongodb__WEBPACK_IMPORTED_MODULE_1__["Decimal128"],
    required: true } },


{
  timestamps: true });



/* harmony default export */ __webpack_exports__["default"] = (PoolSchema);

/***/ }),

/***/ "./src/routes/cable.routes.js":
/*!************************************!*\
  !*** ./src/routes/cable.routes.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_cable_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/cable.controller */ "./src/controllers/cable.controller.js");



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();

router.post('/new', _controllers_cable_controller__WEBPACK_IMPORTED_MODULE_1__["default"].newCable);
router.post('/update', _controllers_cable_controller__WEBPACK_IMPORTED_MODULE_1__["default"].updateCable);

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/routes/index.js":
/*!*****************************!*\
  !*** ./src/routes/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);


var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Express is working' });
});

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/routes/pool.routes.js":
/*!***********************************!*\
  !*** ./src/routes/pool.routes.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_pool_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/pool.controller */ "./src/controllers/pool.controller.js");



var router = Object(express__WEBPACK_IMPORTED_MODULE_0__["Router"])();

router.get('/new', _controllers_pool_controller__WEBPACK_IMPORTED_MODULE_1__["default"].newPool);
router.get('/update', _controllers_pool_controller__WEBPACK_IMPORTED_MODULE_1__["default"].updatePool);

/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./src/services/cable.services.js":
/*!****************************************!*\
  !*** ./src/services/cable.services.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _db_models_cable_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models/cable.model */ "./src/db/models/cable.model.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

// TODO: create transaction here
var generateNewCable = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {var fromTime, toTime, maxPoolSize, newCable;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            fromTime = params.fromTime, toTime = params.toTime, maxPoolSize = params.maxPoolSize;_context.prev = 1;_context.next = 4;return (


              Object(_db_models_cable_model__WEBPACK_IMPORTED_MODULE_0__["default"])({ fromTime: fromTime, toTime: toTime, maxPoolSize: maxPoolSize }));case 4:newCable = _context.sent;
            newCable.save();return _context.abrupt("return",
            newCable);case 9:_context.prev = 9;_context.t0 = _context["catch"](1);

            // Log Errors
            console.error(_context.t0);case 12:case "end":return _context.stop();}}}, _callee, null, [[1, 9]]);}));return function generateNewCable(_x) {return _ref.apply(this, arguments);};}();



var updateCable = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {var cableId, fromTime, toTime, maxPoolSize, cable;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            cableId = params.cableId, fromTime = params.fromTime, toTime = params.toTime, maxPoolSize = params.maxPoolSize;_context2.prev = 1;_context2.next = 4;return (


              _db_models_cable_model__WEBPACK_IMPORTED_MODULE_0__["default"].findById(cableId, 'maxPoolSize fromTime toTime'));case 4:cable = _context2.sent;
            cable.maxPoolSize = maxPoolSize || cable.maxPoolSize;
            cable.fromTime = fromTime || cable.fromTime;
            cable.toTime = toTime || cable.toTime;

            cable.save();return _context2.abrupt("return",
            cable);case 12:_context2.prev = 12;_context2.t0 = _context2["catch"](1);

            console.error(_context2.t0);case 15:case "end":return _context2.stop();}}}, _callee2, null, [[1, 12]]);}));return function updateCable(_x2) {return _ref2.apply(this, arguments);};}();



var incrementPoolSize = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {var cable;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            cable = params.cable;_context3.prev = 1;if (!(

            cable.currPoolSize === cable.maxPoolSize)) {_context3.next = 6;break;}
            console.error('Max Pool Size reached');_context3.next = 9;break;case 6:

            cable.currPoolSize += 1;
            cable.save();return _context3.abrupt("return",
            cable);case 9:_context3.next = 14;break;case 11:_context3.prev = 11;_context3.t0 = _context3["catch"](1);


            console.error(_context3.t0);case 14:case "end":return _context3.stop();}}}, _callee3, null, [[1, 11]]);}));return function incrementPoolSize(_x3) {return _ref3.apply(this, arguments);};}();



var CableService = {
  generateNewCable: generateNewCable,
  updateCable: updateCable,
  incrementPoolSize: incrementPoolSize };


/* harmony default export */ __webpack_exports__["default"] = (CableService);

/***/ }),

/***/ "./src/services/pool.services.js":
/*!***************************************!*\
  !*** ./src/services/pool.services.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _db_models_pool_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/models/pool.model */ "./src/db/models/pool.model.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

// TODO: create transaction here

var addNewUser = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {var cableId, latitude, longitude, sessionId, poolUser;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            cableId = params.cableId, latitude = params.latitude, longitude = params.longitude, sessionId = params.sessionId;_context.prev = 1;_context.next = 4;return (

              Object(_db_models_pool_model__WEBPACK_IMPORTED_MODULE_0__["default"])({
                cableId: cableId,
                sessionId: sessionId,
                latitude: latitude,
                longitude: longitude }));case 4:poolUser = _context.sent;

            poolUser.save();return _context.abrupt("return",
            poolUser);case 9:_context.prev = 9;_context.t0 = _context["catch"](1);

            // Log Errors
            console.error(_context.t0);case 12:case "end":return _context.stop();}}}, _callee, null, [[1, 9]]);}));return function addNewUser(_x) {return _ref.apply(this, arguments);};}();



var PoolService = {
  addNewUser: addNewUser };


/* harmony default export */ __webpack_exports__["default"] = (PoolService);

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "core-js/stable":
/*!*********************************!*\
  !*** external "core-js/stable" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("core-js/stable");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "regenerator-runtime/runtime":
/*!**********************************************!*\
  !*** external "regenerator-runtime/runtime" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime/runtime");

/***/ }),

/***/ "shortid":
/*!**************************!*\
  !*** external "shortid" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("shortid");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluL3d3dy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvY2FibGUuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlcnMvcG9vbC5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9kYi9tb2RlbHMvY2FibGUubW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RiL21vZGVscy9wb29sLm1vZGVsLmpzIiwid2VicGFjazovLy8uL3NyYy9kYi9zY2hlbWFzL2NhYmxlLnNjaGVtYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGIvc2NoZW1hcy9wb29sLnNjaGVtYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2NhYmxlLnJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvcG9vbC5yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZpY2VzL2NhYmxlLnNlcnZpY2VzLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9wb29sLnNlcnZpY2VzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JlLWpzL3N0YWJsZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZG90ZW52XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb2RiXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibW9uZ29vc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb3JnYW5cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzaG9ydGlkXCIiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmluL3d3dy5qc1wiKTtcbiIsImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGNvb2tpZVBhcnNlciBmcm9tICdjb29raWUtcGFyc2VyJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnbW9yZ2FuJztcbmltcG9ydCBpbmRleFJvdXRlciBmcm9tICcuL3JvdXRlcy9pbmRleCc7XG5pbXBvcnQgY2FibGVSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvY2FibGUucm91dGVzJztcbmltcG9ydCBwb29sUm91dGVyIGZyb20gJy4vcm91dGVzL3Bvb2wucm91dGVzJztcbi8vIGltcG9ydCBwbGFjZXNSb3V0ZXIgZnJvbSAnLi9yb3V0ZXMvcGxhY2VzLnJvdXRlcyc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuYXBwLnVzZShsb2dnZXIoJ2RldicpKTtcbmFwcC51c2UoZXhwcmVzcy5qc29uKCkpO1xuYXBwLnVzZShleHByZXNzLnVybGVuY29kZWQoeyBleHRlbmRlZDogZmFsc2UgfSkpO1xuYXBwLnVzZShjb29raWVQYXJzZXIoKSk7XG5cbmFwcC51c2UoJy8nLCBpbmRleFJvdXRlcik7XG5hcHAudXNlKCcvY2FibGUnLCBjYWJsZVJvdXRlcik7XG5hcHAudXNlKCcvcG9vbCcsIHBvb2xSb3V0ZXIpO1xuLy8gYXBwLnVzZSgnL3BsYWNlcycsIHBsYWNlc1JvdXRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcblxuZG90ZW52LmNvbmZpZyh7IHNpbGVudDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyB9KTtcbiIsImltcG9ydCAnLi9jb25maWcnO1xuaW1wb3J0ICdjb3JlLWpzL3N0YWJsZSc7XG5pbXBvcnQgJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZSc7XG5cbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IGFwcCBmcm9tICcuLi9hcHAnO1xuXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2JlYW5mZWFzdDpzZXJ2ZXInKTtcblxuY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMDtcbmFwcC5zZXQoJ3BvcnQnLCBwb3J0KTtcblxuZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xuXHRpZiAoZXJyb3Iuc3lzY2FsbCAhPT0gJ2xpc3RlbicpIHtcblx0XHR0aHJvdyBlcnJvcjtcblx0fVxuXG5cdGNvbnN0IGJpbmQgPSB0eXBlb2YgcG9ydCA9PT0gJ3N0cmluZycgPyBgUGlwZSAke3BvcnR9YCA6IGBQb3J0ICR7cG9ydH1gO1xuXG5cdC8vIGhhbmRsZSBzcGVjaWZpYyBsaXN0ZW4gZXJyb3JzIHdpdGggZnJpZW5kbHkgbWVzc2FnZXNcblx0c3dpdGNoIChlcnJvci5jb2RlKSB7XG5cdFx0Y2FzZSAnRUFDQ0VTJzpcblx0XHRcdGNvbnNvbGUuZXJyb3IoYCR7YmluZH0gcmVxdWlyZXMgZWxldmF0ZWQgcHJpdmlsZWdlc2ApO1xuXHRcdFx0cHJvY2Vzcy5leGl0KDEpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnRUFERFJJTlVTRSc6XG5cdFx0XHRjb25zb2xlLmVycm9yKGAke2JpbmR9IGlzIGFscmVhZHkgaW4gdXNlYCk7XG5cdFx0XHRwcm9jZXNzLmV4aXQoMSk7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgZXJyb3I7XG5cdH1cbn1cblxuY29uc3Qgc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoYXBwKTtcblxuZnVuY3Rpb24gb25MaXN0ZW5pbmcoKSB7XG5cdGNvbnN0IGFkZHIgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuXHRjb25zdCBiaW5kID0gdHlwZW9mIGFkZHIgPT09ICdzdHJpbmcnID8gYHBpcGUgJHthZGRyfWAgOiBgcG9ydCAke2FkZHIucG9ydH1gO1xuXHRkZWJ1ZyhgTGlzdGVuaW5nIG9uICR7YmluZH1gKTtcbn1cblxuc2VydmVyLmxpc3Rlbihwb3J0KTtcbnNlcnZlci5vbignZXJyb3InLCBvbkVycm9yKTtcbnNlcnZlci5vbignbGlzdGVuaW5nJywgb25MaXN0ZW5pbmcpO1xuIiwiaW1wb3J0IENhYmxlU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9jYWJsZS5zZXJ2aWNlcyc7XG5pbXBvcnQgUG9vbFNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvcG9vbC5zZXJ2aWNlcyc7XG5cbmNvbnN0IG5ld0NhYmxlID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdGNvbnN0IHtcblx0XHRmcm9tVGltZSA9IERhdGUubm93KCksXG5cdFx0dG9UaW1lID0gRGF0ZS5ub3coKSxcblx0XHRtYXhQZW9wbGUgPSBJbmZpbml0eSxcblx0XHRsYXRpdHVkZSxcblx0XHRsb25naXR1ZGUsXG5cdFx0c2Vzc2lvbklkLFxuXHR9ID0gcmVxLnF1ZXJ5O1xuXG5cdHRyeSB7XG5cdFx0bGV0IGNhYmxlID0gYXdhaXQgQ2FibGVTZXJ2aWNlLmdlbmVyYXRlTmV3Q2FibGUoe1xuXHRcdFx0ZnJvbVRpbWUsXG5cdFx0XHR0b1RpbWUsXG5cdFx0XHRtYXhQZW9wbGUsXG5cdFx0fSk7XG5cdFx0Y29uc29sZS5sb2coY2FibGUpO1xuXHRcdGNvbnN0IHBvb2xFbnRyeSA9IGF3YWl0IFBvb2xTZXJ2aWNlLmFkZE5ld1VzZXIoe1xuXHRcdFx0Y2FibGVJZDogY2FibGUuX2lkLFxuXHRcdFx0bGF0aXR1ZGUsXG5cdFx0XHRsb25naXR1ZGUsXG5cdFx0XHRzZXNzaW9uSWQsXG5cdFx0fSk7XG5cdFx0aWYgKHBvb2xFbnRyeSkge1xuXHRcdFx0Y2FibGUgPSBhd2FpdCBDYWJsZVNlcnZpY2UuaW5jcmVtZW50UG9vbFNpemUoeyBjYWJsZSB9KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc1xuXHRcdFx0LnN0YXR1cygyMDApXG5cdFx0XHQuanNvbih7IHN0YXR1czogMjAwLCBkYXRhOiBjYWJsZSwgbWVzc2FnZTogJ0NhYmxlIGNyZWF0ZWQgc3VjY2VzZnVsbHknIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgc3RhdHVzOiA0MDAsIG1lc3NhZ2U6IGUubWVzc2FnZSB9KTtcblx0fVxufTtcblxuY29uc3QgdXBkYXRlQ2FibGUgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcblx0Y29uc3QgeyBjYWJsZUlkLCBmcm9tVGltZSA9IERhdGUubm93LCB0b1RpbWUgPSBEYXRlLm5vdywgbWF4UGVvcGxlID0gSW5maW5pdHkgfSA9IHJlcS5wYXJhbXM7XG5cblx0dHJ5IHtcblx0XHRjb25zdCBjYWJsZSA9IGF3YWl0IENhYmxlU2VydmljZS51cGRhdGVDYWJsZSh7XG5cdFx0XHRjYWJsZUlkLFxuXHRcdFx0ZnJvbVRpbWUsXG5cdFx0XHR0b1RpbWUsXG5cdFx0XHRtYXhQZW9wbGUsXG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc1xuXHRcdFx0LnN0YXR1cygyMDApXG5cdFx0XHQuanNvbih7IHN0YXR1czogMjAwLCBkYXRhOiBjYWJsZSwgbWVzc2FnZTogJ0NhYmxlIHVwZGF0ZWQgc3VjY2VzZnVsbHknIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgc3RhdHVzOiA0MDAsIG1lc3NhZ2U6IGUubWVzc2FnZSB9KTtcblx0fVxufTtcblxuY29uc3QgQ2FibGVDb250cm9sbGVyID0ge1xuXHRuZXdDYWJsZSxcblx0dXBkYXRlQ2FibGUsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDYWJsZUNvbnRyb2xsZXI7XG4iLCJjb25zdCBQb29sQ29udHJvbGxlciA9IHtcblx0bmV3UG9vbDogKCkgPT4ge1xuXHRcdGNvbnNvbGUubG9nKCduZXcgcG9vbCcpO1xuXHR9LFxuXHR1cGRhdGVQb29sOiAoKSA9PiB7XG5cdFx0Y29uc29sZS5sb2coJ3VwZGF0ZSBwb29sJyk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb29sQ29udHJvbGxlcjtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgQ2FibGVTY2hlbWEgZnJvbSAnLi4vc2NoZW1hcy9jYWJsZS5zY2hlbWEnO1xuXG5jb25zdCB7IG1vZGVsIH0gPSBtb25nb29zZTtcbmNvbnN0IENhYmxlID0gbW9kZWwoJ0NhYmxlJywgQ2FibGVTY2hlbWEpO1xuXG5leHBvcnQgZGVmYXVsdCBDYWJsZTtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgUG9vbFNjaGVtYSBmcm9tICcuLi9zY2hlbWFzL3Bvb2wuc2NoZW1hJztcblxuY29uc3QgeyBtb2RlbCB9ID0gbW9uZ29vc2U7XG5jb25zdCBQb29sID0gbW9kZWwoJ1Bvb2wnLCBQb29sU2NoZW1hKTtcblxuZXhwb3J0IGRlZmF1bHQgUG9vbDtcbiIsImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJztcblxuY29uc3QgeyBTY2hlbWEgfSA9IG1vbmdvb3NlO1xuXG5jb25zdCBDYWJsZVNjaGVtYSA9IG5ldyBTY2hlbWEoXG5cdHtcblx0XHRfaWQ6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdGRlZmF1bHQ6IHNob3J0aWQuZ2VuZXJhdGUsXG5cdFx0fSxcblx0XHRmcm9tVGltZToge1xuXHRcdFx0dHlwZTogRGF0ZSxcblx0XHRcdGRlZmF1bHQ6IERhdGUubm93KCksXG5cdFx0fSxcblx0XHR0b1RpbWU6IHtcblx0XHRcdHR5cGU6IERhdGUsXG5cdFx0XHRkZWZhdWx0OiBEYXRlLm5vdygpLFxuXHRcdH0sXG5cdFx0bWF4UG9vbFNpemU6IHtcblx0XHRcdHR5cGU6IE51bWJlcixcblx0XHRcdGRlZmF1bHQ6IEluZmluaXR5LFxuXHRcdH0sXG5cdFx0Y3VyclBvb2xTaXplOiB7XG5cdFx0XHR0eXBlOiBOdW1iZXIsXG5cdFx0XHRkZWZhdWx0OiAwLFxuXHRcdH0sXG5cdFx0Y2VudHJvaWRMYXRpdHVkZToge1xuXHRcdFx0dHlwZTogTnVtYmVyLFxuXHRcdH0sXG5cdFx0Y2VudHJvaWRMb25naXR1ZGU6IHtcblx0XHRcdHR5cGU6IE51bWJlcixcblx0XHR9LFxuXHR9LFxuXHR7XG5cdFx0dGltZXN0YW1wczogdHJ1ZSxcblx0fVxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FibGVTY2hlbWE7XG4iLCJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgRGVjaW1hbDEyOCB9IGZyb20gJ21vbmdvZGInO1xuXG5jb25zdCB7IFNjaGVtYSB9ID0gbW9uZ29vc2U7XG5cbmNvbnN0IFBvb2xTY2hlbWEgPSBuZXcgU2NoZW1hKFxuXHR7XG5cdFx0Y2FibGVJZDoge1xuXHRcdFx0dHlwZTogU3RyaW5nLFxuXHRcdFx0cmVmOiAnQ2FibGUnLFxuXHRcdFx0aW5kZXg6IHRydWUsXG5cdFx0fSxcblx0XHRzZXNzaW9uSWQ6IHtcblx0XHRcdHR5cGU6IFN0cmluZyxcblx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdH0sXG5cdFx0bG9uZ2l0dWRlOiB7XG5cdFx0XHR0eXBlOiBEZWNpbWFsMTI4LFxuXHRcdFx0cmVxdWlyZWQ6IHRydWUsXG5cdFx0fSxcblx0XHRsYXRpdHVkZToge1xuXHRcdFx0dHlwZTogRGVjaW1hbDEyOCxcblx0XHRcdHJlcXVpcmVkOiB0cnVlLFxuXHRcdH0sXG5cdH0sXG5cdHtcblx0XHR0aW1lc3RhbXBzOiB0cnVlLFxuXHR9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBQb29sU2NoZW1hO1xuIiwiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgQ2FibGVDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2NhYmxlLmNvbnRyb2xsZXInO1xuXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoJy9uZXcnLCBDYWJsZUNvbnRyb2xsZXIubmV3Q2FibGUpO1xucm91dGVyLnBvc3QoJy91cGRhdGUnLCBDYWJsZUNvbnRyb2xsZXIudXBkYXRlQ2FibGUpO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iLCJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cbi8qIEdFVCBob21lIHBhZ2UuICovXG5yb3V0ZXIuZ2V0KCcvJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG5cdHJlcy5qc29uKHsgdGl0bGU6ICdFeHByZXNzIGlzIHdvcmtpbmcnIH0pO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IFBvb2xDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL3Bvb2wuY29udHJvbGxlcic7XG5cbmNvbnN0IHJvdXRlciA9IFJvdXRlcigpO1xuXG5yb3V0ZXIuZ2V0KCcvbmV3JywgUG9vbENvbnRyb2xsZXIubmV3UG9vbCk7XG5yb3V0ZXIuZ2V0KCcvdXBkYXRlJywgUG9vbENvbnRyb2xsZXIudXBkYXRlUG9vbCk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiIsImltcG9ydCBDYWJsZSBmcm9tICcuLi9kYi9tb2RlbHMvY2FibGUubW9kZWwnO1xuXG4vLyBUT0RPOiBjcmVhdGUgdHJhbnNhY3Rpb24gaGVyZVxuY29uc3QgZ2VuZXJhdGVOZXdDYWJsZSA9IGFzeW5jIChwYXJhbXMsIC4uLnJlc3QpID0+IHtcblx0Y29uc3QgeyBmcm9tVGltZSwgdG9UaW1lLCBtYXhQb29sU2l6ZSB9ID0gcGFyYW1zO1xuXG5cdHRyeSB7XG5cdFx0Y29uc3QgbmV3Q2FibGUgPSBhd2FpdCBDYWJsZSh7IGZyb21UaW1lLCB0b1RpbWUsIG1heFBvb2xTaXplIH0pO1xuXHRcdG5ld0NhYmxlLnNhdmUoKTtcblx0XHRyZXR1cm4gbmV3Q2FibGU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBMb2cgRXJyb3JzXG5cdFx0Y29uc29sZS5lcnJvcihlKTtcblx0fVxufTtcblxuY29uc3QgdXBkYXRlQ2FibGUgPSBhc3luYyAocGFyYW1zLCAuLi5yZXN0KSA9PiB7XG5cdGNvbnN0IHsgY2FibGVJZCwgZnJvbVRpbWUsIHRvVGltZSwgbWF4UG9vbFNpemUgfSA9IHBhcmFtcztcblxuXHR0cnkge1xuXHRcdGNvbnN0IGNhYmxlID0gYXdhaXQgQ2FibGUuZmluZEJ5SWQoY2FibGVJZCwgJ21heFBvb2xTaXplIGZyb21UaW1lIHRvVGltZScpO1xuXHRcdGNhYmxlLm1heFBvb2xTaXplID0gbWF4UG9vbFNpemUgfHwgY2FibGUubWF4UG9vbFNpemU7XG5cdFx0Y2FibGUuZnJvbVRpbWUgPSBmcm9tVGltZSB8fCBjYWJsZS5mcm9tVGltZTtcblx0XHRjYWJsZS50b1RpbWUgPSB0b1RpbWUgfHwgY2FibGUudG9UaW1lO1xuXG5cdFx0Y2FibGUuc2F2ZSgpO1xuXHRcdHJldHVybiBjYWJsZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGNvbnNvbGUuZXJyb3IoZSk7XG5cdH1cbn07XG5cbmNvbnN0IGluY3JlbWVudFBvb2xTaXplID0gYXN5bmMgKHBhcmFtcywgLi4ucmVzdCkgPT4ge1xuXHRjb25zdCB7IGNhYmxlIH0gPSBwYXJhbXM7XG5cdHRyeSB7XG5cdFx0aWYgKGNhYmxlLmN1cnJQb29sU2l6ZSA9PT0gY2FibGUubWF4UG9vbFNpemUpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ01heCBQb29sIFNpemUgcmVhY2hlZCcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjYWJsZS5jdXJyUG9vbFNpemUgKz0gMTtcblx0XHRcdGNhYmxlLnNhdmUoKTtcblx0XHRcdHJldHVybiBjYWJsZTtcblx0XHR9XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHR9XG59O1xuXG5jb25zdCBDYWJsZVNlcnZpY2UgPSB7XG5cdGdlbmVyYXRlTmV3Q2FibGUsXG5cdHVwZGF0ZUNhYmxlLFxuXHRpbmNyZW1lbnRQb29sU2l6ZSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhYmxlU2VydmljZTtcbiIsImltcG9ydCBQb29sIGZyb20gJy4uL2RiL21vZGVscy9wb29sLm1vZGVsJztcblxuLy8gVE9ETzogY3JlYXRlIHRyYW5zYWN0aW9uIGhlcmVcblxuY29uc3QgYWRkTmV3VXNlciA9IGFzeW5jIChwYXJhbXMsIC4uLnJlc3QpID0+IHtcblx0Y29uc3QgeyBjYWJsZUlkLCBsYXRpdHVkZSwgbG9uZ2l0dWRlLCBzZXNzaW9uSWQgfSA9IHBhcmFtcztcblx0dHJ5IHtcblx0XHRjb25zdCBwb29sVXNlciA9IGF3YWl0IFBvb2woe1xuXHRcdFx0Y2FibGVJZCxcblx0XHRcdHNlc3Npb25JZCxcblx0XHRcdGxhdGl0dWRlLFxuXHRcdFx0bG9uZ2l0dWRlLFxuXHRcdH0pO1xuXHRcdHBvb2xVc2VyLnNhdmUoKTtcblx0XHRyZXR1cm4gcG9vbFVzZXI7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBMb2cgRXJyb3JzXG5cdFx0Y29uc29sZS5lcnJvcihlKTtcblx0fVxufTtcblxuY29uc3QgUG9vbFNlcnZpY2UgPSB7XG5cdGFkZE5ld1VzZXIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb29sU2VydmljZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yZS1qcy9zdGFibGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb2RiXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2hvcnRpZFwiKTsiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwQkE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzVDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNURBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1RBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOUJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNSQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1JBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JEQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6QkE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==