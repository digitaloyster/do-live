/**
 * Combination Page V1.3 - Including Advertorial steps
 * Change: Linted ESLint Google
 */
const cob = {};

/**
 * getParameterByName - Get URL Variables
 *
 * @param  {string} name Url Get variable
 * @return {string}      Get Variable Value
 */
cob.getParameterByName = function(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

$(document).ready(function() {
  cob.settings = document.cdnParameters;
  cob.pixel = {};

  cob.settings.adv_replace_urls_to =
  (cob.settings.adv_replace_urls_to !== undefined) ?
        cob.settings.adv_replace_urls_to :
        false;
  cob.settings.adv_not_replace_url_on =
  (cob.settings.adv_not_replace_url_on !== undefined) ?
        cob.settings.adv_not_replace_url_on :
        false;
  cob.settings.cake_offer_id =
  (cob.settings.cake_offer_id !== undefined) ?
        cob.settings.cake_offer_id :
        false;
  cob.settings.cake_adv_event_id =
  (cob.settings.cake_adv_event_id !== undefined) ?
        cob.settings.cake_adv_event_id :
        false;
  cob.settings.cake_10s_event_id =
  (cob.settings.cake_10s_event_id !== undefined) ?
        cob.settings.cake_10s_event_id :
        false;
  cob.settings.adv_tracking_prefix =
  (cob.settings.lp_tracking_prefix !== undefined) ?
        cob.settings.lp_tracking_prefix :
        false;
  /**
  * Adv pixel
  */
  if (cob.settings.cake_offer_id != '' && cob.settings.cake_offer_id &&
      cob.settings.cake_adv_event_id != '' && cob.settings.cake_adv_event_id &&
      cob.settings.lp_tracking_prefix != '' && cob.settings.lp_tracking_prefix) {
    cob.pixel.adv = new Image(1, 1);
    cob.pixel.adv.src = 'https://digitaloyster.jrnytag.com/p.ashx?o='+cob.settings.cake_offer_id+'&e='+cob.settings.cake_adv_event_id+'&f=img&r=' + cob.getParameterByName('ckm_request_id') + '&t='+cob.settings.lp_tracking_prefix+'-' + window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight;
  }

  /**
  * 10sec pixel
  */
  if (cob.settings.cake_offer_id != '' && cob.settings.cake_offer_id &&
   cob.settings.cake_10s_event_id != '' && cob.settings.cake_10s_event_id) {
    setTimeout(function() {
      cob.pixel.ten = new Image(1, 1);
      cob.pixel.ten.src = 'https://digitaloyster.jrnytag.com/p.ashx?o='+cob.settings.cake_offer_id+'&e='+cob.settings.cake_10s_event_id+'&f=img&r=' + cob.getParameterByName('ckm_request_id');
    }, 10000);
  }
});
