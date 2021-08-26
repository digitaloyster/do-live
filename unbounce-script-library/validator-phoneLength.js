/* Unbounce Validation - Phone Number Length */

window.ub.form.customValidators.PhoneLength = {
  isValid: function(value) {
    return (/^[0-9]{11}$/.test(value.replace(' ', '')));
  },
  message: 'Please enter a valid Phone Number',
};

window.ub.form.validationRules.telephone.PhoneLength = true;
