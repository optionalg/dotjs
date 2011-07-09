var dj = {};

dj.xhr = function _dj_xhr(details) {
  var E = chrome.extension;
  E.sendRequest({name: 'dj_xhr', details: details}, function(ret) {
        details[ret.eventName](ret.responseState);
      });
};

dj.addcss = function _dj_addcss(css) {
  var p, s, id='dotjs-style', doc = window.document;

  s = doc.getElementById(id);
  if(!s) {
    p = doc.getElementsByTagName('head').item(0);
    if(!p) {
      p = doc.docElement;
    }
    s = doc.createElement('style');
    s.type = 'text/css';
    s.id = id;
    p.appendChild(s);
  }

  s.innerHTML = s.innerHTML + css;
};

var GM_xmlhttpRequest = dj.xhr,
    GM_addStyle = dj.addcss;

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
