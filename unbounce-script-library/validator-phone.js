/* Unbounce Validation - Phone Validations */

window.ub.form.customValidators.phone = {
  isValid: function(value) {
    if (!(/(.)\1{6,}/.test(value.toUpperCase())) &&
      (/^(01|02|07)/.test(value.toUpperCase())) &&
      (/^[0-9]{11}$/.test(value.replace(' ', '')))) {
      return true;
    } else {
      return false;
    }
  },
  message: 'Please enter a valid Phone Number',
};

window.ub.form.validationRules.telephone.phone = true;
