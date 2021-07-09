// All Landing Pages Before Body CDN-v2

// Functions
// const getUrlParameter = function getUrlParameter(sParam) {
//  const sPageURL = decodeURIComponent(window.location.search.substring(1));
//  const sURLVariables = sPageURL.split('&');
//  let sParameterName;
//  let i;

// for (i = 0; i < sURLVariables.length; i++) {
//    sParameterName = sURLVariables[i].split('=');
//    if (sParameterName[0] === sParam) {
//      return sParameterName[1] === undefined ? true : sParameterName[1];
//    }
//  }
// };

const setCKMCookie = function(id) {
  document.cookie = 'ckm_request_id=; expires='+
  'Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'ckm_request_id=' + id + ';path=/;';
};
// Functions

$(document).ready(function() {
  // Add submit class to submit buttons
  $('form + .lp-pom-button').addClass('submit');
  // Add submit class to submit buttons
  //
  // Taboola Remove Elements
  if (document.cdnParameters.hide_elements != '' &&
   typeof document.cdnParameters.hide_elements !== 'undefined' &&
    document.cdnParameters.hide_elements_affs != '' &&
     typeof document.cdnParameters.hide_elements_affs !== 'undefined') {
    const idstring = document.cdnParameters.hide_elements;
    const affString = document.cdnParameters.hide_elements_affs;
    const aff = affString.split(',');
    if (affString != '') {
      for (j in aff) {
        if (getParameterByName('aff') == aff[j]) {
          if (idstring != '') {
            const ids = idstring.split(',');
            for (i in ids) {
              if ({}.hasOwnProperty.call(ids, i)) {
                $(ids[i]).remove();
              }
            }
          }
        }
      }
    }
  }
  // Taboola Remove Elements
  //
  // Smooth Scroll
  if (document.cdnParameters.smooth_scroll == 'Y' &&
   typeof document.cdnParameters.smooth_scroll !== 'undefined') {
    // The speed of the scroll in milliseconds
    const speed = 1000;
    // Find links that are #anchors and scroll to them
    $('a[href^=\\#]')
        .not('.lp-pom-form .lp-pom-button')
        .unbind('click.smoothScroll')
        .bind('click.smoothScroll', function(event) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
          }, speed);
        });
  }
  // Smooth Scroll
  //
  // Get ckm_request_id
  if (typeof getParameterByName('ckm_request_id') !== 'string' &&
   getParameterByName('a') != '' &&
    typeof getParameterByName('a') === 'string' &&
     getParameterByName('c') != '' &&
      typeof getParameterByName('c') === 'string') {
    const clickpixel = 'https://digitaloyster.jrnytag.com/' + location.search + '&cp=js';
    affiliate = getParameterByName('a');

    $.getScript(clickpixel, function() {
      const image = new Image(1, 1);
      let variant;
      let ckmri = '';
      document.getElementById('ckm_request_id').value = ckm_request_id;
      ckmri = ckm_request_id;
      console.log('ckm:' + ckmri);
      if (typeof window.ub !== 'undefined') variant = window.ub.page.variantId;
      else variant = '';

      image.src = 'https://secureoyster.com/p.ashx?o=' + document.cdnParameters.cake_offer_id +
        '&e=' + document.cdnParameters.cake_lp_event_id +
        '&f=img&r=' + ckmri +
        '&t=' + document.cdnParameters.lp_tracking_prefix +
        '-' + variant +
        '|' + window.outerWidth +
        'x' + window.outerHeight +
        '|' + getParameterByName('link_click');
    });
  }
  // Get ckm_request_id
  //
  // LP Pixel
  if (document.cdnParameters.cake_offer_id != '' &&
   typeof document.cdnParameters.cake_offer_id !== 'undefined' &&
   document.cdnParameters.cake_lp_event_id != '' &&
   typeof document.cdnParameters.cake_lp_event_id !== 'undefined' &&
   document.cdnParameters.lp_tracking_prefix != '' &&
   typeof document.cdnParameters.lp_tracking_prefix !== 'undefined') {
    const image = new Image(1, 1);
    let variant;
    let ckmri = '';
    if (getParameterByName('ckm_request_id')) {
      ckmri = getParameterByName('ckm_request_id');
      if (typeof window.ub !== 'undefined') variant = window.ub.page.variantId;
      else variant = '';
      image.src = 'https://secureoyster.com/p.ashx?o=' + document.cdnParameters.cake_offer_id +
      '&e=' + document.cdnParameters.cake_lp_event_id +
      '&f=img&r=' + ckmri +
      '&t=' + document.cdnParameters.lp_tracking_prefix +
      '-' + variant +
      '|' + window.outerWidth +
      'x' + window.outerHeight +
      '|' + getParameterByName('link_click');
    }
  }
  // LP Pixel
  //
  // Glow
  const focusOnLoad = true;
  // By default, first form field is focused automatically on page load.
  // Change this value to 'False' to disable this.
  $(':input, .lp-pom-form .lp-pom-button').focus(function() {
    $(this).addClass('focusGlow');
  });

  $(':input, .lp-pom-form .lp-pom-button').blur(function() {
    $(this).removeClass('focusGlow');
  });

  if (focusOnLoad) {
    $('input:not([type=hidden]):first').focus().addClass('focusGlow');
  }
  // Glow
  //
  // ReqCookie
  if (getParameterByName('ckm_request_id')) {
    setCKMCookie(getParameterByName('ckm_request_id'));
  } else if (document.getElementById('ckm_request_id') &&
  document.getElementById('ckm_request_id').value !== '') {
    setCKMCookie(document.getElementById('ckm_request_id').value);
  } else {
    setCKMCookie('');
  }
  // ReqCookie

  // NEEDS ADDING document.cookie = "lead_id="+id; TO File/App file in UKM/NFC
  // LeadCookie
  // if (document.getElementById('lead_id')) {
  //  document.cookie = "lead_id="+document.getElementById('lead_id').value;
  // }
  // LeadCookie
});
