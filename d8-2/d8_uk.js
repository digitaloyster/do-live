// Global config for Data8 validation v1.0
const d8Validation = {
  apiKey: '8E37-B68G-6V63-M6YF',
  email: {
    enabled: false,
    level: 'Address',
    msg: 'Email address is invalid',
  },
  phone: {
    enabled: true,
    useLineValidation: true,
    useMobileValidation: true,
    defaultCountryCode: 44,
    allowedPrefixes: '+441,+442,+447',
    msg: 'Please enter a valid UK telephone number.',
  },
};

const d8Complete = function() {
  console.log('d8 return');
  const event = new Event('d8Complete');
  document.dispatchEvent(event);
};

// Runs on form submission
const startData8Validation = function(e, $) {
  // e.preventDefault();
  // Build an array of validation callbacks
  const promises = [];
  // Find the form and all the phone & email fields in it
  // var form = lp.jQuery('.lp-pom-form form');
  if (d8Validation.phone.enabled) {
    // var phoneFields = lp.jQuery('input[type=tel]', form);
    const phonefield = document.getElementById('telephone');

    // phoneFields.each(function(idx, el) {
    promises.push(validatePhoneAsync(phonefield)
        .then(reportValidationResult).then(d8Complete));
    // });
  }

  // if (d8Validation.email.enabled) {
  // var emailFields = lp.jQuery('input[type=email]', form);

  // emailFields.each(function(idx, el) {
  // promises.push(validateEmailAsync(el).then(reportValidationResult));
  // });
  // }

  // Wait for all the callbacks to complete.
  // If the form is then valid, submit it
  // Promise.all(promises).then(function(values) {
  //  var event = new Event('doErrors');
  //  document.dispatchEvent(event);
  //  //if (form.valid()) form.submit();
  //
  // });
};

/* const validateEmailAsync = function(field, valid) {
  return new Promise(function(resolve, reject) {
    const params = {
      email: field.value,
      level: d8Validation.email.level,
    };

    const req = new XMLHttpRequest();
    req.open('POST', 'https://webservices.data-8.co.uk/EmailValidation/IsValid.json?key=' + d8Validation.apiKey);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    req.onreadystatechange = function() {
      if (this.readyState === 4) {
        req.onreadystatechange = null;

        if (this.status === 200) {
          const result = JSON.parse(this.response);
          if (!result.Status.Success) {
            resolve({
              field: field,
              valid: true,
            });
          } else if (result.Result !== 'Invalid') {
            resolve({
              field: field,
              valid: true,
            });
          } else {
            resolve({
              field: field,
              valid: false,
              msg: d8Validation.email.msg,
            });
          }
        } else {
          resolve({
            field: field,
            valid: true,
          });
        }
      }
    };

    req.send(window.JSON.stringify(params));
  });
}*/

const validatePhoneAsync = function(field, valid) {
  return new Promise(function(resolve, reject) {
    const params = {
      telephoneNumber: field.value,
      defaultCountry: d8Validation.phone.defaultCountryCode,
      options: {
        UseLineValidation: d8Validation.phone.useLineValidation,
        UseMobileValidation: d8Validation.phone.useMobileValidation,
        AllowedPrefixes: d8Validation.phone.allowedPrefixes,
      },
    };

    const req = new XMLHttpRequest();
    req.open('POST', 'https://webservices.data-8.co.uk/InternationalTelephoneValidation/IsValid.json?key=' + d8Validation.apiKey);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    req.onreadystatechange = function() {
      if (this.readyState === 4) {
        req.onreadystatechange = null;
        console.log(this);
        if (this.status === 200) {
          const result = JSON.parse(this.response);
          if (!result.Status.Success) {
            resolve({
              field: field,
              valid: true,
            });
          } else if (result.Result.ValidationResult !== 'Invalid' &&
          result.Result.ValidationResult !== 'NoCoverage') {
            resolve({
              field: field,
              valid: true,
            });
          } else {
            resolve({
              field: field,
              valid: false,
              msg: d8Validation.phone.msg,
            });
          }
        } else {
          resolve({
            field: field,
            valid: true,
          });
        }
      }
    };
    req.send(window.JSON.stringify(params));
  });
};

const reportValidationResult = function(result) {
  console.log(result);
  if (result.valid) {
    result.field.setCustomValidity('');
  } else {
    result.field.setCustomValidity(result.msg);
  }
  return result;
};

document.addEventListener('d8Validate', function(e) {
  console.log('d8 validate heard');
  startData8Validation(e, $);
});
