// <iframe src="https://secureoyster.com/p.ashx?o=43&e=18&t=TRANSACTION_ID" height="1" width="1" frameborder="0"></iframe>
// ifrm.setAttribute("src", "http://google.com/");
// ifrm.style.width = "1";
// ifrm.style.height = "1";

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

  ifrm.setAttribute('width', '1');
  ifrm.setAttribute('height', '1');
  ifrm.setAttribute('frameborder', '0');

  ifrm.style.height = '1';
  ifrm.style.frameborder = '0';
}
