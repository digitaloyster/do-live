/**
 * Multi Step Body - Version 1.3
 * (active validation version)
 */

$(document).ready(function() {
  let d = false;
  if (document.cdnParameters.debug_mode === 'Y') {
    d = true;
  }
  if (d) console.log('debug mode');
  init = false;
  let steps = {};
  let settings = {};
  let hooks = {};
  if (document.cdnMultiStep.steps != '') {
    steps = document.cdnMultiStep.steps;
  } else alert('steps not found');
  // var buttons = document.cdnMultiStep.buttons;
  if (document.cdnMultiStep.settings != '') {
    settings = document.cdnMultiStep.settings;
  } else alert('settings not found');

  if (document.cdnMultiStep.hooks != '') {
    hooks = document.cdnMultiStep.hooks;
  } else alert('hooks not found');

  const msb = {};
  /**
   * msb.initialise - Initialise multi step script
   */
  msb.initialise = function() {
    hooks.call('hookPreInit', []); // Hook
    let msBrowser = false;
    let oldIOS = false;
    let loadJqueryUi = false;
    const datePickerOption = {};
    if (/MSIE 10/i.test(navigator.userAgent) ||
        /MSIE 9/i.test(navigator.userAgent) ||
        /rv:11.0/i.test(navigator.userAgent) ||
        /Edge\/\d./i.test(navigator.userAgent)) {
      msBrowser = true;
    }

    const regex = /(\d{1,2})_\d{1,2}/;
    const found = navigator.userAgent.match(regex);
    if (found !== null) {
      if (found[1] < 12 && navigator.userAgent.includes('Mobile')) {
        oldIOS = true;
      }
    }

    $( '#' + settings.nextButton )
        .addClass('button-next');
    $( '#' + settings.nextButton )
        .addClass('button-back');
    $( '.lp-pom-button' ).each(/* @this HTMLElement */ function( ) {
      let mousedown = 0;
      $('#' + this.id).mousedown( function(e) {
        mousedown = 1;
      });
      $('#' + this.id).focus(/* @this HTMLElement */ function(e) {
        if ( !mousedown ) {
          $(this).addClass('focusGlow');
        }
        mousedown = 0;
      });
      $('#' + this.id).blur(/* @this HTMLElement */ function() {
        $(this).removeClass('focusGlow');
      });
      $(this).keypress(/* @this HTMLElement */ function( ev ) {
        ev.preventDefault();
        msb.focusClick(ev, this, 1);
      });
    });
    $.each(steps, function(i, val) {
      const page = [];
      $.each(steps[i].fields, function(k, val) {
        page.push('#container_' + k);
      });
      let insert = '<div id="step-';
      insert += i;
      insert += '" data-id="';
      insert += i;
      insert += '" class="step"></div>';
      if (msb.objSize(page) == 0) {
        $('#step-' + (i - 1)).after(insert);
      } else {
        $(page.join(',')).wrapAll(insert);
      }
    });

    // Add custom aspects
    $.each(steps, function(i, val) {
      if ('fields' in steps[i] && steps[i].fields != '') {
        $.each(steps[i].fields, function(k, val) {
          /**
          * Email Validate
          * if (k==="email_address") {
          *    document.getElementById(k)
          *        .setAttribute(
          *          "pattern",
          * "[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z0-9]{2,}");
          * }
          */

          /**
          * Buttons
          */
          if ('display' in val && val.display == 'buttons') {
            if (!$('#' + k).length) {
              $('[name=\'' + k + '\']').parent().addClass('select-button');
              if (d) console.log($('[name=\'' + k + '\']')[0].type);
              if (objSize(steps[i].fields) === 1 &&
                $('[name=\'' + k + '\']')[0].type !== 'checkbox') {
                $('[name=\'' + k + '\']').parent().addClass('single-field');
              }
              $('[name=\'' + k + '\']')
                  .bind('change', /* @this HTMLElement */ function() {
                    const $update = $(this).parent('div');
                    if ($('[name=\'' + k + '\']')[0].type !== 'checkbox') {
                      $('#container_' + k + ' .selected')
                          .removeClass('selected');
                    }
                    $update.toggleClass('selected');
                    if ($update.hasClass('single-field') &&
                     !msBrowser && !oldIOS) {
                      msb.nextStep();
                    }
                  });
            }
          }

          if ('error' in val && val.error != '') {
            const error = 'this.setCustomValidity(\'' + val.error + '\');';
            const noError = 'this.setCustomValidity(\'\');';
            if ($('#' + i).length) {
              document.getElementById(k).setAttribute('oninvalid', error);
              document.getElementById(k).setAttribute('onchange', noError);
            } else if ($('[name="' + k + '"]').length) {
              const elements = document.getElementsByName(k);
              for (i = 0; i < elements.length; i++) {
                elements[i].setAttribute('oninvalid', error);
                elements[i].setAttribute('onchange', noError);
              }
            }
          }

          if ('numeric' in val && val.numeric == 'Y') {
            const field = document.getElementById(k);
            field.type = 'number';
            field.setAttribute('pattern', '[0-9]*');
          }
          if ('display' in val && val.display == 'datepicker') {
            loadJqueryUi = true;
            datePickerOption[k] = {
              changeYear: true,
              changeMonth: true,
              firstDay: 1,
              dateFormat: 'yy-mm-dd',
              maxDate: '+0',
            };
            datePickerOption[k].yearRange = '-120:+0';
            const field = document.getElementById(k);
            const regex = '[0-9]{4}-(0[1-9]|1[012])';
            regex += '-(0[1-9]|1[0-9]|2[0-9]|3[01])';
            field.setAttribute('pattern', regex);
          }
          if ( 'mask' in val ) {
            $('#' + k).mask( val.mask );
          }
        });
      }
    });

    msb.loadStyleSheet( 'https://cdn.jsdelivr.net/gh/digitaloyster/do-live/ms/ms.css' );
    if ( loadJqueryUi ) {
      msb.loadStyleSheet( 'https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css' );
      msb.loadScript( 'https://code.jquery.com/ui/1.12.0/jquery-ui.min.js', datePickerOption );
    }


    $('form').show();

    hooks.call('hookPageInit', []); // HOOK
  };

  /**
   * msb.LoadStyleSheet - Load stylesheet from URL
   *
   * @param  {string} url url of stylesheet
   */
  msb.loadStyleSheet = function( url ) {
    const styles = document.createElement('link');
    styles.setAttribute('href', url);
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('type', 'text/css');
    document.head.appendChild(styles);
  };

  /**
   * msb.LoadScript - Load Script from URL
   *
   * @param  {script} url    URL of Script to be loaded
   * @param  {script} option ?
   */
  msb.loadScript = function( url, option ) {
    const script = document.createElement('script');
    script.onload = function() {
      for ( const el in option) {
        if (option.hasOwnProperty(el)) {
          $( '#' + el ).datepicker( option[el] );
        }
      }
    };
    script.src = url;
    document.head.appendChild(script);
  };

  /**
   * msb.d8Validate - start d8 validation
   */
  msb.d8Validate = function() {
    if (d) console.log('d8Validate()');
    const msg = 'Please enter a valid telephone number.';
    document.getElementById('telephone').setCustomValidity(msg);
    const event = new Event('d8Validate');
    document.dispatchEvent(event);
  };

  /**
   * msb.isFieldValid - Validate field for Active Validation
   *
   * @param  {string} field Field to be Validated
   * @return {boolean} Validation State
   */
  msb.isFieldValid = function(field) {
    let valid = true;
    if (init) {
      $('#'+field+' .error-message').remove();
      if (d) console.log('firing active validation on '+field);
      const event = new CustomEvent('doError', {detail: {id: field}});
      field = field.trim();
      if ('postcode' in document.cdnParameters &&
       document.cdnParameters.postcode != 'N') {
        if ((field == 'add1' || field == 'postcode') &&
         $('#' + field).val() != '') {
          if (d) console.log('setting add1/PC');
          const poke = new Event('change', {
            bubbles: true,
          });
          document.getElementById(field).dispatchEvent(poke);
          document.getElementById(field).validity['valid'];
        }
      }
      if ($('#' + field).length &&
          !document.getElementById(field).checkValidity()) {
        valid = false;
        if (d) console.log('failed');
      } else if ($('[name="' + field + '"]').length) {
        const ele = document.getElementsByName(field);
        if (!ele[0].checkValidity()) {
          valid = false;
          if (d) console.log('failed');
        }
      }
      document.dispatchEvent(event);
    }
    return valid;
  };

  /**
   * msb.isValid - Run Validation on Form Step
   *
   * @param  {integer} step step to be valdiated
   * @return {boolean} validation state
   */
  msb.isValid = function(step) {
    let valid = true;
    const event = new Event('doErrors');
    $.each(steps[step].fields, function(i, v) {
      i = i.trim();
      /**
       * NOTE: Potentially need a hook for custom validation here.
       * Post i and return true/false.
       */
      if ('postcode' in document.cdnParameters &&
          document.cdnParameters.postcode != 'N') {
        if ((i == 'add1' || i == 'postcode') && $('#' + i).val() != '') {
          if (d) console.log('setting add1/PC');
          const poke = new Event('change', {
            bubbles: true,
          });
          document.getElementById(i).dispatchEvent(poke);
          document.getElementById(i).validity['valid'];
        }
      }
      if ($('#' + i).length && !document.getElementById(i).checkValidity()) {
        valid = false;
        if (d) console.log('failed');
      } else if ($('[name="' + i + '"]').length) {
        const ele = document.getElementsByName(i);
        if (!ele[0].checkValidity()) {
          valid = false;
          if (d) console.log('failed');
        }
      }
    });

    if (!valid) document.dispatchEvent(event);
    return valid;
  };

  /**
   * msb.clearErrors - Clear all errors
   */
  msb.clearErrors = function() {
    $('.error-message').remove();
  };

  /**
   * msb.getElements - Get all elements for steps.
   *
   * @return {object}  return steps structure
   */
  msb.getElements = function() {
    const allElements = [];
    $.each(steps, function(index, value) {
      if ('elements' in steps[index] && steps[index].elements != '') {
        const elements = steps[index].elements.split(',');
        $.each(elements, function(ind, val) {
          allElements.push('#' + val.trim());
        });
      }
    });
    return allElements.join();
  };

  /**
   * msb.showElements - Show elements for step
   *
   * @param  {integer} step show elements of the step
   */
  msb.showElements = function(step) {
    $(msb.getElements()).fadeOut(400);
    if ('elements' in steps[step] && steps[step].elements != '') {
      const elements = steps[step].elements.split(',');
      $.each(elements, function(index, value) {
        $('#' + value.trim()).fadeIn(1000);
      });
    }
  };

  /**
   * msb.gotoStep - goto step
   *
   * @param  {integer} step step to goto
   */
  msb.gotoStep = function(step) {
    /**
     * TODO: Sort out fadein for fields on step change
     */
    $('.active').removeClass('active');
    $('#step-' + step).addClass('active');
    $('body').attr('data-current-page', step);
    $('#' + settings.nextButton + ' span strong')
        .text(steps[step].nextButtonText);
    msb.clearErrors();
    msb.showStep();
    msb.showElements(step);
    if (step != 1) msb.refocusForm();

    if (step == 1) {
      $('#' + settings.prevButton).hide();
    } else {
      $('#' + settings.prevButton).show();
    }
    if (step == msb.objSize(steps)) {
      $('#' + settings.nextButton).hide();
      $('#' + settings.submitButton).show();
    } else {
      $('#' + settings.nextButton).show();
      $('#' + settings.submitButton).hide();
    }
    msb.updateTabIndex();
    if (step !== 1) {
      $(':input:enabled:visible:first').focus();
    }
    hooks.call('hookNewStep', []); // HOOK
  };

  /**
   * msb.focusClick - description
   *
   * @param  {type} ev description
   * @param  {type} el description
   */
  msb.focusClick = function( ev, el) {
    if ( ev.keyCode === 32 || ev.keyCode === 13 ) {
      $(':input:enabled:visible:first').focus();
      el.click();
    }
  };

  /**
   * msb.updateTabIndex - Redo the Tabindexs
   */
  msb.updateTabIndex = function() {
    $( 'button' ).each(/* @this HTMLElement */ function( ) {
      $('#' + this.id).focus(/* @this HTMLElement */ function() {
        $(this).addClass('focusGlow');
      });
      $('#' + this.id).blur(/* @this HTMLElement */ function() {
        $(this).removeClass('focusGlow');
      });
      $(this).keypress(/* @this HTMLElement */ function( ev ) {
        ev.preventDefault();
        msb.focusClick(ev, this);
      });
    });
    let count = 1;

    $( 'form *' ).filter(':input').each(/* @this HTMLElement */ function( ) {
      $(this).attr('tabindex', count);
      count ++;
    });
    $('#'+settings.nextButton ).attr('tabindex', count);
    count ++;
    $('#'+settings.prevButton ).attr('tabindex', count);
    $( '.lp-pom-button' ).each(/* @this HTMLElement */ function( ) {
      if ( this.id != settings.nextButton &&
        this.id != settings.prevButton ) {
        $(this).attr('tabindex', count);
        count ++;
      }
    });
  };

  /**
   * msb.showStep - Show active step, hide others.
   */
  msb.showStep = function() {
    $('fieldset > div').fadeOut(400);
    $('.active').fadeIn(1000);
  };

  /**
   * msb.getStep - get current step from data-id
   *
   * @return {string}  Current step value
   */
  msb.getStep = function() {
    return $('.active').attr('data-id');
  };

  /**
   * msb.objSize - Get size of Object
   *
   * @param  {object} obj object to get size of.
   * @return {integer} size of object.
   */
  msb.objSize = function(obj) {
    return Object.keys(obj).length;
  };

  /**
   * msb.refocusForm - Focus on the top of form.
   */
  msb.refocusForm = function() {
    $('html, body').animate({
      scrollTop: $('.lp-pom-form').parent().offset().top,
    }, 500);
  };

  /**
   * msb.prevStep - goto previous step
   */
  msb.prevStep = function() {
    if ('hookPrevCheck' in hooks && !hooks.call('hookPrevCheck', [])) return;
    msb.refocusForm();
    let step = msb.getStep();
    msb.gotoStep(--step);
  };

  /**
   * msb.nextStep - goto next step
   */
  msb.nextStep = function() {
    let step = msb.getStep();
    if (step != 1) msb.refocusForm();

    if (msb.isValid(step)) {
      if ('hookNextCheck' in hooks &&
          !hooks.call('hookNextCheck', [])) return; // HOOK
      msb.gotoStep(++step);
    } else if (d) console.log('validation fail going to step ' + msb.getStep());
  };

  /**
   * msb.submit - Run submit.
   */
  msb.submit = function() {
    if (msb.isValid(msb.getStep())) {
      if (d) console.log('Submitted');
      else {
        if ('hookSubmit' in hooks &&
            !hooks.call('hookSubmit', [])) return; // HOOK
        const myForm = document.forms[0];
        /**
         *  bubbles - Whether the event will bubble up through the DOM or not.
         *  cancelable - Whether the event may be canceled or not.
         */
        const event = new Event('submit', {
          'bubbles': true,
          'cancelable': true,
        });
        myForm.dispatchEvent(event);
      }
    }
  };

  /**
   * msb.submitActive - Make submit active
   */
  msb.submitActive = function() {
    $('#' + settings.submitButton).click(function(e) {
      if (d) console.log('submitbutton specific');
      e.preventDefault();
      if ('data8' in document.cdnParameters &&
          document.cdnParameters.data8 == 'Y') msb.d8Validate();
      else msb.submit();
    });
  };

  /**
  * Events
  */
  $('#' + settings.nextButton).click(msb.nextStep);
  $('#' + settings.prevButton).click(msb.prevStep);
  msb.submitActive();
  $('.select-button.single-field label').click(function() {
    if (d) console.log('single button click');
    msb.nextStep();
  });

  /**
   * Submit Active
   */
  document.addEventListener('submitActive', function() {
    msb.submitActive();
  });

  /**
  * D8 Validation Complete
  */
  document.addEventListener('d8Complete', function() {
    if (msb.isValid(msb.getStep())) {
      msb.submit();
    }
  });

  /**
   * custom event next step
   */
  document.addEventListener('nextStep', function() {
    msb.nextStep();
    if (d) console.log('nextStep heard');
  });

  /**
   * custom event previous step
   */
  document.addEventListener('prevStep', function() {
    msb.prevStep();
  });

  /**
   * custom event gotoStep
   */
  document.addEventListener('gotoStep', function(e) {
    if (d) console.log(e.detail);
    msb.gotoStep(e.detail);
  });

  /**
   * Active Validation Events
   */
  if (settings.live_validate == 'Y') {
    $.each(steps, function(i, v) {
      $.each(steps[i].fields, function(j, w) {
        if (d) console.log('#' + j);
        $('#' + j).change(function() {
          msb.isFieldValid(j);
        });
      });
    });
  }

  /**
   * Prevent enter key functionality
   */
  $(window).keydown(function(event) {
    if (event.keyCode == 13 || event.keyCode == 169) {
      event.preventDefault();
      return false;
    }
  });

  /**
   * Initialise
   */
  msb.initialise();
  init = true;
  msb.gotoStep(1);
});
