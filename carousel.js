function Carousel() {
	this.images = ['http://ichef-1.bbci.co.uk/news/660/cpsprodpb/17A21/production/_85310869_85310700.jpg',
	 'http://cdn.androidbeat.com/wp-content/uploads/2015/12/google-logo.jpg'];
	this.currentIndex = 0;	
	
	this.next = function() {	
		this.currentIndex = this.getNextIndex();		
		this.render();
	}
	
	this.prev = function() {
		this.currentIndex = this.getPrevIndex();
		this.render();
	}
	
	this.getNextIndex = function() {
		var nextIndex = this.currentIndex + 1;
		nextIndex %= this.images.length;
		return nextIndex;
	}
	
	this.getPrevIndex = function() {
		var prevIndex = this.currentIndex - 1;
		if (prevIndex < 0)
		  prevIndex = this.images.length - 1;
		return prevIndex;
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
		$("#view").css('background-image', 'url("'+ theImage +'")');
		$("#view").css('background-size', 'contain');
		$("#view").css('background-position', 'center center');
	  $("#view").css('background-repeat', 'no-repeat');
		
		this.updateSelectedCircle(this.currentIndex);
	}
	
	this.updateSelectedCircle = function(index) {
		$("#circles > .circle").removeClass('circle-filled');
		$("#circles > .circle:eq("+this.currentIndex+")").addClass('circle-filled');
	}
		
	var self = this;
	
	self.loop = function() {				
		setInterval(function() {self.next();}, 5000);
	}
	
	this.setup = function() {
		
		this.generateCarousel();				
					
		// Register event handlers:		
		
		$("#next").click(function(){		
			self.next();			
		});
		
		$("#prev").click(function(){		
			self.prev();			
		});
				
		$("#preview > .preview").click(function() { 
			self.goToImage( $(this).index() ); 
		});
		
		$("#circles > .circle").click(function() {			
			self.goToImage( $(this).index() ) ;
			self.updateSelectedCircle( $(this).index() );
		});
		
		$("button").hover(
			function(){
				var buttonId = $(this).prop("id");
				
				// Leave if this is any button other than next or prev.
				if (buttonId !== "next" && buttonId !== "prev")
					return;
											
				$("body").append("<div class='preview-popup'></div>");
				if ( buttonId === "next") {
					$(".preview-popup").css('left', $(this).position().left - 100);
					$(".preview-popup").css('background-image', 'url("'+ self.images[ self.getNextIndex() ] +'")');	
				} else if ( buttonId === "prev") {
					$(".preview-popup").css('left', $(this).position().left + $(this).width() + 50 );
					$(".preview-popup").css('background-image', 'url("'+ self.images[ self.getPrevIndex() ] +'")');
				}								
				$(".preview-popup").css('background-size', 'contain');
				$(".preview-popup").css('background-repeat', 'no-repeat');
			},
		
			function() {
				$(".preview-popup").remove();
			}
		);
				
	}
	
	this.generateCarousel = function() {
		$("#carousel").append("<div><button id='prev'>&lt;</button></div>");		
		$("#carousel").append("<div><button id='next'>&gt;</button></div>");
		$("#carousel").append("<div id='view'></div><div id='preview'></div>");
					
		for(var i = 0; i < this.images.length; i++) {
			$("#preview").append("<div class='preview'><img src='"+ this.images[i] +"'></div>");
		}
		
		$("#preview").after("<div id='circles'></div>");
		for(var i = 0; i < this.images.length; i++) {
			$("#circles").append("<div class='circle'></div>");
		}
	}
		
	this.setup();
	this.render();
	
}


$(function() {	
	var car = new Carousel();
	car.loop();	
});
