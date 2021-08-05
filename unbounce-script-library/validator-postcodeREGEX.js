/* Unbounce Validation - UK Postcode REGEX */

window.ub.form.customValidators.UKPostcode = {
  isValid: function(value) {
    return /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$/.test(value.toUpperCase());
  },
  message: 'Please enter a valid UK postcode',
};

window.ub.form.validationRules.postcode.UKPostcode = true;
