var Log, last, lastCounter;

last = '';

lastCounter = 0;

document.log = function() {
  var all, argument, k, len, library, log, print, prints, value;
  log = document.getElementById("log");
  if (!library) {
    library = {};
  }
  library.json = {
    replacer: function(match, pIndent, pKey, pVal, pEnd) {
      var key, r, str, val;
      key = '<span class=json-key style="color: #e65100  ;">';
      val = '<span class=json-value style="color: #01579b ;">';
      str = '<span class=json-string style="color: #4caf50 ;">';
      r = pIndent || '';
      if (pKey) {
        r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
      }
      if (pVal) {
        r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
      }
      return r + (pEnd || '');
    },
    prettyPrint: function(obj) {
      var jsonLine;
      jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
      return JSON.stringify(obj, null, 3).replace(/&/g, '&amp;').replace(/\\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(jsonLine, library.json.replacer);
    }
  };
  prints = [];
  if (!log) {
    log = document.createElement('pre');
    log.id = 'log';
    log.style.position = 'absolute';
    log.style.left = '0';
    log.style.top = '0';
    log.style.padding = '15px';
    log.style.boxShadow = '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)';
    log.style.width = window.innerWidth * .15 + 'px';
    log.style.margin = 0;
    log.style.maxHeight = window.innerHeight + 'px';
    log.style.transition = 0.3 + 's';
    log.style.backgroundColor = 'white';
    log.style.zIndex = 1500;
    log.addEventListener('mouseover', function() {
      return log.style.width = window.innerWidth * .3 + 'px';
    }, false);
    log.addEventListener('mouseout', function() {
      return log.style.width = window.innerWidth * .15 + 'px';
    }, false);
    document.body.appendChild(log);
  }
  for (k = 0, len = arguments.length; k < len; k++) {
    argument = arguments[k];
    print = argument;
    if (typeof print === 'object') {
      print = "<br>" + library.json.prettyPrint(print);
    } else if (typeof print !== 'string') {
      print = print.toString();
    }
    prints.push(print);
  }
  value = document.createElement("div");
  value.innerHTML = prints;
  if (prints.toString() === last.toString() && prints.toString() !== '') {
    lastCounter++;
    all = log.querySelectorAll("div");
    value = all[all.length - 1];
    value.innerHTML = '(' + lastCounter + ') ' + prints;
  } else {
    lastCounter = 0;
  }
  last = prints;
  if (lastCounter === 0) {
    return log.appendChild(value);
  }
};

document.clearLog = function() {
  var log;
  log = document.getElementById("log");
  if (log) {
    return log.innerHTML = '';
  }
};

Log = function() {};

Log.prototype.clear = function() {
  var log;
  log = document.getElementById("log");
  if (log) {
    return log.innerHTML = '';
  }
};

Log.prototype.write = document.log;

window.log = new Log();

Number.prototype.formatMoney = function(c, d, t) {
  var i, j, n, s;
  n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d === void 0 ? '.' : d;
  t = t === void 0 ? ' ' : t;
  s = n < 0 ? '-' : '';
  i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + '';
  j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

Number.prototype.fixedCeil = function(digits) {
  var n;
  if (digits == null) {
    digits = 1;
  }
  n = this;
  return n = (Math.ceil(n * 1000) / 1000).toFixed(digits);
};
