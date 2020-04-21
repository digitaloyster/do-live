/**
 * All Thank You Pages Before Body CDN-v1.0
 */
const tyb = {};

/**
  * Functions
  */

/**
 * getParameterByName - URL Get Variable
 *
 * @param  {string} name Get Param
 * @return {string}      Get Value
 */
/* function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}*/


/**
 * getCookie - Get Cookie Details
 *
 * @param  {string} cname Cookie Param
 * @return {string}       Cookie Value
 */
tyb.getCookie = function(cname) {
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


/**
 * Settings
 */
tyb.settings = document.cdnParameters;
tyb.settings.cake_offer_id =
  (tyb.settings.cake_offer_id !== undefined) ?
  tyb.settings.cake_offer_id :
  false;
tyb.settings.cake_conv_id =
  (tyb.settings.cake_conv_id !== undefined) ?
  tyb.settings.cake_conv_id :
  false;
tyb.settings.ty_tracking_prefix =
  (tyb.settings.ty_tracking_prefix !== undefined) ?
  tyb.settings.ty_tracking_prefix :
  false;
tyb.settings.FB_pixel_ids =
  (tyb.settings.FB_pixel_ids !== undefined) ?
  tyb.settings.FB_pixel_ids :
  false;
tyb.settings.TB_pixel_ids =
  (tyb.settings.TB_pixel_ids !== undefined) ?
  tyb.settings.TB_pixel_ids :
  false;
tyb.settings.TW_lead_ids =
  (tyb.settings.TW_lead_ids !== undefined) ?
  tyb.settings.TW_lead_ids :
  false;
tyb.settings.YG_pixel_ids =
  (tyb.settings.YG_pixel_ids !== undefined) ?
  tyb.settings.YG_pixel_ids :
  false;


/**
 * Cake Conversion Pixel
 */
if (tyb.settings.cake_offer_id != '' && tyb.settings.cake_offer_id &&
    tyb.settings.ty_tracking_prefix != '' && tyb.settings.ty_tracking_prefix &&
    tyb.settings.cake_conv_id != '' && tyb.settings.cake_conv_id) {
  setTimeout(function() {
    const image = new Image(1, 1);
    let url = 'https://digitaloyster.jrnytag.com/p.ashx?o='+tyb.settings.cake_offer_id+'&e='+tyb.settings.cake_conv_id+'&r=' + tyb.getCookie('ckm_request_id');
    if (tyb.settings.cake_conv_id !== 'ld') {
      if (tyb.getCookie('lead_id') !== null &&
          tyb.getCookie('lead_id') !== '' ) {
        url += '&t=' + tyb.getCookie('lead_id');
      }
    } else {
      let variant;
      if (typeof window.ub !== 'undefined') variant = window.ub.page.variantId;
      else variant = '';
      url += '&t='+tyb.settings.ty_tracking_prefix+'-'+variant;
    }
    console.log(url);
    image.src = url;
  }, 4000);
}

/**
 * Facebook Lead tracking
 */
if (tyb.settings.FB_pixel_ids != '' &&
    tyb.settings.FB_pixel_ids) {
  fbq('track', 'Lead', {
    value: 10.00,
    currency: 'GBP',
  });
}


/**
 * Taboola Pixels
 */
if (tyb.settings.TB_pixel_ids != '' && tyb.settings.TB_pixel_ids) {
  const idstring = tyb.settings.TB_pixel_ids;
  if (idstring != '') {
    const ids = idstring.split(',');
    for (i in ids) {
      if (TB_pixel_ids.hasOwnProperty(i)) {
        _tfa.push({notify: 'event', name: 'lead', id: ids[i]});
      }
    }
  }
}


/**
 * Twitter conversion
 */
if (tyb.settings.TW_lead_ids != '' && tyb.settings.TW_lead_ids) {
  $.getScript('//platform.twitter.com/oct.js', function() {
    const idstring = tyb.settings.TW_lead_ids;
    const ids = idstring.split(',');
    for (i in ids) {
      if (ids.hasOwnProperty(i)) {
        twttr.conversion.trackPid(ids[i], {
          tw_sale_amount: 0,
          tw_order_quantity: 0,
        });
      }
    }
  });
}


/**
 * Yahoo Pixel
 */
if (settings.YG_pixel_ids != '' && settings.YG_pixel_ids) {
  const idstring = settings.YG_pixel_ids;
  if (idstring != '') {
    const ids = idstring.split(',');
    for (i in ids) {
      if (Object.prototype.hasOwnProperty.call(foo, key)) {
        (function(w, d, t, r, u) {
          w[u]=w[u]||[];
          w[u].push({'projectId': '10000', 'properties': {'pixelId': ids[i]}});
          const s=d.createElement(t);
          s.src=r;
          s.async=true;
          s.onload=s.onreadystatechange=function() {
            let y;
            const rs=this.readyState;
            const c=w[u];
            if (rs&&rs!='complete'&&rs!='loaded') {
              return;
            } try {
              y=YAHOO.ywa.I13N.fireBeacon; w[u]=[]; w[u].push=function(p) {
                y([p]);
              }; y(c);
            } catch (e) {}
          };
          const scr=d.getElementsByTagName(t)[0];
          const par=scr.parentNode;
          par.insertBefore(s, scr);
        })(window, document, 'script', 'https://s.yimg.com/wi/ytc.js', 'dotq');
      }
    }
  }
}
