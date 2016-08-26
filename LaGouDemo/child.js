var commandRunner = function() {
  this.pid = '';
  this.quoteJS = '';
  this.casperjs = {};
  return this;
}

commandRunner.prototype.runCommand = function() {
  self = this;
  self.quoteJS = process.cwd() + '/lagou.js';
  var args = ['--ignore-ssl-errors=yes', '--ssl-protocol=any', self.quoteJS, '--path=' + process.cwd()];
  for (i = 0, len = args.length; i < len; i++) {
    arg = args[i];
    console.log(arg);
  }

  this.casperjs = require('child_process').spawn('casperjs', args);
  this.casperjs.stdin.setEncoding('utf8');
	this.casperjs.stdout.setEncoding('utf8');
  this.pid = this.casperjs.pid;
  console.log(this.pid + '------');

  this.casperjs.stdout.on('data', (data) => {
    console.log('stdout:' + data);
  });

  this.casperjs.stdout.on('end', (data) => {
    this.casperjs.kill();
    console.log('end:' + data);
  });

  this.casperjs.on('close', (code) => {
    console.log('child process exited with code:' + code);
  });
}

module.exports = commandRunner;
