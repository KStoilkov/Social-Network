'use strict';

app.directive('showhideonhover',
    function() {
        return {
            link : function(scope, element, attrs) {
                element.parent().bind('mouseenter', function() {
                    element.show();
                });
                element.parent().bind('mouseleave', function() {
                    element.hide();
                });
            }
        };
    });