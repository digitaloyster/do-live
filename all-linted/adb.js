/**
 * All Advertorials Before Body CDN-v1.3
 * Change : Linted to ESLint Google
 */

/**
 * getParameterByName - Link Builder (Doc Ready)
 *
 * @param  {string} name Specify the Get Variable you need
 * @return {string}      Value of the specific Get Variable
 */
function getParameterByName(name) {
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
}

/**
 * setURLRef - Update URLS
 *
 * @param  {string} lpURL Base URL to use
 */
function setURLRef(lpURL) {
  'use strict';
  const separator = '&';
  const urls = $('[href^="' + lpURL + '"]');

  $.each(urls, function(i, val) {
    i = i + 1;
    let href = $(val).attr('href');
    href += separator + 'link_click=' + i;
    $(val).attr('href', href);
  });
}

$(document).ready(function() {
  'use strict';
  let settings;
  let pid = '';
  let url;
  let advPixel;
  let tenPixel;
  let boxToAppend;// ,
  // boxParent;

  /**
   * Settings Checks
   */
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
  (document.cdnParameters.adv_tracking_prefix !== undefined) ?
        document.cdnParameters.adv_tracking_prefix :
        false;
  settings.scrolling_banner_box_id =
  (document.cdnParameters.scrolling_banner_box_id !== undefined) ?
        document.cdnParameters.scrolling_banner_box_id :
        false;
  settings.TB_widget = (document.cdnParameters.TB_widget !== undefined) ?
        document.cdnParameters.TB_widget :
        false;

  /**
   *   Get Facebook Pixel ID
   */
  if (getParameterByName('pid') !== '' &&
  typeof getParameterByName('pid') === 'string') {
    pid = '&pid=' + getParameterByName('pid');
  }

  /**
   *  replace URL
   */
  if (settings.adv_replace_urls_to !== '' &&
    settings.adv_replace_urls_to &&
    settings.adv_not_replace_url_on !== '' &&
    settings.adv_not_replace_url_on) {
    url = settings.adv_replace_urls_to;
    if (url.indexOf('?') !== -1) {
      url += '&ckm_request_id=';
    } else {
      url += '?ckm_request_id=';
    }
    url += getParameterByName('ckm_request_id');
    url += '&aff=' + getParameterByName('aff');
    url += pid;
    let a = 'a:not(#link-no-replace, #ubpoverlay-close,';
    a += settings.adv_not_replace_url_on + ' )';
    $(a).attr('href', url);
    $('area').attr('href', url);
  }

  /**
   * ADV Replace URLS
   */
  if (settings.adv_replace_urls_to !== '' && settings.adv_replace_urls_to) {
    setURLRef(document.cdnParameters.adv_replace_urls_to);
  }

  /**
   * Adv pixel
   */
  if (settings.cake_offer_id !== '' && settings.cake_offer_id &&
        settings.cake_adv_event_id !== '' && settings.cake_adv_event_id &&
        settings.adv_tracking_prefix !== '' && settings.adv_tracking_prefix) {
    advPixel = new Image(1, 1);
    advPixel.src = 'https://digitaloyster.jrnytag.com/p.ashx?o=' + settings.cake_offer_id + '&e=' + settings.cake_adv_event_id + '&f=img&r=' + getParameterByName('ckm_request_id') + '&t=' + settings.adv_tracking_prefix + '-' + window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight;
  }

  /**
   * 10sec pixel
   */
  if (settings.cake_offer_id !== '' &&
  settings.cake_offer_id &&
  settings.cake_10s_event_id !== '' &&
  settings.cake_10s_event_id) {
    setTimeout(function() {
      tenPixel = new Image(1, 1);
      tenPixel.src = 'https://digitaloyster.jrnytag.com/p.ashx?o=' + settings.cake_offer_id + '&e=' + settings.cake_10s_event_id + '&f=img&r=' + getParameterByName('ckm_request_id');
    }, 10000);
  }


  /**
   * Fixed Header v1.
   */
  if (settings.scrolling_banner_box_id !== '' &&
      settings.scrolling_banner_box_id) {
    boxToAppend = settings.scrolling_banner_box_id;
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
  if (settings.TB_widget === 'Y' && settings.TB_widget) {
    window._taboola = window._taboola || [];
    _taboola.push({flush: true});
  }
});
