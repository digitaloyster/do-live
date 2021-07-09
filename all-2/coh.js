// Combo Pages header CDN-v2

// CSS CDN FILE
const cdnCo = '//cdn.jsdelivr.net/gh/digitaloyster/do-live/';
const lpStyle = document.createElement('link');
lpStyle.setAttribute('rel', 'stylesheet');
lpStyle.setAttribute('type', 'text/css');
lpStyle.setAttribute('href', cdnCo + 'all-2/lp.css');
document.getElementsByTagName('head')[0].appendChild(lpStyle);
// CSS CDN FILE

if ( typeof document.cdnParameters.postcode !== 'undefined' ) {
  const head = document.getElementsByTagName('head')[0];
  if (document.cdnParameters.postcode == 'A') {
    (function(n, t, i, r) {
      let u;
      let f;
      n[i]=n[i]||{},
      n[i].initial= {
        accountCode: 'DIGIT11191',
        host: 'DIGIT11191.pcapredict.com',
      },
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
  if (document.cdnParameters.postcode == 'S') {
    const p2Style = document.createElement('link');
    p2Style.setAttribute('rel', 'stylesheet');
    p2Style.setAttribute('type', 'text/css');
    p2Style.setAttribute('href', cdnCo + 'p2/p2.css');
    document.head.appendChild(p2Style);
    const p2Script = document.createElement('script');
    p2Script.setAttribute('src', cdnCo + 'p2/p2.js');
    head.appendChild(p2Script);
  }
  if (document.cdnParameters.postcode != 'A') {
    const p2AEScript = document.createElement('script');
    p2AEScript.type = 'text/javascript';
    p2AEScript.src = cdnCo + 'p2/address-edit.js';
    head.appendChild(p2AEScript);
  }
  if ( document.cdnParameters.postcode == 'DP' ||
   document.cdnParameters.postcode == 'DS1' ) {
    const d8css = document.createElement('link');
    d8css.setAttribute('rel', 'stylesheet');
    d8css.setAttribute('type', 'text/css');
    d8css.setAttribute('href', cdnCo + 'd8-2/d8_dp_d1.css');
    document.head.appendChild(d8css);
  }
  if ( document.cdnParameters.postcode == 'DP' ) {
    const d8DPScript = document.createElement('script');
    d8DPScript.type = 'text/javascript';
    d8DPScript.src = cdnCo + 'd8-2/d8_dp.js';
    head.appendChild(d8DPScript);
  }
  if ( document.cdnParameters.postcode == 'DS1' ) {
    const d8style = document.createElement('link');
    d8style.setAttribute('rel', 'stylesheet');
    d8style.setAttribute('type', 'text/css');
    d8style.setAttribute('href', 'https://webservices.data-8.co.uk/content/predictiveaddress.css');
    head.appendChild(d8style);
    const d8PAScript = document.createElement('script');
    d8PAScript.type = 'text/javascript';
    d8PAScript.src = 'https://webservices.data-8.co.uk/javascript/predictiveaddress.js';
    head.appendChild(d8PAScript);
    const d8DS1Script = document.createElement('script');
    d8DS1Script.type = 'text/javascript';
    d8DS1Script.src = cdnCo + 'd8-2/d8_ds1.js';
    head.appendChild(d8DS1Script);
  }
  if ( document.cdnParameters.postcode == 'DS2' ) {
    const d8style = document.createElement('link');
    d8style.setAttribute('rel', 'stylesheet');
    d8style.setAttribute('type', 'text/css');
    d8style.setAttribute('href', 'https://webservices.data-8.co.uk/content/predictiveaddress.css');
    head.appendChild(d8style);
    const d8PAScript = document.createElement('script');
    d8PAScript.type = 'text/javascript';
    d8PAScript.src = 'https://webservices.data-8.co.uk/javascript/predictiveaddress.js';
    head.appendChild(d8PAScript);
    const d8D2Script = document.createElement('script');
    d8D2Script.type = 'text/javascript';
    d8D2Script.src = cdnCo + 'd8-2/d8_ds2.js';
    head.appendChild(d8D2Script);
    const d8css = document.createElement('link');
    d8css.setAttribute('rel', 'stylesheet');
    d8css.setAttribute('type', 'text/css');
    d8css.setAttribute('href', cdnCo + 'd8-2/d8_d2.css');
    document.head.appendChild(d8css);
  }
}

// Taboola Pixels
if (document.cdnParameters.TB_pixel_ids != '' &&
 typeof document.cdnParameters.TB_pixel_ids !== 'undefined') {
  const idstring = document.cdnParameters.TB_pixel_ids;
  if (idstring != '') {
    const ids = idstring.split(',');
    for (i in ids) {
      if ({}.hasOwnProperty.call(ids, i)) {
        window._tfa = window._tfa || [];
        window._tfa.push({notify: 'event', name: 'page_view', id: ids[i]});
        !function(t, f, a, x) {
          if (!document.getElementById(x)) {
            t.async = 1;
            t.src = a;
            t.id=x;
            f.parentNode.insertBefore(t, f);
          }
        }(document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/unip/'+ids[i]+'/tfa.js',
            'tb_tfa_script');
      }
    }
  }
}
// Taboola Pixels

// Load PolyFill
const polyfillScript = document.createElement('script');
polyfillScript.setAttribute('src', 'https://polyfill.io/v3/polyfill.min.js');
polyfillScript.setAttribute('crossorigin', 'anonymous');
document.head.appendChild(polyfillScript);
// Load PolyFill
