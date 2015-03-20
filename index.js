var http = require('http');
var url = require('url');
var port = (process.env.PORT || 8092);

var server = http.createServer(function(req,res){
  var query = url.parse(req.url,true).query;

  console.log(query);
  
  if(!query) return bad(res);
  
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
    str[parseInt(i/5)]+=((c >= 65 && c <=90)? 1 : 0)*Math.pow(2,parseInt(i/5));

  }
  var caseCode = '';
  for(var c in str){
    caseCode+=String.fromCharCode(str[c]<25 ? 65 + str[c]:22+str[c]);
  }
  
  return id+caseCode;
}