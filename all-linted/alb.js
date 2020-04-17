/**
 * All Pages Scripts Before Body CDN-v1.3
 * Change : Linted to ESLint Google
 */

/**
  * Functions
  */

/**
 * getUrlParameter - description
 *
 * @param  {string} sParam Get Variable
 * @return {string}        Value of Get Variable
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
 * setFBPixel - Setting up Facebook Pixels
 *
 * @param  {string} ids Expects CSV of ID
 */
function setFBPixel(ids) {
  for (i in ids) {
    if (Object.prototype.hasOwnProperty.call(foo, key)) {
      console.log('FB Pixel:' + ids[i]);
      !function(f, b, e, v, n, t, s) {
        if (f.fbq) return; n=f.fbq=function() {
                    n.callMethod?
                    n.callMethod.apply(n, arguments):n.queue.push(arguments);
        };
        if (!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
        n.queue=[]; t=b.createElement(e); t.async=!0;
        t.src=v; s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      }(window, document, 'script',
          'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', ids[i]);
      fbq('track', 'PageView');
    }
  }

  /**
   * Add content event at the beginning of the body element
   */
  const contentEvent = document.createElement('script');
  contentEvent.innerHTML = 'fbq(\'track\', \'ViewContent\');';
  document.body.prepend(contentEvent);
}


/**
 * Fix Styling Issues
 */
if (typeof window.ub !== 'undefined') {
  window.ub.page.disableTextAdjustments = true;
}


/**
 * Add OS as class to body
 */
let OSName='unknown';
if (navigator.appVersion.indexOf('Win')!=-1) OSName='windows';
if (navigator.appVersion.indexOf('Mac')!=-1) OSName='macos';
if (navigator.appVersion.indexOf('X11')!=-1) OSName='unix';
if (navigator.appVersion.indexOf('Linux')!=-1) OSName='linux';
document.body.className += ' ' + OSName;


const pid = getUrlParameter('pid');
if (pid != '' && typeof pid !== 'undefined') {
  const id = getUrlParameter('pid');
  const ids = [];
  if (typeof window.ub.form !== 'undefined') {
    if (window.ub.form.url != '' && typeof window.ub.form.url !== 'undefined') {
      if (window.ub.form.url.indexOf('?') !== -1) {
        window.ub.form.url = window.ub.form.url + '&pid=' + id;
      } else {
        window.ub.form.url = window.ub.form.url + '?pid=' + id;
      }
    }
  }
  ids.push(id);
  setFBPixel(ids);
} else if (document.cdnParameters.FB_pixel_ids != '' &&
 typeof document.cdnParameters.FB_pixel_ids !== 'undefined') {
  const idstring = document.cdnParameters.FB_pixel_ids;
  const ids = idstring.split(',');
  setFBPixel(ids);
}

/**
 * Twitter View
 */
if (document.cdnParameters.TW_site_visit_ids != '' &&
 typeof document.cdnParameters.TW_site_visit_ids !== 'undefined') {
  const idstring = document.cdnParameters.TW_site_visit_ids;
  const ids = idstring.split(',');
  for (i in ids) {
    if (Object.prototype.hasOwnProperty.call(foo, key)) {
      !function(e, t, n, s, u, a) {
        e.twq||(s=e.twq=function() {
            s.exe?s.exe.apply(s, arguments):s.queue.push(arguments);
        },
        s.version='1.1',
        s.queue=[],
        u=t.createElement(n),
        u.async=!0,
        u.src='//static.ads-twitter.com/uwt.js',
        a=t.getElementsByTagName(n)[0],
        a.parentNode.insertBefore(u, a));
      }(window, document, 'script');
      /**
       * Insert Twitter Pixel ID and Standard Event data below
       */
      twq('init', ids[i]);
      twq('track', 'PageView');
    }
  }
}
