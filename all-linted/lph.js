/**
 * All Landing Pages header CDN-v1.3
 * Change: ES Lint Google
 * Change: Namespaced
 */
const lph = {};
lph.style = {};
lph.script = {};

/**
  * Variables
  */
lph.cdnURL = '//cdn.jsdelivr.net/gh/digitaloyster/do-live/';
lph.settings = document.cdnParameters;

lph.settings.postcode =
  (lph.settings.postcode !== undefined) ?
  lph.settings.postcode :
  false;
lph.settings.TB_pixel_ids =
  (lph.settings.TB_pixel_ids !== undefined) ?
  lph.settings.TB_pixel_ids :
  false;


/**
  * CSS CDN FILE
  */
lph.style.main=document.createElement('link');
lph.style.main.setAttribute('rel', 'stylesheet');
lph.style.main.setAttribute('type', 'text/css');
lph.style.main.setAttribute('href', lph.cdnURL + 'all/lp.css');
document.getElementsByTagName('head')[0].appendChild(lph.style.main);


if ( lph.settings.postcode) {
  const head = document.getElementsByTagName('head')[0];
  if (lph.settings.postcode == 'A') {
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
  if (lph.settings.postcode == 'S') {
    lph.style.p2s = document.createElement('link');
    lph.style.p2s.setAttribute('rel', 'stylesheet');
    lph.style.p2s.setAttribute('type', 'text/css');
    lph.style.p2s.setAttribute('href', lph.cdnURL + 'p2/p2.css');
    document.head.appendChild(lph.style.p2s);
    lph.script.p2s = document.createElement('script');
    lph.script.p2s.setAttribute('src', lph.cdnURL + 'p2/p2.js');
    head.appendChild(lph.script.p2s);
  }
  if (lph.settings.postcode != 'A') {
    lph.script.p2a = document.createElement('script');
    lph.script.p2a.type = 'text/javascript';
    lph.script.p2a.src = lph.cdnURL + 'p2/address-edit.js';
    head.appendChild(lph.script.p2a);
  }
  if (lph.settings.postcode == 'DP' || lph.settings.postcode == 'DS1' ) {
    lph.style.d8 = document.createElement('link');
    lph.style.d8.setAttribute('rel', 'stylesheet');
    lph.style.d8.setAttribute('type', 'text/css');
    lph.style.d8.setAttribute('href', lph.cdnURL + 'd8/d8_dp_d1.css');
    document.head.appendChild(lph.style.d8);
  }
  if (lph.settings.postcode == 'DP' ) {
    lph.script.dp = document.createElement('script');
    lph.script.dp.type = 'text/javascript';
    lph.script.dp.src = lph.cdnURL + 'd8/d8_dp.js';
    head.appendChild(lph.script.dp);
  }
  if (lph.settings.postcode == 'DS1' || lph.settings.postcode == 'DS2') {
    lph.style.dpa = document.createElement('link');
    lph.style.dpa.setAttribute('rel', 'stylesheet');
    lph.style.dpa.setAttribute('type', 'text/css');
    lph.style.dpa.setAttribute('href', 'https://webservices.data-8.co.uk/content/predictiveaddress.css');
    head.appendChild(lph.script.dpa);
    lph.script.dpa = document.createElement('script');
    lph.script.dpa.type = 'text/javascript';
    lph.script.dpa.src = 'https://webservices.data-8.co.uk/javascript/predictiveaddress.js';
    head.appendChild(lph.script.dpa);
  }
  if (lph.settings.postcode == 'DS1' ) {
    lph.script.ds1 = document.createElement('script');
    lph.script.ds1.type = 'text/javascript';
    lph.script.ds1.src = lph.cdnURL + 'd8/d8_ds1.js';
    head.appendChild(lph.script.ds1);
  }
  if ( lph.settings.postcode == 'DS2' ) {
    lph.script.ds2 = document.createElement('script');
    lph.script.ds2.type = 'text/javascript';
    lph.script.ds2.src = lph.cdnURL + 'd8/d8_ds2.js';
    head.appendChild(lph.script.ds2);
    lph.style.ds2 = document.createElement('link');
    lph.style.ds2.setAttribute('rel', 'stylesheet');
    lph.style.ds2.setAttribute('type', 'text/css');
    lph.style.ds2.setAttribute('href', lph.cdnURL + 'd8/d8_d2.css');
    document.head.appendChild(lph.style.ds2);
  }
}

/**
 * Taboola Pixels
 */
if (lph.settings.TB_pixel_ids != '' && lph.settings.TB_pixel_ids) {
  const idstring = lph.settings.TB_pixel_ids;
  if (idstring != '') {
    const ids = idstring.split(',');
    for (i in ids) {
      if (ids.hasOwnProperty(i)) {
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
lph.script.poly = document.createElement('script');
lph.script.poly.setAttribute('src', 'https://polyfill.io/v3/polyfill.min.js');
lph.script.poly.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(lph.script.poly);
