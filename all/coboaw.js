function getParameterByName(name) {
  var url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}



var postCKM = function() {

  // Adv pixel
  if (document.cdnParameters.cake_offer_id != '' && typeof document.cdnParameters.cake_offer_id !== 'undefined' && document.cdnParameters.cake_adv_event_id != '' && typeof document.cdnParameters.cake_adv_event_id !== 'undefined' && document.cdnParameters.adv_tracking_prefix != '' && typeof document.cdnParameters.adv_tracking_prefix !== 'undefined') { //REVIEW: Add check for cake_offer_id AND cake_adv_event_id AND adv_tracking_prefix
    var image = new Image(1, 1);
    image.src = "https://secureoyster.com/p.ashx?o=" + document.cdnParameters.cake_offer_id + "&e=" + document.cdnParameters.cake_adv_event_id + "&f=img&r=" + ckm_request_id + '&t=' + document.cdnParameters.adv_tracking_prefix + '-' + window.ub.page.variantId + '|' + window.outerWidth + 'x' + window.outerHeight;
  }
  // Adv Pixel

  // 10sec pixel
  if (document.cdnParameters.cake_offer_id != '' && typeof document.cdnParameters.cake_offer_id !== 'undefined' && document.cdnParameters.cake_10s_event_id != '' && typeof document.cdnParameters.cake_10s_event_id !== 'undefined') { //REVIEW: Add check for cake_offer_id AND cake_10s_event_id
    setTimeout(function() {
      var image = new Image(1, 1);
      image.src = "https://secureoyster.com/p.ashx?o=" + document.cdnParameters.cake_offer_id + "&e=" + document.cdnParameters.cake_10s_event_id + "&f=img&r=" + ckm_request_id;
    }, 10000);
  }
  // 10sec pixel
};



$(document).ready(function(){

  pid = '';
  if (getParameterByName('pid') != '' && typeof getParameterByName('pid') === 'string') {
    pid = '&pid=' + getParameterByName('pid');
  }

  //let ckm_request_id, affiliate;

  if (getParameterByName('ckm_request_id') != '' && typeof getParameterByName('ckm_request_id') === 'string') {
    ckm_request_id = getParameterByName('ckm_request_id');
    affiliate = getParameterByName('aff');
    postCKM();

  } else if (getParameterByName('a') != '' && typeof getParameterByName('a') === 'string' && getParameterByName('c') != '' && typeof getParameterByName('c') === 'string') {
    // <script type="text/javascript" src="https://digitaloyster.jrnytag.com/?a=23&c=13&cp=js&s1=TEST"></script>
    let clickpixel = 'https://digitaloyster.jrnytag.com/' + location.search + '&cp=js';
    affiliate = getParameterByName('a');
    //$('head').append(clickpixel);
    //eval($('#clickpixel').text());
    $.getScript(clickpixel, function() {
      postCKM();
    });
    // ckm_request_id generated by the above script.
  } else {
    //replaceURL();
  }
});
