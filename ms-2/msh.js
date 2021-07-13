// MS Header Version 2.0
document.cdnMultiStep.hooks = {
  hooks: [],
  register: function( name, callback ) {
    if ( 'undefined' == typeof( document.cdnMultiStep.hooks[name] ) ) {
      document.cdnMultiStep.hooks[name] = [];
    }
    document.cdnMultiStep.hooks[name].push( callback );
  },

  call: function( name, arg ) {
    if ( 'undefined' != typeof( document.cdnMultiStep.hooks[name] ) ) {
      let returns;
      for ( i = 0; i < document.cdnMultiStep.hooks[name].length; ++i ) {
        const data = document.cdnMultiStep.hooks[name][i]( arg );
        if ( data ) {
          if ( returns === undefined ) {
            returns = [];
          }
          returns.push(data);
        }
      }
      return returns;
    }
  },
};
