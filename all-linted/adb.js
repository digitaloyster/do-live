/**
 * All Advertorials Before Body CDN-v1.3
 * Change : Linted to ESLint Google
 */
const adb={};
/**
 * getParameterByName - Link Builder (Doc Ready)
 *
 * @param  {string} name Specify the Get Variable you need
 * @return {string}      Value of the specific Get Variable
 */
adb.getParameterByName = function(name) {
  'use strict';
  name = name.replace(/[\[\]]/g, '\\$&');
  const url = window.location.href;
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * setURLRef - Update URLS
 *
 * @param  {string} lpURL Base URL to use
 */
adb.setURLRef = function(lpURL) {
  'use strict';
  const separator = '&';
  const urls = $('[href^="' + lpURL + '"]');

  $.each(urls, function(i, val) {
    i = i + 1;
    let href = $(val).attr('href');
    href += separator + 'link_click=' + i;
    $(val).attr('href', href);
  });
};

$(document).ready(function() {
  'use strict';
  adb.settings = document.cdnParameters;
  adb.pid = '';
  adb.url;
  adb.advPixel;
  adb.tenPixel;
  adb.boxToAppend;// ,
  // boxParent;

  /**
   * Settings Checks
   */
  adb.settings.adv_replace_urls_to =
  (adb.settings.adv_replace_urls_to !== undefined) ?
        adb.settings.adv_replace_urls_to :
        false;
  adb.settings.adv_not_replace_url_on =
  (adb.settings.adv_not_replace_url_on !== undefined) ?
        adb.settings.adv_not_replace_url_on :
        false;
  adb.settings.cake_offer_id =
  (adb.settings.cake_offer_id !== undefined) ?
        adb.settings.cake_offer_id :
        false;
  adb.settings.cake_adv_event_id =
  (adb.settings.cake_adv_event_id !== undefined) ?
        adb.settings.cake_adv_event_id :
        false;
  adb.settings.cake_10s_event_id =
  (adb.settings.cake_10s_event_id !== undefined) ?
        adb.settings.cake_10s_event_id :
        false;
  adb.settings.adv_tracking_prefix =
  (adb.settings.adv_tracking_prefix !== undefined) ?
        adb.settings.adv_tracking_prefix :
        false;
  adb.settings.scrolling_banner_box_id =
  (adb.settings.scrolling_banner_box_id !== undefined) ?
        adb.settings.scrolling_banner_box_id :
        false;
  adb.settings.TB_widget =
  (adb.settings.TB_widget !== undefined) ?
        adb.settings.TB_widget :
        false;

  /**
   *   Get Facebook Pixel ID
   */
  if (adb.getParameterByName('pid') !== '' &&
  typeof adb.getParameterByName('pid') === 'string') {
    pid = '&pid=' + adb.getParameterByName('pid');
  }

  /**
   *  replace URL
   */
  if (adb.settings.adv_replace_urls_to !== '' &&
    adb.settings.adv_replace_urls_to &&
    adb.settings.adv_not_replace_url_on !== '' &&
    adb.settings.adv_not_replace_url_on) {
    let url = adb.settings.adv_replace_urls_to;
    if (url.indexOf('?') !== -1) {
      url += '&ckm_request_id=';
    } else {
      url += '?ckm_request_id=';
    }
    url += adb.getParameterByName('ckm_request_id');
    url += '&aff=' + adb.getParameterByName('aff');
    url += pid;
    let a = 'a:not(#link-no-replace, #ubpoverlay-close,';
    a += adb.settings.adv_not_replace_url_on + ' )';
    $(a).attr('href', url);
    $('area').attr('href', url);
  }

  /**
   * ADV Replace URLS
   */
  if (adb.settings.adv_replace_urls_to !== '' && adb.settings.adv_replace_urls_to) {
    adb.setURLRef(adb.settings.adv_replace_urls_to);
  }

  /**
   * Adv pixel
   */
  if (adb.settings.cake_offer_id !== '' &&
        adb.settings.cake_offer_id &&
        adb.settings.cake_adv_event_id !== '' &&
        adb.settings.cake_adv_event_id &&
        adb.settings.adv_tracking_prefix !== '' &&
        adb.settings.adv_tracking_prefix) {
    adb.advPixel = new Image(1, 1);
    adb.advPixel.src = 'https://digitaloyster.jrnytag.com/p.ashx?o=' + adb.settings.cake_offer_id + '&e=' + adb.settings.cake_adv_event_id + '&f=img&r=' + adb.getParameterByName('ckm_request_id') + '&t=' + adb.settings.adv_tracking_prefix + '-' + window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight;
  }

  /**
   * 10sec pixel
   */
  if (adb.settings.cake_offer_id !== '' &&
  adb.settings.cake_offer_id &&
  adb.settings.cake_10s_event_id !== '' &&
  adb.settings.cake_10s_event_id) {
    setTimeout(function() {
      adb.tenPixel = new Image(1, 1);
      adb.tenPixel.src = 'https://digitaloyster.jrnytag.com/p.ashx?o=' + adb.settings.cake_offer_id + '&e=' + adb.settings.cake_10s_event_id + '&f=img&r=' + adb.getParameterByName('ckm_request_id');
    }, 10000);
  }


  /**
   * Fixed Header v1.
   */
  if (adb.settings.scrolling_banner_box_id !== '' &&
      adb.settings.scrolling_banner_box_id) {
    boxToAppend = adb.settings.scrolling_banner_box_id;
    if (boxToAppend !== '') {
      // boxParent = $(boxToAppend).parent();
      $(boxToAppend).css({
        'position': 'fixed',
        'left': 'auto',
        'top': '200 px',
        'width': '280px',
        'z-index': '999',
        'border-style': 'none none none none',
        'border-width': '0px',
        'background': 'none',
      });
    }
  }

  /**
   * Taboola Widgets
   */
  if (adb.settings.TB_widget === 'Y' && adb.settings.TB_widget) {
    window._taboola = window._taboola || [];
    _taboola.push({flush: true});
  }
});
