//create a topics array to hold the initial set of gif buttons
var topics = ['batman', 'superman', 'spiderman', 'the flash', 'iron man', 'wolverine', 'hulk', 'captain america', 'thor', 'wonder woman', 'deadpool'];

//call the gifButtons function initially to display the first buttons
gifButtons();

//create a function to run an AJAX call for the gif information 
//render the HTML to display the content in the function
function showGifs(){
    
    var hero = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + hero + "&api_key=dc6zaTOxFJmzC&limit=10"

    $.ajax({
        url: queryURL,
        method: 'GET'})
        
        .done(function(response) {
            $("#gifview").empty();
            console.log(response);
            var gifDisplay = $("<div>");
            
            for(var i=0; i < response.data.length; i++){
            var imagediv = $("<img>");
            var rating = response.data[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            imagediv.attr("src", response.data[i].images.original.url);
            gifDisplay.append(p);
            gifDisplay.append(imagediv);
            
            }

            $("#gifview").append(gifDisplay);
        });

}


//create a function to display the gifs in the array in button format 
//delete the html contents prior to iterating through the array when function is called
//loop through the array and dynamically generate button 
//append the button to "#buttons-layout" to display the content
function gifButtons(){
    
    $("#buttons-layout").empty();

    for (var i = 0; i < topics.length; i++){
    
    var button = $("<button>");
    button.addClass("hero"); 
    button.attr("data-name", topics[i]);
    button.text(topics[i]);

    $("#buttons-layout").append(button);
    }
}

//create an on.("click") anonymous function to run the code
//when the submit button is hit
//grab the input from the "#textinput" div
//.push the input to the gifs array 
//call the function to loop through the array and display the button layout
$("#gif-submit").on("click", function(event){
    
    event.preventDefault();
    var topic = $("#textinput").val().trim();
    topics.push(topic);
    gifButtons();

});

//create a $(document).on("click", [buttonclass], [AJAX function]); to target
//the dynamically-generated gif button being hit, and display the gif content from giphy
$(document).on("click", ".hero", showGifs);


// //javascript, jQuery
// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });