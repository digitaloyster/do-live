/**
 * All Landing Pages header CDN-v1.1
 */

/**
  * Variables
  */
const cdnURL = '//cdn.jsdelivr.net/gh/digitaloyster/do-live/';
let settings;
settings.postcode =
  (document.cdnParameters.postcode !== undefined) ?
  document.cdnParameters.postcode :
  false;
settings.TB_pixel_ids =
  (document.cdnParameters.TB_pixel_ids !== undefined) ?
  document.cdnParameters.TB_pixel_ids :
  false;


/**
  * CSS CDN FILE
  */
const styles=document.createElement('link');
styles.setAttribute('rel', 'stylesheet');
styles.setAttribute('type', 'text/css');
styles.setAttribute('href', cdnURL + 'all/lp.css');
document.getElementsByTagName('head')[0].appendChild(styles);


if ( settings.postcode) {
  const head = document.getElementsByTagName('head')[0];
  if (settings.postcode == 'A') {
    (function(n, t, i, r) {
      let u;
      let f;
      n[i]=n[i]||{},
      n[i].initial={accountCode: 'DIGIT11191',
        host: 'DIGIT11191.pcapredict.com'},
      n[i].on=n[i].on||function() {
        (n[i].onq=n[i].onq||[]).push(arguments);
      },
      u=t.createElement('script'),
      u.async=!0,
      u.src=r,
      f=t.getElementsByTagName('script')[0],
      f.parentNode.insertBefore(u, f);
    })(window, document, 'pca', '//DIGIT11191.pcapredict.com/js/sensor.js');
  }
  if (settings.postcode == 'S') {
    const p2Style = document.createElement('link');
    p2Style.setAttribute('rel', 'stylesheet');
    p2Style.setAttribute('type', 'text/css');
    p2Style.setAttribute('href', cdnURL + 'p2/p2.css');
    document.head.appendChild(p2Style);
    const p2Script = document.createElement('script');
    p2Script.setAttribute('src', cdnURL + 'p2/p2.js');
    head.appendChild(p2Script);
  }
  if (settings.postcode != 'A') {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = cdnURL + 'p2/address-edit.js';
    head.appendChild(script);
  }
  if ( settings.postcode == 'DP' || settings.postcode == 'DS1' ) {
    const d8css = document.createElement('link');
    d8css.setAttribute('rel', 'stylesheet');
    d8css.setAttribute('type', 'text/css');
    d8css.setAttribute('href', cdnURL + 'd8/d8_dp_d1.css');
    document.head.appendChild(d8css);
  }
  if ( settings.postcode == 'DP' ) {
    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.src = cdnURL + 'd8/d8_dp.js';
    head.appendChild(script2);
  }
  if ( settings.postcode == 'DS1' ) {
    const d8style = document.createElement('link');
    d8style.setAttribute('rel', 'stylesheet');
    d8style.setAttribute('type', 'text/css');
    d8style.setAttribute('href', 'https://webservices.data-8.co.uk/content/predictiveaddress.css');
    head.appendChild(d8style);
    const script3 = document.createElement('script');
    script3.type = 'text/javascript';
    script3.src = 'https://webservices.data-8.co.uk/javascript/predictiveaddress.js';
    head.appendChild(script3);
    const script4 = document.createElement('script');
    script4.type = 'text/javascript';
    script4.src = cdnURL + 'd8/d8_ds1.js';
    head.appendChild(script4);
  }
  if ( settings.postcode == 'DS2' ) {
    const d8style = document.createElement('link');
    d8style.setAttribute('rel', 'stylesheet');
    d8style.setAttribute('type', 'text/css');
    d8style.setAttribute('href', 'https://webservices.data-8.co.uk/content/predictiveaddress.css');
    head.appendChild(d8style);
    const script3 = document.createElement('script');
    script3.type = 'text/javascript';
    script3.src = 'https://webservices.data-8.co.uk/javascript/predictiveaddress.js';
    head.appendChild(script3);
    const script4 = document.createElement('script');
    script4.type = 'text/javascript';
    script4.src = cdnURL + 'd8/d8_ds2.js';
    head.appendChild(script4);
    const d8css = document.createElement('link');
    d8css.setAttribute('rel', 'stylesheet');
    d8css.setAttribute('type', 'text/css');
    d8css.setAttribute('href', cdnURL + 'd8/d8_d2.css');
    document.head.appendChild(d8css);
  }
}

/**
 * Taboola Pixels
 */
if (settings.TB_pixel_ids != '' && settings.TB_pixel_ids) {
  const idstring = settings.TB_pixel_ids;
  if (idstring != '') {
    const ids = idstring.split(',');
    for (i in ids) {
      if (Object.prototype.hasOwnProperty.call(foo, key)) {
        window._tfa = window._tfa || [];
        window._tfa.push({notify: 'event', name: 'page_view', id: ids[i]});
        !function(t, f, a, x) {
          if (!document.getElementById(x)) {
            t.async = 1; t.src = a; t.id=x; f.parentNode.insertBefore(t, f);
          }
        }(document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/unip/'+ids[i]+'/tfa.js',
            'tb_tfa_script');
      }
    }
  }
}


/**
 * Load PolyFill
 */
const polyfill = document.createElement('script');
polyfill.setAttribute('src', 'https://polyfill.io/v3/polyfill.min.js');
polyfill.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(polyfill);
