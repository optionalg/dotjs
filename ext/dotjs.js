var dj = {};

dj.xhr = function _dj_xhr(details) {
  var E = chrome.extension;
  E.sendRequest({name: 'dj_xhr', details: details}, function(ret) {
        details[ret.eventName](ret.responseState);
      });
};

var GM_xmlhttpRequest = dj.xhr;

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
