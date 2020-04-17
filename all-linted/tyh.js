/**
 * All Thank You Pages Header CDN-v1.0
 * Change: Linted ESLint Google
 */

let settings;

settings.OB_pixel_ids =
(document.cdnParameters.OB_pixel_ids !== undefined) ?
    document.cdnParameters.OB_pixel_ids :
    false;
settings.TB_pixel_ids =
(document.cdnParameters.TB_pixel_ids !== undefined) ?
    document.cdnParameters.TB_pixel_ids :
    false;


/**
 * CSS CDN FILE
 */
const cdnURL = '//cdn.jsdelivr.net/gh/digitaloyster/do-live/all/';
const styles=document.createElement('link');
styles.setAttribute('rel', 'stylesheet');
styles.setAttribute('type', 'text/css');
styles.setAttribute('href', cdnURL+'ty.css');
document.getElementsByTagName('head')[0].appendChild(styles);


/**
 * Outbrain Pixels
 */
if (settings.OB_pixel_ids != '' && settings.OB_pixel_ids) {
  const idstring = settings.OB_pixel_ids;
  if (idstring != '') {
    const ids = idstring.split(',');
    for (i in ids) {
      if (Object.prototype.hasOwnProperty.call(foo, key)) {
        !function(_window, _document) {
          const OB_ADV_ID=ids[i];
          if (_window.obApi) {
            const toArray = function(object) {
              return Object.prototype.toString.call(object) === '[object Array]' ?
              object :
              [object];
            };
            _window.obApi.marketerId = toArray(_window.obApi.marketerId).concat(toArray(OB_ADV_ID));
            return;
          }
          const api = _window.obApi = function() {
            api.dispatch ?
              api.dispatch.apply(api, arguments) :
              api.queue.push(arguments);
          };
          api.version = '1.1';
          api.loaded = true;
          api.marketerId = OB_ADV_ID;
          api.queue = [];
          const tag = _document.createElement('script');
          tag.async = true;
          tag.src = '//amplify.outbrain.com/cp/obtp.js';
          tag.type = 'text/javascript';
          const script = _document.getElementsByTagName('script')[0];
          script.parentNode.insertBefore(tag, script);
        }(window, document);
        obApi('track', 'PAGE_VIEW');
      }
    }
  }
}


/**
 * Taboola Pixels
 */
if (settings.TB_pixel_ids != '' && settings.TB_pixel_ids) {
  const idstring = settings.TB_pixel_ids;
  if (idstring != '') {
    const ids = idstring.split(',');
    for (i in ids) {
      if (Object.prototype.hasOwnProperty.call(foo, key)) {
        window._tfa = window._tfa || [];
        window._tfa.push({notify: 'event', name: 'page_view', id: ids[i]});
        !function(t, f, a, x) {
          if (!document.getElementById(x)) {
            t.async = 1; t.src = a; t.id=x; f.parentNode.insertBefore(t, f);
          }
        }(document.createElement('script'),
            document.getElementsByTagName('script')[0],
            '//cdn.taboola.com/libtrc/unip/'+ids[i]+'/tfa.js',
            'tb_tfa_script');
      }
    }
  }
}
