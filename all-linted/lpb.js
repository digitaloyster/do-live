/**
 * All Landing Pages Before Body CDN-v1.0
 */

/**
  * Variables
  */
let settings;
settings.cake_offer_id =
  (document.cdnParameters.cake_offer_id !== undefined) ?
  document.cdnParameters.cake_offer_id :
  false;
settings.cake_lp_event_id =
  (document.cdnParameters.cake_lp_event_id !== undefined) ?
  document.cdnParameters.cake_lp_event_id :
  false;
settings.lp_tracking_prefix =
  (document.cdnParameters.lp_tracking_prefix !== undefined) ?
  document.cdnParameters.lp_tracking_prefix :
  false;
settings.hide_elements =
  (document.cdnParameters.hide_elements !== undefined) ?
  document.cdnParameters.hide_elements :
  false;
settings.hide_elements_affs =
  (document.cdnParameters.hide_elements_affs !== undefined) ?
  document.cdnParameters.hide_elements_affs :
  false;
settings.smooth_scroll =
  (document.cdnParameters.smooth_scroll !== undefined) ?
  document.cdnParameters.smooth_scroll :
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
function getUrlParameter(sParam) {
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
function setCKMCookie(id) {
  let cookie = 'ckm_request_id=; ';
  cookie += 'expires=Thu, 01 Jan 1970 00:00:00 UTC; ';
  cookie += 'path=/;';
  document.cookie = cookie;
  document.cookie = 'ckm_request_id=' + id + ';path=/;';
}


$( document ).ready(function() {
  /**
   * Add submit class to submit buttons
   */
  $('form + .lp-pom-button').addClass('submit');


  /**
   * Taboola Remove Elements
   */
  if (settings.hide_elements != '' && settings.hide_elements &&
    settings.hide_elements_affs != '' && settings.hide_elements_affs) {
    const idstring = settings.hide_elements;
    const affString = settings.hide_elements_affs;
    const aff = affString.split(',');
    if (affString != '') {
      for (j in aff) {
        if (getUrlParameter('aff') == aff[j]) {
          if (idstring != '') {
            const ids = idstring.split(',');
            for (i in ids) {
              if (Object.prototype.hasOwnProperty.call(foo, key)) {
                $(ids[i]).remove();
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
  if (settings.smooth_scroll == 'Y' && settings.smooth_scroll) {
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
  if (settings.cake_offer_id != '' && settings.cake_offer_id &&
   settings.cake_lp_event_id != '' && settings.cake_lp_event_id &&
   settings.lp_tracking_prefix != '' && settings.lp_tracking_prefix) {
    const image = new Image(1, 1);
    let variant;
    if (typeof window.ub !== 'undefined') variant = window.ub.page.variantId;
    else variant = '';
    image.src = 'https://digitaloyster.jrnytag.com/p.ashx?o='+settings.cake_offer_id+'&e='+settings.cake_lp_event_id+'&f=img&r=' + getUrlParameter('ckm_request_id') + '&t='+settings.lp_tracking_prefix+'-'+ variant + '|' + window.outerWidth + 'x' + window.outerHeight + '|' + getUrlParameter('link_click');
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
  if (getUrlParameter('ckm_request_id')) {
    setCKMCookie(getUrlParameter('ckm_request_id'));
  } else if (document.getElementById('ckm_request_id') &&
   document.getElementById('ckm_request_id').value !== '') {
    setCKMCookie(document.getElementById('ckm_request_id').value);
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
