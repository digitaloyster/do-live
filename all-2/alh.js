// All Pages Scripts Header CDN-v2

// CSS CDN FILE
const cdn = '//cdn.jsdelivr.net/gh/digitaloyster/do-live/';
const alStyle=document.createElement('link');
alStyle.setAttribute('rel', 'stylesheet');
alStyle.setAttribute('type', 'text/css');
alStyle.setAttribute('href', cdn+'all/al.css');
document.getElementsByTagName('head')[0].appendChild(alStyle);

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
        const m = 'FullStory namespace conflict.'+
        ' Please set window["_fs_namespace"].';
        m.console.log(m);
      }
      return;
    }
    g=m[e]=function(a, b) {
      g.q?g.q.push([a, b]):g._api(a, b);
    };
    g.q=[];
    o=n.createElement(t);
    o.async=1;
    o.src='https://'+_fs_host+'/s/fs.js';
    y=n.getElementsByTagName(t)[0];
    y.parentNode.insertBefore(o, y);
    g.identify=function(i, v) {
      g(l, {uid: i});
      if (v) g(l, v);
    };
    g.setUserVars=function(v) {
      g(l, v);
    };
    g.event=function(i, v) {
      g('event', {n: i, p: v});
    };
    g.shutdown=function() {
      g('rec', !1);
    };
    g.restart=function() {
      g('rec', !0);
    };
    g.consent=function(a) {
      g('consent', !arguments.length||a);
    };
    g.identifyAccount=function(i, v) {
      o='account';
      v=v||{};
      v.acctId=i;
      g(o, v);
    };
    g.clearUserCookie=function() { };
  })(window, document, window['_fs_namespace'], 'script', 'user');
}

// Unbounce Convertibles
$('head').append('<script src="https://73943c0bf6144760a33cc02ec368be53.js.ubembed.com" async></script>');

// Favicon
if (document.cdnParameters.favicon_url != '' &&
 typeof document.cdnParameters.favicon_url !== 'undefined') {
  $('head').append('<link rel="icon" type="image/x-icon" href="'+
  document.cdnParameters.favicon_url+
  '" />');
}
