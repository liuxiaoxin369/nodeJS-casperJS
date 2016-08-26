// Generated by CoffeeScript 1.10.0
(function(window, debug) {

  var _XMLHttpRequest, args, methods, otherscalars;
  _XMLHttpRequest = window.XMLHttpRequest;
  args = function(a) {
    var i, s;
    s = '';
    i = 0;
    while (i < a.length) {
      s += '\u0009\n[' + i + '] => ' + a[i];
      i++;
    }
    return s;
  };
  window.XMLHttpRequest = function() {
    this.xhr = new _XMLHttpRequest;
  };
  methods = ['open', 'abort', 'setRequestHeader', 'send', 'addEventListener', 'removeEventListener', 'getResponseHeader', 'getAllResponseHeaders', 'dispatchEvent', 'overrideMimeType'];
  methods.forEach(function(method) {
    window.XMLHttpRequest.prototype[method] = function() {
      var _arguments, result;
      _arguments = arguments;
      if (method === 'send' && window.myAwesomeArgsHack) {
        _arguments = window.myAwesomeArgsHack(this._url, method, _arguments);
      }
      if (method === 'send' && _CAjax.isWatch(this._url)) {
        console.log('你来进行网路欧请求' + _arguments);
        _CAjax.setWatchValue(this._url, _arguments, 'request');
      }
      if (method === 'open') {
        this._url = _arguments[1];
      }
      result = this.xhr[method].apply(this.xhr, _arguments);
      if (debug) {
        console.log('ARGUMENTS:', method, args(arguments));
      }
      if (method === 'getAllResponseHeaders' && _CAjax.isWatch(this._url) && this.xhr.responseText) {
        console.log('你来进行网路欧请求' + this.xhr.responseText);
        _CAjax.setWatchValue(this._url, this.xhr.responseText, 'response');
        if (debug) {
          console.log('RESPONSE RECEIVED:', this._url, method, this.xhr.responseText);
        }
      }
      return result;
    };
  });
  Object.defineProperty(window.XMLHttpRequest.prototype, 'onreadystatechange', {
    get: function() {
      console.log('xhr:' + this.xhr.onreadystatechange);
      return this.xhr.onreadystatechange;
    },
    set: function(onreadystatechange) {
      var realThis, that;
      that = this.xhr;
      realThis = this;
      that.onreadystatechange = function() {
        if (that.readyState === 4) {

        } else {

        }
        onreadystatechange.call(that);
      };
    }
  });
  otherscalars = ['onabort', 'onerror', 'onload', 'onloadstart', 'onloadend', 'onprogress', 'readyState', 'responseText', 'responseType', 'responseXML', 'status', 'statusText', 'upload', 'withCredentials', 'DONE', 'UNSENT', 'HEADERS_RECEIVED', 'LOADING', 'OPENED'];
  otherscalars.forEach(function(scalar) {
    Object.defineProperty(window.XMLHttpRequest.prototype, scalar, {
      get: function() {
        return this.xhr[scalar];
      },
      set: function(obj) {
        this.xhr[scalar] = obj;
      }
    });
  });
})(window, false);

(function(window, debug) {
  var _jQueryAjax;
  _jQueryAjax = jQuery.ajax;
  return jQuery.ajax = function(option) {
    if (window.myJqueryAjaxHack) {
      option = window.myJqueryAjaxHack(option);
    }
    if (debug) {
      console.log('jQuery option:', JSON.stringify(option));
    }
    return _jQueryAjax(option);
  };
})(window, false);

//# sourceMappingURL=C_HttpRequest.js.map
