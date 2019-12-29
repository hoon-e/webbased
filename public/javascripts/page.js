var Page = (function() {

	var $container = $( '#container' ),
		$bookBlock = $( '#bb-bookblock' ),
		$items = $bookBlock.children(),
		itemsCount = $items.length,
		current = 0,

		bb = $( '#bb-bookblock' ).bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
			onEndFlip : function(old, page, isLimit) {
				
				current = page;
			
				updateTOC();
			
				updateNavigation( isLimit );
			
				setJSP( 'init' );
		
				setJSP( 'destroy', old );

			}
		} ),
		$navNext = $( '#bb-nav-next' ),
		$navPrev = $( '#bb-nav-prev' ).hide(),
		$menuItems = $container.find( 'ul.menu-toc > li' ),
		// $tblcontents = $( '#tblcontents' ),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		supportTransitions = Modernizr.csstransitions;

	function init() {

		
		setJSP( 'init' );
		initEvents();

	}
	

	function initEvents() {


		$navNext.on( 'click', function() {
			bb.next();
			return false;
		} );

		$navPrev.on( 'click', function() {
			bb.prev();
			return false;

			

			} );
		

		
	
		$menuItems.on('click', function() {

			var $el = $( this ),
				idx = $el.index();
			
			
				if(current < idx){
				

						bb.jump(idx + 1);

				}
				else if(current > idx){
		
						bb.jump(idx +1);
			}
		
		
		

			return false;
		} );

	
		$( window ).on( 'debouncedresize', function() {
			
			setJSP( 'reinit' );
		} );

	}

	function setJSP( action, idx ) {
		
		var idx = idx === undefined ? current : idx,
			$content = $items.eq( idx ).children( 'div.content' ),
			apiJSP = $content.data( 'jsp' );
		
		if( action === 'init' && apiJSP === undefined ) {
			$content.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}

	  function updateTOC() {
 	   $menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
	    }

	function updateNavigation( isLastPage ) {
		
		if( current === 0 ) {
			$navNext.show();
			$navPrev.hide();
		}
		else if( isLastPage ) {
			$navNext.show();
			$navPrev.show();
		}
		else {
			$navNext.show();
			$navPrev.show();
		}
	}

	return { init : init };

})();