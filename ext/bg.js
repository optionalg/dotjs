var requestHandler = {
  listeners : { /* name: listener */ },
  addListener: function _addListener(name, listener) {
    if(typeof this.listeners[name] !== 'undefined') {
      console.log('requestHandler: overwrite listener');
    }
    this.listeners[name] = listener;
  },
  onRequest: function _onRequest(msg, sender, sendResponse) {
               var that = requestHandler, i,len,
               listener = that.listeners[msg.name];
               try {
                 if(!listener) { return; }
                 listener(msg, sender, sendResponse);
               } catch(e) { console.error(e); }
             }
};
chrome.extension.onRequest.addListener(requestHandler.onRequest);


requestHandler.addListener('dj_xhr', function(msg, sender, sendResponse) {
    var xhr = new XMLHttpRequest(), d = msg.details, header,
      setupEvent = function(xhr, url, eventName, callback) {
        xhr[eventName] = function () {
          var isComplete = xhr.readyState == 4;
          var responseState = {
                responseText: xhr.responseText,
                readyState: xhr.readyState,
                responseHeaders: isComplete ? xhr.getAllResponseHeaders() : "",
                status: isComplete ? xhr.status : 0,
                statusText: isComplete ? xhr.statusText : "",
                finalUrl: isComplete ? url : ""
          };
          callback({eventName: eventName, responseState: responseState});
        };
      };

    xhr.open(d.method, d.url, true);
    if (d.overrideMimeType) { xhr.overrideMimeType(d.overrideMimeType); }
    if (d.headers) {
      for (header in d.headers) {
        if(d.headers.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, d.headers[header]);
        }
      }
    }

    var eventNames = ["onload", "onerror" /* "onreadystatechange" */]; //cant support onreadystatechange cause sendResponse fnction can be called just once
    for (var i = 0; i < eventNames.length; i++ ) {
      var eventName = eventNames[i];
      setupEvent(xhr, d.url, eventName, sendResponse);
    }

    xhr.send(d.data ? d.data : null);
});

