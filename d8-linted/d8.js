/* Global config for Data8 validation v2.0 */
const d8 = {};
d8.d = (document.cdnParameters.debug_mode !== undefined) ?
    document.cdnParameters.debug_mode :
    false;
d8.Validation = {
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
    UseUnavailableStatus: true,
    defaultCountryCode: 44,
    msg: 'Please enter a valid telephone number.',
  },
};

d8.d8Complete = function() {
  if (d8.d) console.log('d8 return');
  const event = new Event('d8Complete');
  document.dispatchEvent(event);
};

d8.startData8Validation = function(e, $) {
  const promises = [];
  if (d8.Validation.phone.enabled) {
    const phonefield = document.getElementById('telephone');
    promises.push(
        d8.validatePhoneAsync(phonefield)
            .then(d8.reportValidationResult)
            .then(d8.d8Complete));
  }
};

d8.validateEmailAsync = function(field, valid) {
  return new Promise(function(resolve, reject) {
    const params = {
      email: field.value,
      level: d8.Validation.email.level,
    };

    const req = new XMLHttpRequest();
    req.open('POST', 'https://webservices.data-8.co.uk/EmailValidation/IsValid.json?key=' + d8.Validation.apiKey);
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
              msg: d8.Validation.email.msg,
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

d8.validatePhoneAsync = function(field, valid) {
  return new Promise(function(resolve, reject) {
    const params = {
      telephoneNumber: field.value,
      defaultCountry: d8.Validation.phone.defaultCountryCode,
      options: {
        UseLineValidation: d8.Validation.phone.useLineValidation,
        UseMobileValidation: d8.Validation.phone.useMobileValidation,
      },
    };

    const req = new XMLHttpRequest();
    req.open('POST', 'https://webservices.data-8.co.uk/InternationalTelephoneValidation/IsValid.json?key=' + d8.Validation.apiKey);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    req.onreadystatechange = function() {
      if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (d8.d) console.log(this);
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
              msg: d8.Validation.phone.msg,
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

d8.reportValidationResult = function(result) {
  if (d8.d) console.log(result);
  if (result.valid) {
    result.field.setCustomValidity('');
  } else {
    result.field.setCustomValidity(result.msg);
  }
  return result;
};

document.addEventListener('d8Validate', function(e) {
  if (d8.d) console.log('d8 validate heard');
  d8.startData8Validation(e, $);
});
