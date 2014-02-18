/*! appendAround markup pattern. [c]2012, @scottjehl, Filament Group, Inc. MIT/GPL 
how-to:
1. Insert potential element containers throughout the DOM
2. give each container a data-set attribute with a value that matches all other containers' values
3. Place your appendAround content in one of the potential containers
4. Call appendAround() on that element when the DOM is ready
*/
(function( $ ){
	$.fn.appendAround = function() {

		// Rewrote this because it was looking at parent elements (wha?!), instead
		// we just use the elements contents that we're showing/hiding. - jcontonio
	
		return this.each(function() {

			var tm,
					$self = $(this),
					attval = $self.attr('data-set'),
					$set = $("[data-set='" + attval + "']");

			function isHidden(elem) {
				return $(elem).css( "display" ) === "none";
			}

			function appendToVisibleContainer() {
				clearTimeout(tm);
				if(isHidden($self)) {
					tm = setTimeout(function() {
						var found = 0;
						$set.each(function() {
							if(!isHidden(this) && !found) {
								$(this).html($self.html());
								found++;
							}
						});
					}, 800);
				}
			}

			appendToVisibleContainer();

			$(window).bind("resize", appendToVisibleContainer);

		});

	};

}(jQuery));
