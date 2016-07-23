function Carousel() {
	this.images = ['http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg',
	 'http://cdn.androidbeat.com/wp-content/uploads/2015/12/google-logo.jpg'];
	this.currentIndex = 0;	
	
	this.next = function() {
		this.currentIndex++;
		this.currentIndex %= this.images.length;
		this.render();
	}
	
	this.prev = function() {
		this.currentIndex--;
		if (this.currentIndex < 0)
		  this.currentIndex = this.images.length - 1;
		this.render();
	}
	
	this.goToImage = function(index) {
		var length = this.images.length;
		if (index >= 0 && index < length ) {
			this.currentIndex = index;
			this.render();
		}
	}
	
	this.render = function() {		
		var theImage = this.images[this.currentIndex];
		$("#view").empty();		
		$("#view").append("<img src='"+ theImage +"'>");		
	}
	
	this.setup = function() {
		$("#carousel").append("<div id='view'></div><div id='preview'></div>");		
		for(var i = 0; i < this.images.length; i++) {
			$("#preview").append("<div class='preview'><img src='"+ this.images[i] +"'></div>");
		}
		$("#preview").prepend("<div><button id='prev'>Prev</button></div>");
		$("#preview").append("<div><button id='next'>Next</button></div>");
		$("#preview").append("<div id='circles'></div>");
		for(var i = 0; i < this.images.length; i++) {
			$("#circles").append("<div class='circle'></div>");
		}
		
		self = this;
		
		$("#next").click(function(){		
			self.next();			
		});
		
		$("#prev").click(function(){		
			self.prev();			
		});
		
		// Click on an image in the preview pane to load it in the view
		$("#preview > .preview").click(function() { 
			self.goToImage( $(this).index() - 1 ); 
		});
		
		$("#circles > .circle").click(function() {			
			self.goToImage( $(this).index() ) ;
			$("#circles > .circle").removeClass('circle-filled');
			$(this).addClass('circle-filled');
		});
		
	}
	
	this.setup();
	this.render();
	

}


$(function() {	
	var car = new Carousel();
	
});
