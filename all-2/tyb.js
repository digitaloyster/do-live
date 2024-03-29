// All Thank You Pages Before Body CDN-v2.0
//
// Functions
// const getCookie = function(cname) {
//  const name = cname + '=';
//  const decodedCookie = decodeURIComponent(document.cookie);
//  const ca = decodedCookie.split(';');
//  for (let i = 0; i <ca.length; i++) {
//    let c = ca[i];
//    while (c.charAt(0) == ' ') {
//      c = c.substring(1);
//    }
//    if (c.indexOf(name) == 0) {
//      return c.substring(name.length, c.length);
//    }
//  }
//  return '';
// };
// Functions
//
$(document).ready(function() {
  // Cake Conversion Pixel
  if (document.cdnParameters.cake_offer_id != '' &&
  typeof document.cdnParameters.cake_offer_id !== 'undefined' &&
   document.cdnParameters.ty_tracking_prefix != '' &&
   typeof document.cdnParameters.ty_tracking_prefix !== 'undefined' &&
   document.cdnParameters.cake_conv_id != '' &&
   typeof document.cdnParameters.cake_conv_id !== 'undefined') {
    setTimeout(function() {
      const ifrm = document.createElement('iframe');
      let s = 'https://secureoyster.com/p.ashx?o='+document.cdnParameters.cake_offer_id+
      '&e='+document.cdnParameters.cake_conv_id+
      '&r=' + getCookie('ckm_request_id');
      if (document.cdnParameters.cake_conv_id !== 'ld') {
        if (getCookie('lead_id') !== null && getCookie('lead_id') !== '' ) {
          s += '&t=' + getCookie('lead_id');
        }
      } else {
        let variant;
        if (typeof window.ub !== 'undefined') variant = window.ub.page.variantId;
        else variant = '';
        s += '&t='+document.cdnParameters.ty_tracking_prefix+'-'+variant;
      }

      ifrm.setAttribute('src', s);
      ifrm.setAttribute('width', '1');
      ifrm.setAttribute('height', '1');
      ifrm.setAttribute('frameborder', '0');
      document.body.appendChild(ifrm);
      if (d) console.log('TY Pixel Fired: ' + s);
    }, 4000);
  }
  // Cake Conversion Pixel
  //
  // Facebook Lead tracking
  if (document.cdnParameters.FB_pixel_ids != '' &&
   typeof document.cdnParameters.FB_pixel_ids !== 'undefined') {
    fbq('track', 'Lead', {
      value: 10.00,
      currency: 'GBP',
    });
  }
  // Facebook Lead tracking
  //
  // Taboola Pixels
  if (document.cdnParameters.TB_pixel_ids != '' &&
   typeof document.cdnParameters.TB_pixel_ids !== 'undefined') {
    const idstring = document.cdnParameters.TB_pixel_ids;
    if (idstring != '') {
      const ids = idstring.split(',');
      for (i in ids) {
        if ({}.hasOwnProperty.call(ids, i)) {
          _tfa.push({notify: 'event', name: 'lead', id: ids[i]});
        }
      }
    }
  }
  // Taboola Pixels
  //
  // Twitter conversion
  if (document.cdnParameters.TW_lead_ids != '' &&
   typeof document.cdnParameters.TW_lead_ids !== 'undefined') {
    $.getScript('//platform.twitter.com/oct.js', function() {
      const idstring = document.cdnParameters.TW_lead_ids;
      const ids = idstring.split(',');
      for (i in ids) {
        if ({}.hasOwnProperty.call(ids, i)) {
          twttr.conversion.trackPid(ids[i], {
            tw_sale_amount: 0,
            tw_order_quantity: 0,
          });
        }
      }
    });
  }
  // Twitter conversion
});
