
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.runtime.getURL('app/socket.io.js');
console.log("on contectscript", s);
s.onload = function() {
    console.log("content onload socket");
    this.remove();
    var s = document.createElement('script');
    // TODO: add "script.js" to web_accessible_resources in manifest.json
    s.src = chrome.runtime.getURL('app/injectscript.js');
    console.log("on contectscript", s);
    s.onload = function() {
        console.log("content  inject");
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
};
(document.head || document.documentElement).appendChild(s);

// var s = document.createElement('script');
// // TODO: add "script.js" to web_accessible_resources in manifest.json
// s.src = chrome.runtime.getURL('app/injectscript.js');
// console.log("on contectscript", s);
// s.onload = function() {
//     console.log("content onload");
//     this.remove();
// };
// (document.head || document.documentElement).appendChild(s);

// (async () => {
//     const src = chrome.extension.getURL('app/injectscript.js');
//     const contentScript = await import(src);
//     contentScript.main();
//   })();
  