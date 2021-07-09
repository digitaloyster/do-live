/*
const searchContext = '';
const key = 'DR57-GA39-BW92-AA78';
*/
const searchField = '#address_search';
/*
const postcode = '#postcode';
const add1 = '#add1';
const add2 = '#add2';
const add3 = '#add3';
const add4 = '#add4';
const add5 = '#add5';
*/
const extraHTML = '<button id="start-search">SEARCH ADDRESS</button>'+
'<br /><div id="address"></div>';
$('#address_search').attr('autocomplete', 'postal-code');
$(searchField).after(extraHTML);
invalidPC(false);
$('#start-search').on('click', function(e) {
  e.preventDefault();
  invalidPC(false);
  if ($(searchField).val() != '') {
    $('#address-select').empty().remove();
    $('#address').empty();
    const i = '';
    const e = JSON.stringify({
      licence: 'WebClickFull',
      postcode: $(searchField).val(),
      building: '',
      options: {
        MaxLines: 5,
        FixTownCounty: true,
        Formatter: 'DefaultFormatter',
        IncludeNYB: 'false',
        IncludeMR: 'false',
        ApplicationName: 'address.js',
      },
    });
    const t = 'https://webservices.data-8.co.uk/AddressCapture/GetFullAddress.json?key=TJYU-SWL8-DN53-XQF4';
    i = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject('Microsoft.XMLHTTP');
    const n = !1;
    // const d = t.split('/')[4].replace('.json', '');
    i.onreadystatechange = function() {
      if (4 == i.readyState) {
        if (200 == i.status) {
          let t = JSON.parse(i.responseText);
          if ( t.Status.Success === false ) {
            invalidPC( true, t.Status.ErrorMessage ); return;
          }
          $('#address-select').empty().remove();
          let radios = '<div id=\'address-select\'>'+
          '<span>Please select your address:</span><ul>';
          t = t.Results;
          for ( let add = 0; add < t.length; add++) {
            let address = t[add].Address.Lines;
            address = address.filter( function( x ) {
              if ( x != '') {
                return x;
              }
            });
            address = address.join(', ');
            radios += '<li class="li_add" name="address-select">' +
             address + '</li>';
          }
          radios += '</ul></div>';
          $('#start-search').after(radios);
          $(document).on('click', '[name="address-select"]', function() {
            $('#address-edit').remove();
            $('#address-select').hide();
            $('#address_search').hide();
            $('#start-search').hide();
            const addArr = this.innerHTML.split(',');
            for ( let i = 0; i < addArr.length; i++ ) {
              if ( i !== add_arr.length -1 ) {
                $('#add' + ( i + 1 ) ).val( add_arr[i] );
              } else {
                $('#postcode').val( add_arr[i] );
              }
            }

            const address = this.innerHTML
                .replace(new RegExp(',', 'g'), '<br/>');
            $('#address').html( address );
            $('#address').after('<button id=\'address-edit\'>&#9998;</button>');
            $('.error-message').remove();
          });
        } else {
          console.log( i );
          invalidPC(true);
        }
      }
    }
    ,
    i.open('POST', t, !0),
    n && i.setRequestHeader('Authorization', 'Bearer ' + this.options.jwt),
    i.send(e);
  } else {
    invalidPC( true );
  }
});

const invalidPC = function(state, m ) {
  $('.error-message').remove();
  if (state) {
    $(searchField).addClass('error');
    let errorTxt = 'Postcode is required for address lookup.';
    if (m !== undefined) {
      errorTxt = m;
    }
    document.getElementById('postcode')
        .insertAdjacentHTML('afterend', '<div class="error-message">' +
    errorTxt + '</div>');
  } else {
    $(searchField).removeClass('error').css('border-color', 'black');
  }
};
