(function() {

  /*
   * show = boolean of whether it should be diplayed in the end or not
   */
  function fadeTo (el, targetopacity, callback) {
    var stepsize, steplength;

    // stupidity checks
    if (targetopacity === 1) el.style.opacity = 0;
    else if (targetopacity === 0) el.style.opacity = 1;

    stepsize = 0.08;
    steplength = 10;

    function step() {
      if (parseFloat(el.style.opacity) === targetopacity) {
        callback();
        return;
      }

      if (el.style.opacity < targetopacity) {
        el.style.opacity = parseFloat(el.style.opacity) + stepsize;
        if (parseFloat(el.style.opacity) > targetopacity) el.style.opacity = targetopacity;
      } else {
        el.style.opacity = parseFloat(el.style.opacity) - stepsize;
        if (parseFloat(el.style.opacity) < targetopacity) el.style.opacity = targetopacity;
      }

      setTimeout(step, steplength);
    }

    step();
  }

  window.document.addEventListener('DOMContentLoaded', function() {
    var btn;

    btn = document.getElementById('btn_learnmore');
    btn.addEventListener('click', function(ev) {
      var learnmore;

      learnmore = document.getElementById('learnmore');
      if (!learnmore.style.opacity) {
        learnmore.style.opacity = 0;
        learnmore.style.display = 'block';
        fadeTo(learnmore, 1, function() {
          document.getElementById('email').focus();
        });
      }
    });
  });

})();
