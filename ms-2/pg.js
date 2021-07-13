/* MS Progress Bar Version 2.0 */
'use strict';
const hooks = document.cdnMultiStep.hooks;
hooks.register(
    'hookPrevCheck',
    function(args) {
      setProgress('prev');
      return true;
    },
);
hooks.register(
    'hookNextCheck',
    function(args) {
      setProgress();
      return true;
    },
);
if ( $( document.cdnParameters.progress_bar ).length ) {
  $('head').append('<link rel="stylesheet" type="text/css" '+
  'href="https://cdn.jsdelivr.net/gh/digitaloyster/do-live/ms/pg.css">');
  const progHeight = $( document.cdnParameters.progress_bar ).height();
  let fontSize = progHeight / 2;
  if ( fontSize < 8 ) {
    fontSize = 8;
  }
  if ( fontSize > 18 ) {
    fontSize = 18;
  }
  $( document.cdnParameters.progress_bar ).html('<div class="bar-container" >' +
    '<div class="progress_bar_background progress_bar_border_color"'+
    ' id="pgBar" >' +
    '<div class="progress_bar_color progress_bar_font_color" '+
    'id="progress" style="font-size:' + fontSize + 'px;"></div>' +
    '</div>' +
    '</div>');
  const setProgress = function( nextPrev ) {
    const numSteps = Object.keys( document.cdnMultiStep.steps ).length;
    let step = $( '.active' ).attr( 'data-id' );
      nextPrev == 'prev' ? step -- : step ++;
      nextPrev === 1 ? step = nextPrev : step == step;
      const progress = Math.floor( ( Math.round(
          ( step / numSteps ) * 100,
      ) / 100 ) * 100 ) + '%';

      document.getElementById('progress').innerHTML = progress;
      if ( step == numSteps) {
        $('#progress').stop().animate({
          width: progress,
          borderRadius: 4,
        }, 500);
      } else {
        $('#progress').stop().animate({
          width: progress,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }, 500);
      }
      return true;
  };
  setProgress( 1 );
}
