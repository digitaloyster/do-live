/**
 * All Landing Pages Before Body CDN-v1.3
 * Change: ES Lint Google
 * Change: Namespaced
 */
const lpb = {};
/**
  * Variables
  */
lpb.settings = document.cdnParameters;
lpb.settings.cake_offer_id =
  (lpb.settings.cake_offer_id !== undefined) ?
  lpb.settings.cake_offer_id :
  false;
lpb.settings.cake_lp_event_id =
  (lpb.settings.cake_lp_event_id !== undefined) ?
  lpb.settings.cake_lp_event_id :
  false;
lpb.settings.lp_tracking_prefix =
  (lpb.settings.lp_tracking_prefix !== undefined) ?
  lpb.settings.lp_tracking_prefix :
  false;
lpb.settings.hide_elements =
  (lpb.settings.hide_elements !== undefined) ?
  lpb.settings.hide_elements :
  false;
lpb.settings.hide_elements_affs =
  (lpb.settings.hide_elements_affs !== undefined) ?
  lpb.settings.hide_elements_affs :
  false;
lpb.settings.smooth_scroll =
  (lpb.settings.smooth_scroll !== undefined) ?
  lpb.settings.smooth_scroll :
  false;


/**
 * Functions
 */

/**
  * getUrlParameter - Get URL Get Variables
  *
  * @param  {string} sParam Get Variable Parameter
  * @return {string}        Get Variable Value
  */
lpb.getUrlParameter = function(sParam) {
  const sPageURL = decodeURIComponent(window.location.search.substring(1));
  const sURLVariables = sPageURL.split('&');
  let sParameterName;
  let i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};


/**
 * setCKMCookie - Set a Cookie
 *
 * @param  {type} id description
 */
lpb.setCKMCookie = function(id) {
  let cookie = 'ckm_request_id=; ';
  cookie += 'expires=Thu, 01 Jan 1970 00:00:00 UTC; ';
  cookie += 'path=/;';
  document.cookie = cookie;
  document.cookie = 'ckm_request_id=' + id + ';path=/;';
};


$( document ).ready(function() {
  /**
   * Add submit class to submit buttons
   */
  $('form + .lp-pom-button').addClass('submit');


  /**
   * Taboola Remove Elements
   */
  if (lpb.settings.hide_elements != '' && lpb.settings.hide_elements &&
    lpb.settings.hide_elements_affs != '' && lpb.settings.hide_elements_affs) {
    const idstring = lpb.settings.hide_elements;
    const affString = lpb.settings.hide_elements_affs;
    const aff = affString.split(',');
    if (affString != '') {
      for (j in aff) {
        if (aff.hasOwnProperty(i)) {
          if (getUrlParameter('aff') == aff[j]) {
            if (idstring != '') {
              const ids = idstring.split(',');
              for (i in ids) {
                if (ids.hasOwnProperty(i)) {
                  $(ids[i]).remove();
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Smooth Scroll
   */
  if (lpb.settings.smooth_scroll == 'Y' && lpb.settings.smooth_scroll) {
    // The speed of the scroll in milliseconds
    const speed = 1000;
    // Find links that are #anchors and scroll to them
    $('a[href^=\\#]')
        .not('.lp-pom-form .lp-pom-button')
        .unbind('click.smoothScroll')
        .bind('click.smoothScroll', function(event) {
          event.preventDefault();
          $('html, body')
              .animate(
                  {scrollTop: $( $(this).attr('href') ).offset().top},
                  speed);
        });
  }

  /**
   * LP Pixel
   */
  if (lpb.settings.cake_offer_id != '' && lpb.settings.cake_offer_id &&
   lpb.settings.cake_lp_event_id != '' && lpb.settings.cake_lp_event_id &&
   lpb.settings.lp_tracking_prefix != '' && lpb.settings.lp_tracking_prefix) {
    const image = new Image(1, 1);
    let variant;
    if (typeof window.ub !== 'undefined') variant = window.ub.page.variantId;
    else variant = '';
    image.src = 'https://digitaloyster.jrnytag.com/p.ashx?o='+lpb.settings.cake_offer_id+'&e='+lpb.settings.cake_lp_event_id+'&f=img&r=' + lpb.getUrlParameter('ckm_request_id') + '&t='+lpb.settings.lp_tracking_prefix+'-'+ variant + '|' + window.outerWidth + 'x' + window.outerHeight + '|' + lpb.getUrlParameter('link_click');
  }

  /**
   * Glow
   */
  const focusOnLoad = true;
  /**
   * By default, first form field is focused automatically on page load.
   * Change this value to 'False' to disable this.
   */
  $(':input, .lp-pom-form .lp-pom-button').focus(function() {
    $(this).addClass('focusGlow');
  });

  $(':input, .lp-pom-form .lp-pom-button').blur(function() {
    $(this).removeClass('focusGlow');
  });

  if (focusOnLoad) {
    $('input:not([type=hidden]):first').focus().addClass('focusGlow');
  }


  /**
   * ReqCookie
   */
  if (lpb.getUrlParameter('ckm_request_id')) {
    lpb.setCKMCookie(lpb.getUrlParameter('ckm_request_id'));
  } else if (document.getElementById('ckm_request_id') &&
   document.getElementById('ckm_request_id').value !== '') {
    lpb.setCKMCookie(document.getElementById('ckm_request_id').value);
  } else {
    setCKMCookie('');
  }

  /** NEEDS ADDING document.cookie = "lead_id="+id; TO File/App file in UKM/NFC
  *LeadCookie
  *if (document.getElementById('lead_id')) {
  *  document.cookie = "lead_id="+document.getElementById('lead_id').value;
  *}
  *LeadCookie
  **/
});
