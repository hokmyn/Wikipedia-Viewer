$(document).ready(function() {
			//hiding or showing search box
	  	$("#searchIcon").on("click", function() {
	  		$("#searchInput").val( "" );
	  		$( this ).fadeOut(100, function() {
	  			$("#searchInput").fadeIn(1000, "linear");	  		
	  			$("#closeInput").fadeIn(1000, "linear");
	  		});	  			  		
	  	});
	  	$("#searchInput").on("blur", function() {	  		
	  		if($( this ).val() == "" && $("#articles").html() == "") {
		  		$("#closeInput").slideUp(200);
		  		$( this ).slideUp(200, function() {
		  			$("#searchIcon").slideDown();
		  		});  		
	  		}
	  	});
	  	$("#closeInput").on("click", function() {
	  		$("#searchInput").val( "" );
	  		$( this ).slideUp(50);
	  		$("#searchInput").slideUp(200, function() {
	  			$("#searchIcon").slideDown();
	  		});
	  	});
	  	//sending request to Wikipedia and processing of the received data
	  	$("form").on("submit", function(e) {
	  		e.preventDefault();	  		
	  		var title = $("#searchInput").val().trim();	  		
	  		if(title == "") {
	  			if($("#articles").html() != "") {
						$("#articles").html("");
					}
	  			$("#articles").append("<p class='error text-center'>Don't enter anything!</p>")
	  			return;
	  		}
	  		$("#searchInput").blur();
	  		$.ajax({
	  			url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+title+"&srprop=snippet&format=json&callback=?",
	  			type:'POST',
					dataType:'json',	      
	  		})
				.done (function(data) {
					if($("#articles").html() != "") {
						$("#articles").html("");
					}
					$.each(data.query.search, function() {						
						$("#articles").append("<div class='article'><a class='title' target='_blank' href="+"'https://en.wikipedia.org/wiki/"+this.title+"'>"+this.title+"</a><br>"+this.snippet+"...</div");
					});					
				})
				.fail (function() {
					alert("error");
				})				
	  	});	  	
		});
