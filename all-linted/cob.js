/**
 * Combination Page V1.3 - Including Advertorial steps
 * Change: Linted ESLint Google
 */


/**
 * getParameterByName - Get URL Variables
 *
 * @param  {string} name Url Get variable
 * @return {string}      Get Variable Value
 */
function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function() {
  let advPixel;
  let tenPixel;
  let settings;

  settings.adv_replace_urls_to =
  (document.cdnParameters.adv_replace_urls_to !== undefined) ?
        document.cdnParameters.adv_replace_urls_to :
        false;
  settings.adv_not_replace_url_on =
  (document.cdnParameters.adv_not_replace_url_on !== undefined) ?
        document.cdnParameters.adv_not_replace_url_on :
        false;
  settings.cake_offer_id =
  (document.cdnParameters.cake_offer_id !== undefined) ?
        document.cdnParameters.cake_offer_id :
        false;
  settings.cake_adv_event_id =
  (document.cdnParameters.cake_adv_event_id !== undefined) ?
        document.cdnParameters.cake_adv_event_id :
        false;
  settings.cake_10s_event_id =
  (document.cdnParameters.cake_10s_event_id !== undefined) ?
        document.cdnParameters.cake_10s_event_id :
        false;
  settings.adv_tracking_prefix =
  (document.cdnParameters.lp_tracking_prefix !== undefined) ?
        document.cdnParameters.lp_tracking_prefix :
        false;
  /**
  * Adv pixel
  */
  if (settings.cake_offer_id != '' && settings.cake_offer_id &&
      settings.cake_adv_event_id != '' && settings.cake_adv_event_id &&
      settings.lp_tracking_prefix != '' && settings.lp_tracking_prefix) {
    advPixel = new Image(1, 1);
    advPixel.src = 'https://digitaloyster.jrnytag.com/p.ashx?o='+settings.cake_offer_id+'&e='+settings.cake_adv_event_id+'&f=img&r=' + getParameterByName('ckm_request_id') + '&t='+settings.lp_tracking_prefix+'-' + window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight;
  }

  /**
  * 10sec pixel
  */
  if (settings.cake_offer_id != '' && settings.cake_offer_id &&
   settings.cake_10s_event_id != '' && settings.cake_10s_event_id) {
    setTimeout(function() {
      tenPixel = new Image(1, 1);
      tenPixel.src = 'https://digitaloyster.jrnytag.com/p.ashx?o='+settings.cake_offer_id+'&e='+settings.cake_10s_event_id+'&f=img&r=' + getParameterByName('ckm_request_id');
    }, 10000);
  }
});
