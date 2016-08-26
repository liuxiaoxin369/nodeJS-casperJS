var utils = require('utils');
var isShowLog = false;

var casper = require('casper').create({
  verbose: false, //输出日志信息
  viewportSize: {
    width: 1280,
    height: 1000
  },
  waitTimeout: 45 * 1000,
  pageSettings: {
    javascriptEnabled: true,
    loadImages: true,
    loadPlugins: false, //是否加载组件(例如:flash)
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
  }
});
var path = casper.cli.options.path;
casper.options.clientScripts = [
                                path + '/next.js',
                                path + '/C_Ajax.js',
                                path + '/C_Common.js',
                                path + '/C_HttpRequest.js',
                              ];

casper.on('error', function(msg, trace) {
  utils.dump(msg);
  utils.dump(trace);
  return reportError(msg);
});

casper.on('load.failed', function(requestUrl, status) {
  return utils.dump('load.failed:' + requestUrl + 'load.status:' + status);
});

casper.on('resource.received', function(resource) {
  if (isShowLog) {
    return utils.dump('received:' + resource.url);
  }
});

casper.on('resource.requested', function(requestData, request) {
  if (isShowLog) {
    return utils.dump('requested:' + requestData.url);
  }
});

casper.on('popup.created', function(data) {
  if (isShowLog) {
    return utils.dump(data);
  }
});

casper.on('popup.loaded', function(data) {
  if (isShowLog) {
    return utils.dump(data);
  }
});

casper.on('popup.closed', function(data) {
  if (isShowLog) {
    return utils.dump(data);
  }
});

casper.on('remote.callback', function(r) {
  if (isShowLog) {
    return utils.dump(r);
  }
});

casper.on('remote.alert', function(data) {
  utils.dump(data);
  if (data && data.indexOf('--Error--') >= 0) {
    return reportError(data, '测试');
  }
});

casper.on('remote.message', function(data) {
  return utils.dump(data);
});

casper.on('http.status.404', function(resource) {
  console.log(resource.url + ' is 404[1010]');
  return reportError('您的方案需要进一步确认，请联系客服[1010]。', '测试');
});

casper.on('http.status.500', function(resource) {
  console.log(resource.url + ' is 500[1020]');
  return reportError('您的方案需要进一步确认，请联系客服[1020]。', '测试');
});

casper.on('step.timeout', function(resource) {
  console.log('step.timeout[1030]:' + JSON.stringify(resource));
  return reportError('您的方案需要进一步确认，请联系客服[1030]。', '测试');
});

casper.on('waitFor.timeout', function(resource) {
  console.log('waitFor.timeout[1040]:' + JSON.stringify(resource));
  return reportError('您的方案需要进一步确认，请联系客服[1040]。', '测试');
});

var goStart = function() {
  console.log('前往拉钩' + path);
  casper.start('http://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&spc=1&pl=&gj=&xl=&yx=&gx=&st=&labelWords=label&lc=&workAddress=&city=%E5%85%A8%E5%9B%BD&requestId=&pn=1');
  casper.waitForUrl('http:\/\/www.lagou.com\/jobs', function() {
    console.log('已经进入拉钩' + casper.getCurrentUrl());
    casper.capture(path + '/lagou.png');
  });
  var nextThen = function() {
    console.log('你要进行这个方法吗?');
    var error;
    try {
      console.log('--c_form1_next--');
      c_form1_next();
    } catch (error1) {
      error = error1;
      console.log(error, 'c_form1_next');
    }
  };
  console.log('你要进行这个方法吗?1111');
  casper.thenEvaluate(nextThen);
  casper.then(function(){
    console.log('页面加载结束');
    casper.capture(path + '/lagou11.png');
    getData();
  });
};

var getData = function() {
  console.log('爬取数据');
  casper.waitForResource('http:\/\/www.lagou.com\/jobs\/positionAjax.json', function() {
    console.log('成功等到ajax请求');
  });
  var nextThen = function() {
    var error;
    try {
      console.log('--c_form1_getData--');
      c_form1_getData();
    } catch (error1) {
      error = error1;
      console.log(error, 'c_form1_getData');
    }
  };
  casper.then(function() {
    casper.evaluate(nextThen);
    console.log('获取数据结束');
  });
}

goStart();
casper.run();
