/**
 * Multi Step Progress Bar - Version 1.3
 * Change: ES linted Google
 * Change: Added Namespace
 */

const msp = {};
msp.settings = document.cdnParameters;

msp.settings.progress_bar =
(adb.settings.progress_bar !== undefined) ?
      adb.settings.progress_bar :
      false;

if ( msp.settings.progress_bar != '' &&
     msp.settings.progress_bar &&
     $( msp.settings.progress_bar ).length ) {
  msp.element = '#progress';
  msp.cdnURL = 'https://cdn.jsdelivr.net/gh/digitaloyster/do-live';
  msp.hooks = document.cdnMultiStep.hooks;
  msp.hooks.register(
      'hookPrevCheck',
      function(args) {
        msp.hooks.setProgress('prev');
        return true;
      },
  );
  msp.hooks.register(
      'hookNextCheck',
      function(args) {
        msp.hooks.setProgress();
        return true;
      },
  );


  msp.setProgress = function( nextPrev ) {
    msp.numSteps = Object.keys( document.cdnMultiStep.steps ).length;
    msp.step = $( '.active' ).attr( 'data-id' );
    nextPrev == 'prev' ? msp.step -- : msp.step ++;
    nextPrev === 1 ? msp.step = nextPrev : msp.step == msp.step;
    msp.progress = (Math.round((msp.step/msp.numSteps)*100 )/100)*100;
    msp.progress = Math.floor(msp.progress);
    msp.progress += '%';
    // document.getElementById('percent_value').innerHTML = progress;
    document.getElementById('progress').innerHTML = msp.progress;
    if ( msp.step == msp.numSteps) {
      $(msp.element).stop().animate({
        width: msp.progress,
        borderRadius: 4,
      }, 500);
    } else {
      $(msp.element).stop().animate({
        width: msp.progress,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }, 500);
    }
    return true;
  };

  $('head').append('<link rel="stylesheet" type="text/css" href="'+msp.cdnURL+'/ms/pg.css">');
  msp.progHeight = $( msp.settings.progress_bar ).height();
  msp.fontSize = msp.progHeight / 2;
  if ( msp.fontSize < 8 ) {
    msp.fontSize = 8;
  }
  if ( msp.fontSize > 18 ) {
    msp.fontSize = 18;
  }
  $( msp.settings.progress_bar ).html('<div class="bar-container" >' +
    '<div class="progress_bar_background progress_bar_border_color" id="pgBar" >' +
    '<div class="progress_bar_color progress_bar_font_color" id="progress" style="font-size:'
    + msp.fontSize + 'px;"></div>' + '</div>' + '</div>');

  msp.hooks.setProgress(1);
}
