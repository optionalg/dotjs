var dj = {};
dj.getContent = function __getContent(url, fn) {
  var E = chrome.extension;
  E.sendRequest({name: 'dj_getContent', url: url}, function(ret) {
      fn(ret);
      });
};

$.ajax({
  url: 'http://localhost:3131/'+window.location.host.replace('www.','')+'.js',
  dataType: 'text',
  success: function(d){
    $(function(){ eval(d) })
  },
  error: function(){
    console.log('no dotjs server found at localhost:3131')
  }
})
