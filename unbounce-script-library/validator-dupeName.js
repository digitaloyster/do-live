/* Unbounce Validation - DupeName */

window.ub.form.customValidators.dupeName = {
  isValid: function(value) {
    let fn = $('#first_name').val();
    let ln = $('#last_name').val();
    fn = fn.toUpperCase().trim();
    ln = ln.toUpperCase().trim();
    if (fn != ln) return true;
    else return false;
  },
  message: 'Names must be different',
};

window.ub.form.validationRules.last_name.dupeName = true;
