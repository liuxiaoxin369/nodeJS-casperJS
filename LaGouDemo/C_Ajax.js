// Generated by CoffeeScript 1.10.0
var _CAjax;

_CAjax = function() {};

_CAjax.watch = [];

_CAjax.requestValue = {};

_CAjax.responseValue = {};

_CAjax.onSetWatchValue = function(key, type, val) {
  return true;
};

_CAjax.addWatch = function(key) {
  _CAjax.watch.push(key.toLowerCase());
};

_CAjax.getWatchKey = function(url) {
  var i;
  i = 0;
  while (i < _CAjax.watch.length) {
    if (url.toLowerCase().indexOf(_CAjax.watch[i]) >= 0) {
      return _CAjax.watch[i];
    }
    i++;
  }
  return '';
};

_CAjax.isWatch = function(url) {
  return _CAjax.getWatchKey(url) !== '';
};

_CAjax.setWatchValue = function(url, val, type) {
  var key;
  console.log('结果是-------:' + JSON.stringify(val));
  key = _CAjax.getWatchKey(url);
  if (!key) {
    return;
  }
  type = typeof type === 'undefined' ? 'response' : type;
  if (_CAjax.onSetWatchValue && !_CAjax.onSetWatchValue(key, type, val)) {
    return;
  }
  switch (type) {
    case 'request':
      _CAjax.requestValue[key.toLowerCase()] = val;
      if (localStorage) {
        localStorage['_CAjax.requestValue_' + key.toLowerCase()] = val ? JSON.stringify(val) : '';
      }
      break;
    default:
      _CAjax.responseValue[key.toLowerCase()] = val;
      if (localStorage) {
        localStorage['_CAjax.responseValue_' + key.toLowerCase()] = val ? JSON.stringify(val) : '';
      }
  }
};

_CAjax.celarWatchValue = function(key) {
  if (localStorage) {
    delete localStorage['_CAjax.responseValue_' + key.toLowerCase()];
    delete localStorage['_CAjax.requestValue_' + key.toLowerCase()];
  }
  _CAjax.responseValue[key.toLowerCase()] = null;
  return _CAjax.requestValue[key.toLowerCase()] = null;
};

_CAjax.getWatchValue = function(key) {
  var result;
  if (localStorage) {
    result = localStorage['_CAjax.responseValue_' + key.toLowerCase()];
    console.log(key.toLowerCase() + '结果是:' + result);
    if (result) {
      result = JSON.parse(result);
    }
    delete localStorage['_CAjax.responseValue_' + key.toLowerCase()];
  }
  if (result) {
    _CAjax.responseValue[key.toLowerCase()] = result;
  }
  if (!result) {
    result = _CAjax.responseValue[key.toLowerCase()];
  }
  return result;
};

_CAjax.getSendValue = function(key) {
  var result;
  if (localStorage) {
    result = localStorage['_CAjax.requestValue_' + key.toLowerCase()];
    if (result) {
      result = JSON.parse(result);
    }
    delete localStorage['_CAjax.requestValue_' + key.toLowerCase()];
  }
  if (result) {
    _CAjax.requestValue[key.toLowerCase()] = result;
  }
  if (!result) {
    result = _CAjax.requestValue[key.toLowerCase()];
  }
  return result;
};

//# sourceMappingURL=C_Ajax.js.map
