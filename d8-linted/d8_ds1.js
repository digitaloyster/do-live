/** add another input for this ds1, called address_search
* postcode input then needs its label to be hidden and
* address_search need its label to be 'Postcode'
* both fields are required
**/
window.onload = function() {
  const pcSwitchS = '<style id="postcode-switch">';
  const pcSwitch1 = '#container_postcode .error-message {display:';
  const pcSwitch2 = ' !important;}';
  const pcSwitchE = '</style>';
  $('body').after(pcSwitchS + pcSwitch1 + 'none' +pcSwitch2 + pcSwitchE);
  $('#address_search').change(function() {
    if ($('#address_search').val() != '' && $('#postcode').val() == '') {
      $('#container_address_search .error-message').remove();
      $('#postcode-switch').text(pcSwitch1 + 'block' + pcSwitch2);
    } else {
      $('#postcode-switch').text(pcSwitch1 + 'none' + pcSwitch2);
    }
  });
  $( '#address_search' ).after( '<div id="address"></div> ');
  const txt = document.getElementById('address_search');
  new data8.predictiveaddressui(txt, {
    ajaxKey: 'TJYU-SWL8-DN53-XQF4',
    fields: [
      {element: 'add1', field: 'line1'},
      {element: 'add2', field: 'line2'},
      {element: 'add3', field: 'line3'},
      {element: 'add4', field: 'town'},
      {element: 'add5', field: 'county'},
      {element: 'postcode', field: 'postcode'},
    ],
    allowedCountries: ['GB'],
    selectAddress: function(pa, results) {
      $('#label_address_search').hide();
      $('#address_search').val( pa.Address.Lines[5] ).hide();
      const thisAdd = pa.Address.Lines.filter( function( x ) {
        if ( x != '') {
          return x;
        }
      });
      $('#address').html( thisAdd.join('<br/>') );
      $('#address').after('<button id=\'address-edit\'>&#9998;</button>');
      $('.error-message').remove();
    },
    showResults: function( pa, results ) {
      if (!results.Count) {
        $('#' + pa.elements.textbox.id )
            .parent().find('.error-message').remove();
        $('#container_postcode').find('.error-message').remove();
        const pcLbl = '<label for=\'address_search\'';
        pcLbl += 'generated=\'true\' class=\'error-message\' style=\'\'>';
        pcLbl += 'Please enter a valid address or postcode</label>';
        $('#address_search').addClass('error')
            .after(pcLbl);
        return true;
      } else {
        $('.error-message').remove();
      }
    },
  });
};
