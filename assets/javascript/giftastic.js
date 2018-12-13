// dog array that will be dispalyed as the inital buttons
var dogs = ['Chihuahua', 'Husky', 'Pug', 'Corgi', 'Golden Retreiver'];

// function for displaying dogs as buttons
function renderButtons(){ 
	//This method removes  child (and other descendant) elements and  text within the set of matched elements. 
	$('#dogGifs').empty();
	//start for loop to display buttons
	for (var i = 0; i < dogs.length; i++){
		var pupper = $('<button>').attr('type', 'button').addClass('btn btn-default');
		pupper.addClass('dogs');
		pupper.attr('data-name', dogs[i]);
		pupper.text(dogs[i]);
		$('#dogGifs').prepend(pupper);
	}	
};


// submit button function for the dogs searched and a modal alert when nothing is entered
$('#addDog').on('click', function(){
	$('#images').empty();
	var dog = $('#dog-input').val().trim();
	if ($('#dog-input').val().trim() === ""){
		$('#alertModal').modal();
	}

	else {
		dogs.push(dog);
		renderButtons(); 
		renderFunction(dog);
	}	
	return false;
});


// Pause or play on click function
$(".gifParent").on("click", ".gif", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      }
      
      else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }
    });

// function that pulls the giphy API and images
function renderFunction(dog){
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&limit=12&api_key=4Qo4Kuh6RgHbQx2vOYvaOUvoDKEqF8ju";
	$.ajax({
		url: queryURL,
		method: "GET"		
	})

	.done(function(response) {
		console.log(response);

		for (var i = 0; i < response.data.length; i++) {
			var container = $("<div>").addClass("gifParent col-sm-6 col-lg-3");
			var dogImage = $("<img>").addClass("img-rounded img-responsive");
			var rating = $("<p>").text("rating: " + response.data[i].rating);
			configImg(response.data[i], dogImage);
    		container.append(rating);
    		container.append(dogImage);
    		$("#images").append(container);
		};
	});
};

$('#dogGifs').on('click keypress', '.dogs', function(){
	$('#images').empty();
	var dog = $(this).attr('data-name');
	renderFunction(dog);
});


// Image attributes
function configImg(data, image, dog){
	var imageURL = data.images.fixed_height.url;
	var imageURLStill = data.images.fixed_height_still.url;
	image.addClass("gif");
	image.attr("src", imageURLStill);
	image.attr("alt", dog);
    image.attr("data-state", "still");
    image.attr("data-still", imageURLStill);
    image.attr("data-animate", imageURL);
};
// calling first function
renderButtons();
