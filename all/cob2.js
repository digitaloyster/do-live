// Combination Page Body Script CDN-v1.0
//
// Replacement for LPBO and COBO. For use on Combination Pages


// Functions
const getParameterByName = function(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const setCKMCookie = function(id) {
  document.cookie = 'ckm_request_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'ckm_request_id=' + id + ';path=/;';
};

const postCKM = function() {
  // Adv pixel
  if (document.cdnParameters.cake_offer_id != '' && typeof document.cdnParameters.cake_offer_id !== 'undefined' && document.cdnParameters.cake_adv_event_id != '' && typeof document.cdnParameters.cake_adv_event_id !== 'undefined' && document.cdnParameters.lp_tracking_prefix != '' && typeof document.cdnParameters.lp_tracking_prefix !== 'undefined') {
    const image = new Image(1, 1);
    image.src = 'https://secureoyster.com/p.ashx?o=' + document.cdnParameters.cake_offer_id + '&e=' + document.cdnParameters.cake_adv_event_id + '&f=img&r=' + ckm_request_id + '&t=' + document.cdnParameters.lp_tracking_prefix + '-' + window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight;
    console.log('fire adv:'+ image.src);
  }
  // Adv Pixel
  //
  // 10sec pixel
  if (document.cdnParameters.cake_offer_id != '' && typeof document.cdnParameters.cake_offer_id !== 'undefined' && document.cdnParameters.cake_10s_event_id != '' && typeof document.cdnParameters.cake_10s_event_id !== 'undefined') {
    setTimeout(function() {
      const image = new Image(1, 1);
      image.src = 'https://secureoyster.com/p.ashx?o=' + document.cdnParameters.cake_offer_id + '&e=' + document.cdnParameters.cake_10s_event_id + '&f=img&r=' + ckm_request_id;
      console.log('fire 10sec:'+ image.src);
    }, 10000);
  }
  // 10sec pixel
  //
  // LP Pixel
  if (document.cdnParameters.cake_offer_id != '' && typeof document.cdnParameters.cake_offer_id !== 'undefined' && document.cdnParameters.cake_lp_event_id != '' && typeof document.cdnParameters.cake_lp_event_id !== 'undefined' && document.cdnParameters.lp_tracking_prefix != '' && typeof document.cdnParameters.lp_tracking_prefix !== 'undefined') {
    const image = new Image(1, 1);
    let variant;
    if (typeof window.ub !== 'undefined') variant = window.ub.page.variantId;
    else variant = '';
    image.src = 'https://secureoyster.com/p.ashx?o=' + document.cdnParameters.cake_offer_id + '&e=' + document.cdnParameters.cake_lp_event_id + '&f=img&r=' + ckm_request_id + '&t=' + document.cdnParameters.lp_tracking_prefix + '-' + variant + '|' + window.outerWidth + 'x' + window.outerHeight + '|' + getParameterByName('link_click');
    console.log('fire lp:'+ image.src);
  }
  // LP Pixel
  //
  // Req Cookie
  setCKMCookie(ckm_request_id);
  // Req Cookie
};
// Functions


$(document).ready(function() {
  // Add submit class to submit buttons
  $('form + .lp-pom-button').addClass('submit');
  // Add submit class to submit buttons
  //
  // Taboola Remove Elements
  if (document.cdnParameters.hide_elements != '' && typeof document.cdnParameters.hide_elements !== 'undefined' && document.cdnParameters.hide_elements_affs != '' && typeof document.cdnParameters.hide_elements_affs !== 'undefined') { // REVIEW: Added check for both elements AND affiliates
    const idstring = document.cdnParameters.hide_elements;
    const affString = document.cdnParameters.hide_elements_affs;
    const aff = affString.split(',');
    if (affString != '') {
      for (j in aff) {
        if (getParameterByName('aff') == aff[j]) {
          if (idstring != '') {
            const ids = idstring.split(',');
            for (i in ids) {
              $(ids[i]).remove();
            }
          }
        }
      }
    }
  }
  // Taboola Remove Elements
  //
  // Smooth Scroll
  if (document.cdnParameters.smooth_scroll == 'Y' && typeof document.cdnParameters.smooth_scroll !== 'undefined') {
    // The speed of the scroll in milliseconds
    const speed = 1000;
    // Find links that are #anchors and scroll to them
    $('a[href^=\\#]').not('.lp-pom-form .lp-pom-button').unbind('click.smoothScroll').bind('click.smoothScroll', function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top,
      }, speed);
    });
  }
  // Smooth Scroll
  //
  // Facebook Pixel
  pid = '';
  if (getParameterByName('pid') != '' && typeof getParameterByName('pid') === 'string') {
    pid = '&pid=' + getParameterByName('pid');
  }
  // Facebook Pixels
  //
  // Glow
  const focusOnLoad = true; // By default, first form field is focused automatically on page load. Change this value to 'False' to disable this.
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
  // Get CKM Request ID
  if (getParameterByName('ckm_request_id') != '' && typeof getParameterByName('ckm_request_id') === 'string') {
    ckm_request_id = getParameterByName('ckm_request_id');
    affiliate = getParameterByName('aff');
    postCKM();
  } else if (getParameterByName('a') != '' && typeof getParameterByName('a') === 'string' && getParameterByName('c') != '' && typeof getParameterByName('c') === 'string') {
    const clickpixel = 'https://digitaloyster.jrnytag.com/' + location.search + '&cp=js';
    affiliate = getParameterByName('a');
    $.getScript(clickpixel, function() {
      document.getElementById('ckm_request_id').value = ckm_request_id;
      postCKM();
    });
  } else {
    // replaceURL();
  }
  // Get CKM Request ID
});
