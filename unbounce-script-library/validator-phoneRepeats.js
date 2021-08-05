/* Unbounce Validation - Multiple digit phone numbers */

window.ub.form.customValidators.PhoneRepeats = {
  isValid: function(value) {
    return !(/(.)\1{6,}/.test(value.toUpperCase()));
  },
  message: 'Please enter a valid Phone Number',
};

window.ub.form.validationRules.telephone.PhoneRepeats = true;
