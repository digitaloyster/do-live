/* Unbounce Validation - Phone Starts with 01, 02 or 07 */

window.ub.form.customValidators.PhoneStarts = {
  isValid: function(value) {
    return (/^(01|02|07)/.test(value.toUpperCase()));
  },
  message: 'Please enter a valid Phone Number',
};

window.ub.form.validationRules.telephone.PhoneStarts = true;
