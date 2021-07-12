// All Advertorials Before Body CDN-v2

// Link Builder (Doc Ready)
const replaceURL = function() {
  // replace URL
  if (document.cdnParameters.adv_replace_urls_to != '' &&
      typeof document.cdnParameters.adv_replace_urls_to !== 'undefined' &&
      document.cdnParameters.adv_not_replace_url_on != '' &&
      typeof document.cdnParameters.adv_not_replace_url_on !== 'undefined') {
    let url = document.cdnParameters.adv_replace_urls_to;
    if (url.indexOf('?') !== -1) {
      url += '&' + pid;
    } else {
      url += '?' + pid;
    }
    $('a:not(#link-no-replace, #ubpoverlay-close,' +
      document.cdnParameters.adv_not_replace_url_on +
      ' )').attr('href', url);
    $('area').attr('href', url);
  }
  // replace URL
  //
  // ADV Replace URLS
  if (document.cdnParameters.adv_replace_urls_to != '' &&
      typeof document.cdnParameters.adv_replace_urls_to !== 'undefined') {
    (function setURLRef(lpURL) {
      const separator = '&';
      const urls = $('[href^="' + lpURL + '"]');

      $.each(urls, function(i, val) {
        i++;
        const href = $(val).attr('href');
        href += separator + 'link_click=' + i;
        $(val).attr('href', href);
      });
    })(document.cdnParameters.adv_replace_urls_to);
  }
  // ADV Replace URLS
};

const postCKM = function() {
  // replace URL
  if (document.cdnParameters.adv_replace_urls_to != '' &&
   typeof document.cdnParameters.adv_replace_urls_to !== 'undefined' &&
   document.cdnParameters.adv_not_replace_url_on != '' &&
   typeof document.cdnParameters.adv_not_replace_url_on !== 'undefined') {
    const url = document.cdnParameters.adv_replace_urls_to;
    if (url.indexOf('?') !== -1) {
      url += '&ckm_request_id=' + ckm_request_id + '&aff=' + affiliate + pid;
    } else {
      url += '?ckm_request_id=' + ckm_request_id + '&aff=' + affiliate + pid;
    }
    $('a:not(#link-no-replace, #ubpoverlay-close,' +
      document.cdnParameters.adv_not_replace_url_on +
      ' )').attr('href', url);
    $('area').attr('href', url);
  }
  // replace URL
  //
  // ADV Replace URLS
  if (document.cdnParameters.adv_replace_urls_to != '' &&
   typeof document.cdnParameters.adv_replace_urls_to !== 'undefined') {
    (function setURLRef(lpURL) {
      const separator = '&';
      const urls = $('[href^="' + lpURL + '"]');

      $.each(urls, function(i, val) {
        i++;
        let href = $(val).attr('href');
        href += separator + 'link_click=' + i;
        $(val).attr('href', href);
      });
    })(document.cdnParameters.adv_replace_urls_to);
  }
  // ADV Replace URLS

  // Adv pixel
  if (document.cdnParameters.cake_offer_id != '' &&
   typeof document.cdnParameters.cake_offer_id !== 'undefined' &&
   document.cdnParameters.cake_adv_event_id != '' &&
   typeof document.cdnParameters.cake_adv_event_id !== 'undefined' &&
   document.cdnParameters.adv_tracking_prefix != '' &&
   typeof document.cdnParameters.adv_tracking_prefix !== 'undefined') {
    const ifrm = document.createElement('iframe');
    const s = 'https://secureoyster.com/p.ashx?o=' +
    document.cdnParameters.cake_offer_id +
    '&e=' +
    document.cdnParameters.cake_adv_event_id +
    '&f=img&r=' +
    ckm_request_id +
    '&t=' +
    document.cdnParameters.adv_tracking_prefix +
    '-' +
    window.ub.page.variantId +
    '|' +
    window.outerWidth +
    'x' +
    window.outerHeight;
    ifrm.setAttribute('src', s);
    ifrm.style.width = '1';
    ifrm.style.height = '1';
    ifrm.style.frameborder = '0';
    document.body.appendChild(ifrm);
    if (d) console.log('Adv Pixel Fired: ' + s);
  }
  // Adv Pixel

  // 10sec pixel
  if (document.cdnParameters.cake_offer_id != '' &&
   typeof document.cdnParameters.cake_offer_id !== 'undefined' &&
   document.cdnParameters.cake_10s_event_id != '' &&
   typeof document.cdnParameters.cake_10s_event_id !== 'undefined') {
    setTimeout(function() {
      const ifrm = document.createElement('iframe');
      const s = 'https://secureoyster.com/p.ashx?o=' +
       document.cdnParameters.cake_offer_id +
       '&e=' +
       document.cdnParameters.cake_10s_event_id +
       '&f=img&r=' +
       ckm_request_id;
      ifrm.setAttribute('src', s);
      ifrm.style.width = '1';
      ifrm.style.height = '1';
      ifrm.style.frameborder = '0';
      document.body.appendChild(ifrm);
      if (d) console.log('10sec Pixel Fired: ' + s);
    }, 10000);
  }
  // 10sec pixel
};

$(document).ready(function() {
  pid = '';
  if (getParameterByName('pid') != '' &&
   typeof getParameterByName('pid') === 'string') {
    pid = '&pid=' + getParameterByName('pid');
  }

  // let ckm_request_id, affiliate;

  if (getParameterByName('ckm_request_id') != '' &&
  typeof getParameterByName('ckm_request_id') === 'string') {
    ckm_request_id = getParameterByName('ckm_request_id');
    affiliate = getParameterByName('aff');
    postCKM();
  } else if (getParameterByName('a') != '' &&
   typeof getParameterByName('a') === 'string' &&
   getParameterByName('c') != '' &&
    typeof getParameterByName('c') === 'string') {
    const clickpixel = 'https://digitaloyster.jrnytag.com/' +
     location.search +
      '&cp=js';

    affiliate = getParameterByName('a');
    $.getScript(clickpixel, function() {
      postCKM();
    });
  } else {
    replaceURL();
  }

  // Fixed Header v1.
  if (document.cdnParameters.scrolling_banner_box_id != '' &&
   typeof document.cdnParameters.scrolling_banner_box_id !== 'undefined') {
    const boxToAppend = document.cdnParameters.scrolling_banner_box_id;
    if (boxToAppend != '') {
      $(boxToAppend).css({
        'position': 'fixed',
        'left': 'auto',
        'top': '200px',
        'width': '280px',
        'z-index': '999',
        'border-style': 'none none none none',
        'border-width': '0px',
        'background': 'none',
      });
    }
  }
  // Fixed Header v1.
  //
  // Taboola Widgets
  if (document.cdnParameters.TB_widget == 'Y' &&
   typeof document.cdnParameters.TB_widget !== 'undefined') {
    window._taboola = window._taboola || [];
    _taboola.push({
      flush: true,
    });
  }
  // Taboola Widgets
});
