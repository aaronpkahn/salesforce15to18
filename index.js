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
  var j=0,i=0;
  var caseCode = '';
  
  for(j;j<3;j++){
    var f = 0;
    for(var i = 0; i < 5; i++){
      var c = id.charCodeAt(j*5+i);
      if(c >= 65 && c <=90){
        f += 1 << i;
      }
    }
    caseCode+=String.fromCharCode(f+(f<26?65:22));
  }
  
  return id+caseCode;
}