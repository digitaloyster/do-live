/**
 * Multistep Script V1.3
 * Change: ES Linted Google
 */

document.cdnMultiStep.hooks = {
  hooks: [],
  register: function( name, callback ) {
    if ( 'undefined' == typeof( document.cdnMultiStep.hooks[name] ) ) {
      document.cdnMultiStep.hooks[name] = [];
    }
    document.cdnMultiStep.hooks[name].push( callback );
  },

  call: function( name, args ) {
    if ( 'undefined' != typeof( document.cdnMultiStep.hooks[name] ) ) {
      let returns;
      for ( i = 0; i < document.cdnMultiStep.hooks[name].length; ++i ) {
        const data = document.cdnMultiStep.hooks[name][i]( args );
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
