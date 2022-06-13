// All Pages Scripts Header CDN-v1.0
// Testing GitCDN 2
// CSS CDN FILE
const stylesALH=document.createElement('link');
stylesALH.setAttribute('rel', 'stylesheet');
stylesALH.setAttribute('type', 'text/css');
stylesALH.setAttribute('href', '//cdn.jsdelivr.net/gh/digitaloyster/do-live/all/al.css');
document.getElementsByTagName('head')[0].appendChild(stylesALH);

// Unbounce Convertibles
$('head').append('<script src="https://73943c0bf6144760a33cc02ec368be53.js.ubembed.com" async></script>');

// Favicon
if (document.cdnParameters.favicon_url != '' && typeof document.cdnParameters.favicon_url !== 'undefined') {
  $('head').append('<link rel="icon" type="image/x-icon" href="'+document.cdnParameters.favicon_url+'" />');
}
