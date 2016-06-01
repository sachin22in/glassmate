(function () {
    'use strict';

    app.directive('clickableButton', function(){
      return {
        restrict: "A",
        link: function(scope, elem, attr){
          elem.on('mousedown', function(){
            var current_src = attr.src;
            var active_src = current_src;
            active_src = active_src.slice(0, -10);
            active_src = active_src + 'select.png';
            //attr.src = active_src;
            attr.$set('src', active_src);
          });
          elem.on('mouseup', function(){
            var current_src = attr.src;
            var active_src = current_src;
            active_src = active_src.slice(0, -10);
            active_src = active_src + 'normal.png';
            attr.$set('src', active_src);

          });
        }
      }
    });
    
})();