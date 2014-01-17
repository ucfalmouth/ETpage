// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation('abide','events');

$( document ).ready(function() {

	// set up isotope
	var $container = $('.team-profiles__images');
	// initialize
	$container.isotope({
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false
		},
		itemSelector: '.team-profiles__images li'
		//gutter: 10
	});

	var $optionSets = $('.team-profiles__filters .filters__filter-set'),
          $optionLinks = $optionSets.find('a');

    // option links
	$optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			return false;
		}
		var $optionSet = $this.parents('.filters__filter-set');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');

		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		var options = {},
		key = $optionSet.attr('data-filter-key'),
		value = $this.attr('data-filter-value');
		// parse 'false' as false boolean
		value = value === 'false' ? false : value;
		options[ key ] = value;
		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			// changes in layout modes need extra logic
			changeLayoutMode( $this, options )
		} else {
			// otherwise, apply new options
			$container.isotope( options );
		}

		return false;
	});

	// filter buttons
	$('.filters__filter-select').change(function(){

		var $this = $(this);

		// store filter value in object
		// i.e. filters.color = 'red'
		var group = $this.attr('data-filter-key');

		filters[ group ] = $this.find(':selected').attr('data-filter-value');
		// console.log( $this.find(':selected') )
		// convert object into array
		var isoFilters = [];
		for ( var prop in filters ) {
			isoFilters.push( filters[ prop ] )
		}
		//console.log(filters);
		var selector = isoFilters.join('');
		$container.isotope({ filter: selector });
		return false;
	});

	/**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    $(".masterheader__next-section-link").click(function(evn){
    evn.preventDefault();
    $('html,body').scrollTo(this.hash, this.hash, {duration:7000, offset: {top:0} }); 
    $('.nav__menu').find('#about').parent().addClass("nav__menu-item--active");
    });


    // Highlight the nav items
    /*$('.nav__menu').onePageNav({
    currentClass: 'nav__menu-item--active',
    changeHash: false,
    scrollSpeed: 750,
    scrollOffset: 135,
    scrollThreshold: 0,
    filter: '',
    easing: 'swing',
    begin: function() {
        
    },
    end: function() {
       
    },
    scrollChange: function($currentListItem) {
       
    }
});*/




	//$(".filters__filter-select").select2();
});

jQuery(document).ready(function($) {
  $('form.quform').Quform();

  // Tooltip settings
  if ($.isFunction($.fn.qtip)) {
    $('.quform-tooltip').qtip({
      content: {
        text: false
      },
      style: {
        classes: 'qtip-default qtip-shadow quform-tt',
        width: '180px'
      },
      position: {
        my: 'left center',
        at: 'right center'
      }
    });
  }

  // Changes subject to a text field when 'Other' is chosen
  $('#subject').replaceSelectWithTextInput({onValue: 'Other'});
}); // End document ready

(function ($) {
  $(window).load(function () {
    // Preload images
    var images = [
          'quform/images/close.png',
        'quform/images/success.png',
        'quform/images/error.png',
        'quform/images/default-loading.gif'
      ];

    // Preload images for any active themes
    if ($('.quform-theme-light-light, .quform-theme-light-rounded').length) {
      images = images.concat([
            'quform/themes/light/images/button-active-bg-rep.png',
            'quform/themes/light/images/close.png',
            'quform/themes/light/images/input-active-bg-rep.png'
          ]);
    }

    if ($('.quform-theme-dark-dark, .quform-theme-dark-rounded').length) {
      images = images.concat([
            'quform/themes/dark/images/button-active-bg-rep.png',
            'quform/themes/dark/images/close.png',
            'quform/themes/dark/images/input-active-bg-rep.png',
            'quform/themes/dark/images/loading.gif'
          ]);
    }

    if ($('.quform-theme-minimal-light').length) {
      images = images.concat([
            'quform/themes/minimal/images/close-light.png'
          ]);
    }

    if ($('.quform-theme-minimal-dark').length) {
      images = images.concat([
            'quform/themes/minimal/images/close-dark.png',
            'quform/themes/minimal/images/loading-dark.gif'
          ]);
    }

    $.preloadImages(images);
  });
})(jQuery);