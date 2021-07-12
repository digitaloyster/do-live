// All Pages Scripts Before Body CDN-v2

// Fix Styling Issues
if (typeof window.ub !== 'undefined') {
  window.ub.page.disableTextAdjustments = true;
}

// Add OS as class to body
let OSName = 'unknown';
if (navigator.appVersion.indexOf('Win') != -1) {
  OSName = 'windows';
}
if (navigator.appVersion.indexOf('Mac') != -1) {
  OSName = 'macos';
}
if (navigator.appVersion.indexOf('X11') != -1) {
  OSName = 'unix';
}
if (navigator.appVersion.indexOf('Linux') != -1) {
  OSName = 'linux';
}
document.body.className += ' ' + OSName;

// Facebook Pixels (expects csv of ID)
const setFBPixel = function(ids) {
  console.log(ids);
  for (i in ids) {
    if ({}.hasOwnProperty.call(ids, i)) {
      console.log('FB Pixel:' + ids[i]);
      ! function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', ids[i]);
      fbq('track', 'PageView');
    }
  }
  // Add content event at the beginning of the body element
  const contentEvent = document.createElement('script');
  contentEvent.innerHTML = 'fbq(\'track\', \'ViewContent\');';
  document.body.prepend(contentEvent);
};

if (getParameterByName('pid') != '' &&
 typeof getParameterByName('pid') !== 'undefined') {
  const id = getParameterByName('pid');
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
  )
  setFBPixel(ids);
}

// Facebook Pixels (expects csv of ID)

// Twitter View
if (document.cdnParameters.TW_site_visit_ids != '' &&
 typeof document.cdnParameters.TW_site_visit_ids !== 'undefined') {
  const idstring = document.cdnParameters.TW_site_visit_ids;
  const ids = idstring.split(',');
  for (i in ids) {
    if ({}.hasOwnProperty.call(ids, i)) {
      ! function(e, t, n, s, u, a) {
        e.twq || (s = e.twq = function() {
          s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
        },
        s.version = '1.1',
        s.queue = [],
        u = t.createElement(n),
        u.async = !0,
        u.src = '//static.ads-twitter.com/uwt.js',
        a = t.getElementsByTagName(n)[0],
        a.parentNode.insertBefore(u, a));
      }(window, document, 'script');
      // Insert Twitter Pixel ID and Standard Event data below
      twq('init', ids[i]);
      twq('track', 'PageView');
    }
  }
}
// Twitter View

// Yahoo Pixel
if (document.cdnParameters.YG_pixel_ids != '' &&
 typeof document.cdnParameters.YG_pixel_ids !== 'undefined') {
  const idstring = document.cdnParameters.YG_pixel_ids;
  if (idstring != '') {
    const ids = idstring.split(',');
    for (i in ids) {
      if ({}.hasOwnProperty.call(ids, i)) {
        (function(w, d, t, r, u) {
          w[u] = w[u] || [];
          w[u].push({
            'projectId': '10000',
            'properties': {
              'pixelId': ids[i],
            },
          });
          const s = d.createElement(t);
          s.src = r;
          s.async = true;
          s.onload = s.onreadystatechange = function() {
            let y;
            const rs = this.readyState;
            const c = w[u];
            if (rs && rs != 'complete' && rs != 'loaded') {
              return;
            }
            try {
              y = YAHOO.ywa.I13N.fireBeacon;
              w[u] = [];
              w[u].push = function(p) {
                y([p]);
              };
              y(c);
            } catch (e) {}
          };
          const scr = d.getElementsByTagName(t)[0];
          const par = scr.parentNode;
          par.insertBefore(s, scr);
        })(window, document, 'script', 'https://s.yimg.com/wi/ytc.js', 'dotq');
      }
    }
  }
}
// Yahoo Pixel
