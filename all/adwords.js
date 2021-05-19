
let awid = "AW-700477036";
let awcid = "4VokCK7C_7ABEOzcgc4C";
let domains = ['articles.lifeplanningadvisor.co.uk','articles.moneyadviceclub.co.uk','articles.musthavemoneytips.co.uk','lp.peaceofmindfunerals.co.uk'];

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
  sURLVariables = sPageURL.split('&'),
  sParameterName,
  i;
  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

if (getUrlParameter('awid') != '' && typeof getUrlParameter('awid') !== 'undefined' && getUrlParameter('awcid') != '' && typeof getUrlParameter('awcid') !== 'undefined') {
  awid = getURLParameter("awid");
  awcid = getURLParameter("awcid");
}

  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://www.googletagmanager.com/gtag/js?id='+awid;
  head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('set', 'linker', {'domains': domains, 'url_position': 'fragment'});
  gtag('js', new Date());
  gtag('config', awid);
  gtag('event', 'conversion', {'send_to': awid+'/'+awcid});
