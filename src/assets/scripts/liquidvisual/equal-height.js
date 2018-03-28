/*
	EQUAL-HEIGHT.JS - Last updated: 28.03.18

    Use case:

    <!-- POPUP GALLERY -->
    <ul class="block-grid-xs-1 block-grid-sm-2 block-grid-lg-3 block-grid-xl-4 block-grid-condensed popup-gallery mb-4" data-group-title="Santa Comba Project" data-equal-height-group>
        {% for i in (1..2) %}
            <li>
                <a class="btn-tile" href="http://placehold.it/800x600" title="Fig. 4A - Description goes here, longer text if required {{ i }}">
                    <img width="100%" src="/assets/img/layout/thumb-sizer--400x300.svg" alt="Image Dimensions">
                    <span class="btn-tile-bg" style="background-image: url(http://placehold.it/400x300)"></span>
                    <span class="btn-tile-label" data-equal-height>Fig. 4A - Description goes here, longer text if required {{ i }}</span>
                </a>
            </li>
            <li>
                <a class="btn-tile" href="http://placehold.it/800x600" title="Fig. 4A - Description goes here, longer text if required {{ i }}">
                    <img width="100%" src="/assets/img/layout/thumb-sizer--400x300.svg" alt="Image Dimensions">
                    <span class="btn-tile-bg" style="background-image: url(http://placehold.it/400x300)"></span>
                    <span class="btn-tile-label" data-equal-height>Fig. 4A - Description goes here, longer text if required longer longer longer longer {{ i }}</span>
                </a>
            </li>
        {% endfor %}
    </ul>
*/
//-----------------------------------------------------------------
// EQUAL HEIGHT
//-----------------------------------------------------------------

;(function($) {
    'use strict';

    //==================================================
    // Variables
    //==================================================

    var equalHeightGroup = $('[data-equal-height-group]');
    var equalHeightAttr = '[data-equal-height]';

    /* Thanks to CSS Tricks for pointing out this bit of jQuery
    http://css-tricks.com/equal-height-blocks-in-rows/
    It's been modified into a function called at page load and then each time the page is resized. One large modification was to remove the set height before each new calculation. */

    // http://codepen.io/micahgodbolt/pen/FgqLc

    //==================================================
    // Launch
    //==================================================

    var equalHeight = function(group) {

    	// if ($(window).width() >= 768) {

            // loop group
            $(group).each(function() {

                var currentTallest = 0;
                var currentRowStart = 0;
                var rowDivs = [];
                var $el;
                var topPosition = 0;
                var $equalHeightTarget = $(this).find(equalHeightAttr); // targets

                // loop targets
                $equalHeightTarget.each(function() {
                    $el = $(this);
                    $($el).height('auto');
                    topPosition = $el.position().top;

                    if (currentRowStart != topPosition) {
                        for (var currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                            rowDivs[currentDiv].height(currentTallest);
                        }
                        rowDivs.length = 0; // empty the array
                        currentRowStart = topPosition;
                        currentTallest = $el.height();
                        rowDivs.push($el);
                    } else {
                        rowDivs.push($el);
                        currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
                    }
                    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                        rowDivs[currentDiv].height(currentTallest);
                    }
                });
            })

    	// } else {
    		// equalHeightAttr.height('auto');
    	// }
    };

    $(window).on('load', function() {
    	equalHeight(equalHeightGroup);
    });

    $(window).resize(function(){
    	equalHeight(equalHeightGroup);
    });

}(jQuery));

//==================================================
//
//==================================================