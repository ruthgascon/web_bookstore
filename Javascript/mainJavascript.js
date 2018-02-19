$(document).ready(function(){
	$.getJSON( "https://api.myjson.com/bins/udbm5", function() {
	}).done(function(data){
		var books = data.books;
		//MUSTACHE
		var template = $("#templateMustache").html();
		Mustache.parse(template);
		var rendered = Mustache.render(template, data)
		$('#booksSpace').html(rendered);
		console.log (books);
		//MUSTACHE
		$("[data-fancybox]").fancybox({

		});
		$(".group1").fancybox({
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	});
});


// quick search regex
var qsRegex;

function searchBar () {

	// init Isotope
	var $grid = $('.grid').isotope({
		itemSelector: '.element-item',
		layoutMode: 'fitRows',
		filter: function () {
			return qsRegex ? $(this).text().match(qsRegex) : true;
		}
	});

	// use value of search field to filter

	$(document).ready(debounce(function () {

		qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		$grid.isotope();	
	},10));

	var $quicksearch = $('#quicksearch').keyup( debounce( function() {

		qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		$grid.isotope();
	},200));
};

function debounce( fn, threshold ) {
	var timeout;
	return function debounced() {
		if ( timeout ) {
			clearTimeout( timeout );
		}
		function delayed() {
			fn();
			timeout = null;
		}
		setTimeout( delayed, threshold || 100 );
	};
};