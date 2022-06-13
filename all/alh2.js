// All Pages Scripts Header CDN-v2

// Functions
const getParameterByName = function(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
// Functions

// CSS CDN FILE
const alStyle=document.createElement('link');
alStyle.setAttribute('rel', 'stylesheet');
alStyle.setAttribute('type', 'text/css');
alStyle.setAttribute('href', '//cdn.jsdelivr.net/gh/digitaloyster/do-live/all/al.css');
document.getElementsByTagName('head')[0].appendChild(alStyle);

// Unbounce Convertibles
$('head').append('<script src="https://73943c0bf6144760a33cc02ec368be53.js.ubembed.com" async></script>');

// Favicon
if (document.cdnParameters.favicon_url != '' && typeof document.cdnParameters.favicon_url !== 'undefined') {
  $('head').append('<link rel="icon" type="image/x-icon" href="'+document.cdnParameters.favicon_url+'" />');
}
