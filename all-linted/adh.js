/**
 * All Advertorials Header CDN-v1.3
 * Change : Linted to ESLint Google
 */

/**
  * Settings Checks
  */
const adh = {};
// const settings = {};

adh.cookie_footer_url =
(document.cdnParameters.cookie_footer_url !== undefined) ?
    document.cdnParameters.cookie_footer_url :
    false;
adh.TB_widget = (document.cdnParameters.TB_widget !== undefined) ?
    document.cdnParameters.TB_widget :
    false;
// CSS CDN FILE
adh.cdnAllURL = '//cdn.jsdelivr.net/gh/digitaloyster/do-live/all/';
adh.styles={};
adh.styles.main=document.createElement('link');
adh.styles.main.setAttribute('rel', 'stylesheet');
adh.styles.main.setAttribute('type', 'text/css');
adh.styles.main.setAttribute('href', adh.cdnAllURL + 'ad.css');
document.getElementsByTagName('head')[0].appendChild(adh.styles.main);


// Cookie consent
if (adh.cookie_footer_url != '' && adh.cookie_footer_url) {
  adh.consentURL = '//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/';
  adh.styles.cookie=document.createElement('link');
  adh.styles.cookie.setAttribute('rel', 'stylesheet');
  adh.styles.cookie.setAttribute('type', 'text/css');
  adh.styles.cookie.setAttribute('href', adh.consentURL + 'cookieconsent.min.css');
  document.getElementsByTagName('head')[0].appendChild(adh.styles.cookie);

  $.getScript(adh.consentURL + 'cookieconsent.min.js');

  window.addEventListener('load', function() {
    window.cookieconsent.initialise({
      'palette': {
        'popup': {
          'background': '#000',
        },
        'button': {
          'background': '#f1d600',
        },
      },
      'content': {
        'href': document.cdnParameters.cookie_footer_url,
      },
    });
  });
}
// Cookie consent

// Taboola Widgets
if (adh.TB_widget == 'Y' && adh.TB_widget) {
  window._taboola = window._taboola || [];
  _taboola.push({article: 'auto'});
  !function(e, f, u, i) {
    if (!document.getElementById(i)) {
      e.async = 1;
      e.src = u;
      e.id = i;
      f.parentNode.insertBefore(e, f);
    }
  }(document.createElement('script'),
      document.getElementsByTagName('script')[0],
      '//cdn.taboola.com/libtrc/oyster-brunelfranklin/loader.js',
      'tb_loader_script');
  if (window.performance && typeof window.performance.mark == 'function') {
    window.performance.mark('tbl_ic');
  }
}
// Taboola Widgets
