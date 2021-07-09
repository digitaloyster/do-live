// All Advertorials Header CDN-v2

// CSS CDN FILE
const cdnAd = '//cdn.jsdelivr.net/gh/digitaloyster/do-live/';
const styles = document.createElement('link');
styles.setAttribute('rel', 'stylesheet');
styles.setAttribute('type', 'text/css');
styles.setAttribute('href', cdnAd + 'all-2/ad.css');
document.getElementsByTagName('head')[0].appendChild(styles);


// Cookie consent
if (document.cdnParameters.cookie_footer_url != '' &&
  typeof document.cdnParameters.cookie_footer_url !== 'undefined') {
  const consent = '//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/';
  const styles = document.createElement('link');
  styles.setAttribute('rel', 'stylesheet');
  styles.setAttribute('type', 'text/css');
  styles.setAttribute('href', consent + 'cookieconsent.min.css');
  document.getElementsByTagName('head')[0].appendChild(styles);

  $.getScript(consent + 'cookieconsent.min.js');

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
if (document.cdnParameters.TB_widget == 'Y' &&
  typeof document.cdnParameters.TB_widget !== 'undefined') {
  window._taboola = window._taboola || [];
  _taboola.push({
    article: 'auto',
  });
  ! function(e, f, u, i) {
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
