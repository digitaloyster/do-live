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
}
// Favicon
