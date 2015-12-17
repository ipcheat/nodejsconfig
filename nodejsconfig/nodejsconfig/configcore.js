var fs = require('fs');

var __EmptyString = '';
var __ConfigFile = './global.json';
var isNullOrEmpty = function (v) {
    
    if (v == undefined)
        return true;
    if (v == null)
        return true;
    if (v.length == 0)
        return true;
    
    return false;

}

var Config = function (encoding) {
    
    var _encoding = encoding;
    var _regx = /[\u0000-\u001f\u007f\u0080-\u009f]/g;
    var _parseObj = function (s) {
        
        var re = null;
        if (s.length > 0) {
            try {
                s = s.replace(_regx, __EmptyString);
                re = eval("(" + s + ")");
            } catch (e) {
                console.log(re);
            };
        }
        return re;
    }
    
    var getObjFromFile = (function () {
        
        var _content = null;
        var _mtime = null;
        
        return function (p) {
            
            if (isNullOrEmpty(p))
                return null;
            
            if (_content == null) {
                
                if (!fs.existsSync(p))
                    return null;
                
                _content = _parseObj(fs.readFileSync(p, _encoding));
                _mtime = fs.statSync(p).mtime.getTime();

            }
            else {
                
                var stat = fs.statSync(p);
                if (!stat)
                    return null;
                
                if (stat.mtime.getTime() != _mtime) {
                    _content = _parseObj(fs.readFileSync(p, _encoding));
                    _mtime = stat.mtime.getTime();
                }
                                
            }
            return _content;
        }
    
    })()
    
    this.getItem = function (key) {
        
        if (isNullOrEmpty(key))
            return __EmptyString;
        
        var o = getObjFromFile(__ConfigFile);
        if (o && typeof o[key] != 'undefined') {
            return o[key];
        }        
        return __EmptyString;
    }

}

module.exports = (function () {
    
    var _config = null;
    
    return {
        
        getItem: function (key, encoding) {
            
            if (typeof key != 'string')
                return __EmptyString;
            
            if (isNullOrEmpty(encoding))
                encoding = 'utf-8';
            
            if (_config == null)
                _config = new Config(encoding);
            
            return _config.getItem(key);

        }

    }

})()