$("#submit").on("click", function(event) {
    event.preventDefault();

    // clear the previous recipe search results images
    $(".recipe-return-1").empty();
    $(".recipe-return-2").empty();

    //records inputs from user
    first = $("#ingredient1").val().trim();
    second = $("#ingredient2").val().trim();
    third = $("#ingredient3").val().trim();

    //makes sure user inputs all three ingredients
    if (first == "" || first == null || second == "" || second == null || third == "" || third == null) {
        return false;
    }
    //calling id outside of the query, not sure if we still need
    var eyed;
    var recipesToSendToServer = [];
    //creates queryURL for easy application
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=" + first + "%2C" + second + "%2C" + third + "&limitLicense=false&number=10&ranking=1"
        //ajax call
    $.ajax({
        url: queryURL,
        method: "GET",
        datatype: 'json',
        //this function applies the api key for Market Mashape Spoonacular API
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "WV9z9ECdtMmsh1pDfZsZxoKdu9R7p1it0ZDjsnlsAash3p31Fr");
        }
    }).done(function(response) {

        //iterates over results
        for (var i = 0; i < response.length; i++) {
            //image array
            var imgURL = response[i].image;
            //recipe id array
            var eyed = response[i].id;
            //name of recipe array
            var title = response[i].title;
            //removes spaces from title and adds dashes
            var titleReplace = title.replace(/\s+/g, '-');
            //creates the link to the recipe as the orginal object does not return a url
            var queryTitle = "https://spoonacular.com/" + titleReplace + "-" + eyed;

            // creats level div to put items in a row
            var levelDiv = $("<div/>").addClass("level-item has-text-centered");
            var titleTag = $("<div><p class='heading'>" + title + "</p></div>");
            var imgTag = $("<div class ='imageDiv'><a href=" + queryTitle + " target='blank'><img class='image1' src=" + imgURL + "></a></div>");
            $(titleTag).append(imgTag);
            $(levelDiv).append(titleTag);

            // Puts first five items in first row, next five in second row
            if (i < 5) {
                $(".recipe-return-1").append(levelDiv);
            } else {
                $(".recipe-return-2").append(levelDiv);
            }

            // create array of objects that match the structure of our model
            recipesToSendToServer.push({
                api_id: response[i].id, //any reason we are not using the var above - eyed
                title: response[i].title, //any reason we are not using the var above - title
                image_url: response[i].image, //any reason we are not using the var above - imgURL
                recipe_url: queryTitle
            });


            // //creates a div for the image taken
            // var imgDiv = $("<div class = 'container' >");
            // //creates a paragraph for the title of the recipe
            // var titleDiv = $("<p class = 'titleRec' >");
            // $(".recipe-return").append(titleDiv);
            // var link = $("<a>").attr("href", queryTitle).attr("target", "blank");
            // var image = $("<img class='image1 level-left image'>").attr("src", imgURL);
            // titleDiv.append(title);
            // imgDiv.append(image);
            // $(image).wrap(link);
            // $(".recipe-return").append(imgDiv);
        } //end of for loop
        console.log(response);
        // Sends a request to our server
        $.ajax({
                url: "/api/recipes",
                method: "POST",
                datatype: 'json',
                data: { recipes: recipesToSendToServer, foo: "foo" } // makes an object so we can capture an array of objects
            })
            // .done(function(response) {});
    });
});