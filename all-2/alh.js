// All Pages Scripts Header CDN-v2.0
//
// Global Functions
const getParameterByName = function(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const getCookie = function(cname) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
// Global Functions
//
// Global Variables
let d = false;
if (document.cdnParameters.debugMode == '1' ||
 getParameterByName('debug') == '1') {
  d = true;
  if (d) console.log('DEBUG MODE ACTIVE');
}
// Global Variables
//
// CSS CDN FILE
const cdnAl = '//cdn.jsdelivr.net/gh/digitaloyster/do-live/';
const alStyle=document.createElement('link');
alStyle.setAttribute('rel', 'stylesheet');
alStyle.setAttribute('type', 'text/css');
alStyle.setAttribute('href', cdnAl+'all/al.css');
document.getElementsByTagName('head')[0].appendChild(alStyle);
// CSS CDN FILE
//
// FullStory
const getSum = function(total, num) {
  return parseInt(total) + parseInt(num);
};

const guid = function() {
  const d = new Date();
  const nav = window.navigator;
  const screen = window.screen;
  let guid = nav.userAgent.replace(/\D+/g, '').match(/.{1}/g).reduce(getSum, 0);
  guid += parseInt(nav.mimeTypes.length);
  guid += parseInt(nav.plugins.length);
  guid += parseInt(screen.pixelDepth) || 1;
  guid += parseInt(d.getDate());
  return guid;
};

let mod1 = 0;
document.cdnParameters.full_story ?
 mod1 = document.cdnParameters.full_story :
  mod1 = 3;
if ( typeof mod1 === 'string' ) {
  mod1 = mod1.toLowerCase();
}
if ( mod1 != 'off' &&
 guid() % parseInt( mod1 ) === 0 ) {
  window['_fs_debug'] = false;
  window['_fs_host'] = 'fullstory.com';
  window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
  window['_fs_org'] = 'F14BY';
  window['_fs_namespace'] = 'FS';
  (function(m, n, e, t, l, o, g, y) {
    if (e in m) {
      if (m.console && m.console.log) {
        m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');
      } return;
    }
    g=m[e]=function(a, b, s) {
g.q?g.q.push([a, b, s]):g._api(a, b, s);
    }; g.q=[];
    o=n.createElement(t); o.async=1; o.crossOrigin='anonymous'; o.src='https://'+_fs_script;
    y=n.getElementsByTagName(t)[0]; y.parentNode.insertBefore(o, y);
    g.identify=function(i, v, s) {
      g(l, {uid: i}, s); if (v)g(l, v, s);
    }; g.setUserVars=function(v, s) {
      g(l, v, s);
    }; g.event=function(i, v, s) {
      g('event', {n: i, p: v}, s);
    };
    g.anonymize=function() {
      g.identify(!!0);
    };
    g.shutdown=function() {
      g('rec', !1);
    }; g.restart=function() {
      g('rec', !0);
    };
    g.log = function(a, b) {
      g('log', [a, b]);
    };
    g.consent=function(a) {
      g('consent', !arguments.length||a);
    };
    g.identifyAccount=function(i, v) {
      o='account'; v=v||{}; v.acctId=i; g(o, v);
    };
    g.clearUserCookie=function() {};
    g.setVars=function(n, p) {
      g('setVars', [n, p]);
    };
    g._w={}; y='XMLHttpRequest'; g._w[y]=m[y]; y='fetch'; g._w[y]=m[y];
    if (m[y]) {
      m[y]=function() {
        return g._w[y].apply(this, arguments);
      };
    }
    g._v='1.3.0';
  })(window, document, window['_fs_namespace'], 'script', 'user');
  FS.identify(getCookie('ckm_request_id'));
}
// FullStory
//
// Unbounce Convertibles
$('head').append('<script src="https://73943c0bf6144760a33cc02ec368be53.js.ubembed.com" async></script>');
// Unbounce Convertibles
//
// Favicon
if (document.cdnParameters.favicon_url != '' &&
 typeof document.cdnParameters.favicon_url !== 'undefined') {
  $('head').append('<link rel="icon" type="image/x-icon" href="'+
  document.cdnParameters.favicon_url+
  '" />');
// Favicon
}
