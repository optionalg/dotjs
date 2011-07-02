var requestHandler = {
listeners : [],
addListener: function __addListener(name, listener) {
              this.listeners.push({
                name: name,
                listener: listener
                });
},
_onRequest: function __onRequest(msg, sendr, sendResponse) {
              try {
                requestHandler.listeners.forEach(function(val) {
                    if(msg.name === val.name) {
                      var ret = val.listener.apply(null, [msg, sendr, sendResponse]);
                    }
                  });
              } catch(e) {}
            }
};
chrome.extension.onRequest.addListener(requestHandler._onRequest);


requestHandler.addListener('dj_getContent', function(msg, sender, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', msg.url, true);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 200){
        fn(xhr.responseText);
      }
    };
    xhr.send(null);
});

