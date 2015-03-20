var http = require('http');
var url = require('url');
var port = (process.env.PORT || 8092);

var server = http.createServer(function(req,res){
  var urlObj = url.parse(req.url,true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;
  
  //try to match id in pathname ex. http://salesforce15to18.herokuapp.com/a0p300000082PED
  if(pathname){
    var m = pathname.match(/^\/([A-Za-z0-9]{15})$/);
    if(m){
      res.end(convert(m[1]));
      return;
    }
  }

  if(!query) return bad(res);

  //try to get id from querystring
  var id = query.id;
  if(!id || id.length != 15) return bad(res);
  
  res.end(convert(id));
});
server.listen(port);
console.log('listening on '+port);

var bad = function(res){
  res.writeHead(402, {'Content-Type': 'text/plain'});
  res.end('must provide beer to programmers');
}

var convert = function(id){
  var str = [0,0,0];
  for(var i = 0; i < id.length; i++){
    var c = id.charCodeAt(i);
    str[parseInt(i/5)]+=((c >= 65 && c <=90)? 1 : 0)*Math.pow(2,parseInt(i%5));

  }
  var caseCode = '';
  for(var c in str){
    caseCode+=String.fromCharCode(str[c]<25 ? 65 + str[c]:22+str[c]);
  }
  
  return id+caseCode;
}