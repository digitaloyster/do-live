/**
 * Inline Errors v1.3
 * Change: ES Lint Google
 * Change: Namespaced
 */
const ie = {};

/**
 * Functions
 */

/**
 * removeElementsByClass - Remove all elements based on class within an element
 *
 * @param  {string} className Class to remove...
 * @param  {string} element   within the element
 */
ie.removeElementsByClass = function(className, element) {
  const elements = element.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};


/**
 * doErrors - Run Validation across the form
 *
 * @param  {string} form Form element to run against
 */
ie.doErrors = function(form) {
  const invalidFields = form.querySelectorAll(':invalid');
  const errorMessages = form.querySelectorAll('.error-message');
  let parent;

  // Remove any existing messages
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].parentNode.removeChild(errorMessages[i]);
  }

  for (let i = 0; i < invalidFields.length; i++) {
    const field = invalidFields[i];
    if (field.nodeName == 'SELECT') {
      parent = invalidFields[i].parentNode;
      if (!parent.querySelectorAll('.error-message').length) {
        const el = invalidFields[i];
        const insert = '<div class=\'error-message\'>' +
        invalidFields[i].validationMessage +
        '</div>';
        el.insertAdjacentHTML('beforebegin', insert);
      }
    } else {
      /**
       * TODO: Sort out this attributes section...
       * not sure why it's looping for attributes.
       */
      for (j = 0; j < field.attributes.length; j++) {
        if (field.attributes[j].name == 'type') {
          if (field.attributes[j].value == 'radio' ||
              field.attributes[j].value == 'checkbox') {
            parent = invalidFields[i].parentNode.parentNode.parentNode;
            if (!parent.querySelectorAll('.error-message').length) {
              const el = invalidFields[i].parentNode.parentNode;
              const insert = '<div class=\'error-message\'>' +
              invalidFields[i].validationMessage +
              '</div>';
              el.insertAdjacentHTML('afterend', insert);
            }
          } else {
            parent = invalidFields[i].parentNode;
            if (!parent.querySelectorAll('.error-message').length) {
              const el = invalidFields[i];
              const insert = '<div class=\'error-message\'>' +
              invalidFields[i].validationMessage +
              '</div>';
              el.insertAdjacentHTML('beforebegin', insert);
            }
          }
        }
      }
    }
  }

  // If there are errors, give focus to the first invalid field
  if (invalidFields.length > 0) {
    invalidFields[0].focus();
  }
};


/**
 * doError - Validate a single field
 *
 * @param  {string} id Id of the field to validate
 */
ie.doError = function(id) {
  const container = document.getElementById('container_'+id);
  const field = container.querySelector(':invalid');
  let parent = '';
  if (field == null) {
    const element = container.getElementsByClassName('error-message');
    if (element.length) ie.removeElementsByClass('error-message', container);
  } else {
    if (field.nodeName == 'SELECT') {
      parent = field.parentNode;
      if (!parent.querySelectorAll('.error-message').length) {
        const el = field;
        const insert = '<div class=\'error-message\'>' +
          field.validationMessage +
          '</div>';
        el.insertAdjacentHTML('beforebegin', insert);
      }
    } else {
      for (j = 0; j < field.attributes.length; j++) {
        if (field.attributes[j].name == 'type') {
          if (field.attributes[j].value == 'radio' ||
              field.attributes[j].value == 'checkbox') {
            parent = field.parentNode.parentNode.parentNode;
            if (!parent.querySelectorAll('.error-message').length) {
              const el = field.parentNode.parentNode;
              const insert = '<div class=\'error-message\'>' +
                              field.validationMessage +
                              '</div>';
              el.insertAdjacentHTML('afterend', insert);
            }
          } else {
            parent = field.parentNode;
            if (!parent.querySelectorAll('.error-message').length) {
              const el = field;
              const insert = '<div class=\'error-message\'>' +
                              field.validationMessage +
                              '</div>';
              el.insertAdjacentHTML('beforebegin', insert);
            }
          }
        }
      }
    }
  }
};


/**
 * replaceValidationUI - description
 *
 * @param  {type} form description
 */
ie.replaceValidationUI = function(form) {
  // Suppress the default bubbles
  form.addEventListener('invalid', function(event) {
    event.preventDefault();
  }, true);


  /**
   * Support Safari, iOS Safari, and the Android
   * browser—each of which do not prevent
   * form submissions by default
   */
  form.addEventListener('submit', /* @this HTMLElement */ function(event) {
    if (!this.checkValidity()) {
      event.preventDefault();
    }
  });

  form.addEventListener('change', function(event) {
    // doErrors(form);
  });

  document.addEventListener('doErrors', function(event) {
    ie.doErrors(form);
  });

  document.addEventListener('doError', function(event) {
    ie.doError(event.detail.id);
  });
};

// Replace the validation UI for all forms
const forms = document.querySelectorAll('form');
for (let i = 0; i < forms.length; i++) {
  ie.replaceValidationUI(forms[i]);
}
