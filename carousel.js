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
		$("#carousel").append("<div id='view'>view</div><div id='preview'>preview</div>");
	}
	
	this.setup();
	this.render();
	
}


$(function() {	
	var car = new Carousel();
	
});
