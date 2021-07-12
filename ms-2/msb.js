/* jslint this */
/* jslint long */
// Version 1.2.1

$(document).ready(function() {
  let steps = {};
  let settings = {};
  let hooks = {};
  // XXX: Variables/Objects
  const d = false;
  if (document.cdnMultiStep.debugMode) d = true;

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

  // Variables/Objects
  /* ------------------------------------------------------------------------ */
  // XXX: Functions
  // Initialise Step Structre
  const initialise = function() {
    hooks.call('hookPreInit', []); // Hook
    let msBrowser = false;
    let oldIOS = false;
    let loadJqueryUi = false;
    const datePickerOption = {};
    if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
      msBrowser = true;
    }

    const regex = /(\d{1,2})_\d{1,2}/;
    const found = navigator.userAgent.match(regex);
    if (found !== null) {
      if (found[1] < 12 && navigator.userAgent.includes('Mobile')) {
        oldIOS = true;
      }
    }

    $('#' + document.cdnMultiStep.settings.nextButton).addClass('button-next');
    $('#' + document.cdnMultiStep.settings.nextButton).addClass('button-back');
    $('.lp-pom-button').each(function() {
      let mousedown = 0;
      $('#' + this.id).mousedown(function(e) {
        mousedown = 1;
      });
      $('#' + this.id).focus(function(e) {
        if (!mousedown) {
          $(this).addClass('focusGlow');
        }
        mousedown = 0;
      });
      $('#' + this.id).blur(function() {
        $(this).removeClass('focusGlow');
      });
      $(this).keypress(function(ev) {
        ev.preventDefault();
        focusClick(ev, this, 1);
      });
    });
    $.each(steps, function(i, val) {
      const page = [];
      $.each(steps[i].fields, function(k, val) {
        page.push('#container_' + k);
      });
      if (objSize(page) == 0) {
        $('#step-' + (i - 1)).after('<div id="step-' + i + '" data-id="' + i + '" class="step"></div>');
      } else {
        $(page.join(',')).wrapAll('<div id="step-' + i + '" data-id="' + i + '" class="step"></div>');
      }
    });

    // Add custom aspects
    $.each(steps, function(i, val) {
      if ('fields' in steps[i] && steps[i].fields != '') {
        $.each(steps[i].fields, function(k, val) {
          // Email Validate
          // if (k==="email_address") {
          //    document.getElementById(k).setAttribute(
          //       "pattern",
          //       "[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z0-9]{2,}"
          //    );
          // }
          // Buttons
          if ('display' in val && val.display == 'buttons') {
            if (!$('#' + k).length) {
              $('[name="' + k + '"]').parent().addClass('select-button');
              // console.log($("[name='" + k + "']")[0].type);
              if (objSize(steps[i].fields) === 1 && $('[name="' + k + '"]')[0].type !== 'checkbox') {
                $('[name="' + k + '"]').parent().addClass('single-field');
              }
              $('[name="' + k + '"]').bind('change', function() {
                const $update = $(this).parent('div');
                if ($('[name="' + k + '"]')[0].type !== 'checkbox') {
                  $('#container_' + k + ' .selected').removeClass('selected');
                }
                $update.toggleClass('selected');
                if ($update.hasClass('single-field') && !msBrowser && !oldIOS) {
                  nextStep();
                }
              });
            }
          }
          if ('error' in val && val.error != '') {
            if ($('#' + i).length) {
              document.getElementById(k).setAttribute('oninvalid', 'this.setCustomValidity("' + val.error + '");');
              document.getElementById(k).setAttribute('onchange', 'this.setCustomValidity("");');
            } else if ($('[name="' + k + '"]').length) {
              const elements = document.getElementsByName(k);
              for (i = 0; i < elements.length; i++) {
                elements[i].setAttribute('oninvalid', 'this.setCustomValidity("' + val.error + '");');
                elements[i].setAttribute('onchange', 'this.setCustomValidity("");');
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
            field.setAttribute('pattern', '[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])');
          }
          if ('mask' in val) {
            $('#' + k).mask(val.mask);
          }
        });
      }
    });

    loadStyleSheet('https://cdn.jsdelivr.net/gh/digitaloyster/do-live/ms/ms.css');
    if (loadJqueryUi) {
      loadStyleSheet('https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css');
      loadScript('https://code.jquery.com/ui/1.12.0/jquery-ui.min.js', datePickerOption);
    }

    $('form').show();

    hooks.call('hookPageInit', []); // HOOK
  };

  const loadStyleSheet = function(thisURL) {
    const styles = document.createElement('link');
    styles.setAttribute('href', thisURL);
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('type', 'text/css');
    document.head.appendChild(styles);
  };

  const loadScript = function(thisURL, option) {
    const script = document.createElement('script');
    script.onload = function() {
      for (const el in option) {
        if ({}.hasOwnProperty.call(option, el)) {
          $('#' + el).datepicker(option[el]);
        }
      }
    };
    script.src = thisURL;
    document.head.appendChild(script);
  };

  // D8 Validation
  const d8Validate = function() {
    if (d) console.log('d8Validate()');
    // TODO: Switch custom validity from hardcoded to set variable if exists.
    document.getElementById('telephone').setCustomValidity('Please enter a valid telephone number.');
    const event = new Event('d8Validate');
    document.dispatchEvent(event);
  };

  // Validate current page
  const isValid = function(step) {
    const valid = true;
    const event = new Event('doErrors');
    $.each(steps[step].fields, function(i, v) {
      i = i.trim();
      if ('postcode' in document.cdnParameters && document.cdnParameters.postcode != 'N') {
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

  // Clear all error messages
  const clearErrors = function() {
    $('.error-message').remove();
  };

  // Get all Elements
  const getElements = function() {
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

  // Show current pages elements
  const showElements = function(step) {
    $(getElements()).fadeOut(400);
    if ('elements' in steps[step] && steps[step].elements != '') {
      const elements = steps[step].elements.split(',');
      $.each(elements, function(index, value) {
        $('#' + value.trim()).fadeIn(1000);
      });
    }
  };

  // Goto specific step
  const gotoStep = function(step) {
    // TODO: Sort out fadein for fields on step change
    $('.active').removeClass('active');
    $('#step-' + step).addClass('active');
    $('body').attr('data-current-page', step);
    $('#' + settings.nextButton + ' span strong').text(steps[step].nextButtonText);
    clearErrors();
    showStep();
    showElements(step);
    if (step != 1) refocusForm();

    if (step == 1) {
      $('#' + settings.prevButton).hide();
    } else {
      $('#' + settings.prevButton).show();
    }
    if (step == objSize(steps)) {
      $('#' + settings.nextButton).hide();
      $('#' + settings.submitButton).show();
    } else {
      $('#' + settings.nextButton).show();
      $('#' + settings.submitButton).hide();
    }
    updateTabIndex();
    if (step !== 1) {
      $(':input:enabled:visible:first').focus();
    } else {
      $('html, body').animate({
        scrollTop: $('body').offset().top,
      }, 0);
    }
    stepPixel(step);
    hooks.call('hookNewStep', []); // HOOK
  };

  const focusClick = function(ev, el) {
    if (ev.keyCode === 32 || ev.keyCode === 13) {
      $(':input:enabled:visible:first').focus();
      el.click();
    }
  };

  const updateTabIndex = function() {
    $('button').each(function() {
      $('#' + this.id).focus(function() {
        $(this).addClass('focusGlow');
      });
      $('#' + this.id).blur(function() {
        $(this).removeClass('focusGlow');
      });
      $(this).keypress(function(ev) {
        ev.preventDefault();
        focusClick(ev, this);
      });
    });
    let count = 1;
    // $( "#step-" + step + ' *' ).filter(':input').each(function( ) {
    $('form *').filter(':input').each(function() {
      $(this).attr('tabindex', count);
      count++;
    });
    $('#' + document.cdnMultiStep.settings.nextButton).attr('tabindex', count);
    count++;
    $('#' + document.cdnMultiStep.settings.prevButton).attr('tabindex', count);
    $('.lp-pom-button').each(function() {
      if (this.id != document.cdnMultiStep.settings.nextButton && this.id != document.cdnMultiStep.settings.prevButton) {
        $(this).attr('tabindex', count);
        count++;
      }
    });
  };

  // Fade between steps
  const showStep = function() {
    $('fieldset > div').fadeOut(400);
    $('.active').fadeIn(1000);
  };

  // Detect and return current step
  const getStep = function() {
    return $('.active').attr('data-id');
  };


  // Utility Functions

  // Return size of object
  const objSize = function(obj) {
    return Object.keys(obj).length;
  };

  // Scroll to top of form
  const refocusForm = function() {
    const step = getStep();
    if (step != 1) {
      if ('refocus' in document.cdnParameters && document.cdnParameters.refocus != 'N') {
        $('html, body').animate({
          scrollTop: $('.lp-pom-form').parent().offset().top,
        }, 500);
      }
    }
  };

  // Utility functions

  // Functions
  /* ------------------------------------------------------------------------ */
  // XXX: Click Handlers

  // Goto prev step
  const prevStep = function() {
    if ('hookPrevCheck' in hooks && !hooks.call('hookPrevCheck', [])) return; // HOOK
    let step = getStep();
    gotoStep(--step);
    refocusForm();
  };

  // Goto next step
  const nextStep = function() {
    let step = getStep();
    if (isValid(step)) {
      if ('hookNextCheck' in hooks && !hooks.call('hookNextCheck', [])) return; // HOOK
      gotoStep(++step);
    } else {
      console.log('validation fail going to step ' + getStep());
    }
    if (step != 1) refocusForm();
  };

  // StepPixel
  const stepPixel = function(page) {
    if (document.cdnParameters.cake_offer_id != '' && typeof document.cdnParameters.cake_offer_id !== 'undefined' && steps[page].event != '' && typeof steps[page].event !== 'undefined' && document.cdnParameters.lp_tracking_prefix != '' && typeof document.cdnParameters.lp_tracking_prefix !== 'undefined') {
      // REVIEW: Added check for cake_offer_id AND cake_lp_event_id AND lp_tracking_prefix
      const image = new Image(1, 1);
      let variant;
      if (typeof window.ub !== 'undefined') variant = window.ub.page.variantId;
      else variant = '';
      image.src = 'https://secureoyster.com/p.ashx?o=' + document.cdnParameters.cake_offer_id + '&e=' + steps[page].event + '&f=img&r=' + getParameterByName('ckm_request_id') + '&t=' + document.cdnParameters.lp_tracking_prefix + '-' + variant + '|' + window.outerWidth + 'x' + window.outerHeight + '|' + getParameterByName('link_click');
    }
  };

  // Submit functions
  const submit = function() {
    if (isValid(getStep())) {
      if (d) console.log('Submitted');
      else {
        if ('hookSubmit' in hooks && !hooks.call('hookSubmit', [])) return; // HOOK
        const myForm = document.forms[0];
        const event = new Event('submit', {
          'bubbles': true, // Whether the event will bubble up through the DOM or not
          'cancelable': true, // Whether the event may be canceled or not
        });
        myForm.dispatchEvent(event);
      }
    }
  };

  const submitActive = function() {
    $('#' + settings.submitButton).click(function(e) {
      console.log('submitbutton specific');
      e.preventDefault();
      if ('data8' in document.cdnParameters && document.cdnParameters.data8 == 'Y') d8Validate();
      else submit();
    });
  };


  // Event Handlers
  /* ------------------------------------------------------------------------ */
  // XXX: Events
  $('#' + settings.nextButton).click(nextStep);
  $('#' + settings.prevButton).click(prevStep);
  submitActive();
  $('.select-button.single-field label').click(function() {
    console.log('single button click');
    nextStep();
  });
  document.addEventListener('submitActive', function() {
    submitActive();
  });

  document.addEventListener('d8Complete', function() {
    if (isValid(getStep())) {
      submit();
    }
  });

  // Custom Event listeners for page control.
  document.addEventListener('nextStep', function() {
    nextStep();
    console.log('nextStep heard');
  });
  document.addEventListener('prevStep', function() {
    prevStep();
  });
  document.addEventListener('gotoStep', function(e) {
    console.log(e.detail);
    gotoStep(e.detail);
  });

  // Prevent enter key functionality
  $(window).keydown(function(event) {
    if (event.keyCode == 13 || event.keyCode == 169) {
      event.preventDefault();
      return false;
    }
  });


  // Events
  /* ------------------------------------------------------------------------ */

  // Initialise
  initialise();
  gotoStep(1);
  // Initialise
});
