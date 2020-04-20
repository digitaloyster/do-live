/**
 * All Advertorials Header CDN-v1.3
 * Change : Linted to ESLint Google
 */

/**
  * Settings Checks
  */
let settings;

settings.cookie_footer_url =
(document.cdnParameters.cookie_footer_url !== undefined) ?
    document.cdnParameters.cookie_footer_url :
    false;
settings.TB_widget = (document.cdnParameters.TB_widget !== undefined) ?
    document.cdnParameters.TB_widget :
    false;
// CSS CDN FILE
const cdnAllURL = '//cdn.jsdelivr.net/gh/digitaloyster/do-live/all/';
let styles=document.createElement('link');
styles.setAttribute('rel', 'stylesheet');
styles.setAttribute('type', 'text/css');
styles.setAttribute('href', cdnAllURL + 'ad.css');
document.getElementsByTagName('head')[0].appendChild(styles);


// Cookie consent
if (settings.cookie_footer_url != '' && settings.cookie_footer_url) {
  const consentURL = '//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/';
  styles=document.createElement('link');
  styles.setAttribute('rel', 'stylesheet');
  styles.setAttribute('type', 'text/css');
  styles.setAttribute('href', consentURL + 'cookieconsent.min.css');
  document.getElementsByTagName('head')[0].appendChild(styles);

  $.getScript(consentURL + 'cookieconsent.min.js');

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
if (settings.TB_widget == 'Y' && settings.TB_widget) {
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
