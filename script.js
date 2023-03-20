let data;
getPopularMovies();

// Get list of popular movies from API One
function getPopularMovies(){
    const request = new XMLHttpRequest;
    request.open("GET","https://api.themoviedb.org/3/discover/movie?api_key=ea21b9adbbf424fd68259ea26cdb0591", true);

    request.onload = function() {
        data = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Response OK.")

            data.results.forEach(
                movie =>
                {
                    let createRow = document.createElement("tr");
                    document.querySelector("#movieTable").append(createRow);

                    let newSlctElt = document.createElement("td");
                    let slctTextNode = document.createTextNode(movie.title);
                    newSlctElt.appendChild(slctTextNode);
                    document.querySelector("#movieTable").appendChild(newSlctElt);
                    let newSlctElt2 = document.createElement("td");
                    let slctTextNode2 = document.createTextNode(movie.overview);
                    newSlctElt2.appendChild(slctTextNode2);
                    document.querySelector("#movieTable").appendChild(newSlctElt2);
                    let newSlctElt3 = document.createElement("td");
                    let slctTextNode3 = document.createTextNode(movie.vote_average);
                    newSlctElt3.appendChild(slctTextNode3);
                    document.querySelector("#movieTable").appendChild(newSlctElt3);
                    let newSlctElt4 = document.createElement("td");
                    let slctTextNode4 = document.createTextNode(movie.release_date);
                    newSlctElt4.appendChild(slctTextNode4);
                    document.querySelector("#movieTable").appendChild(newSlctElt4);
                }
            )

        }
        else{
            console.log(`Error occurred. Status: ${request.status}`)
        }

    }

    request.send();
}

//Search for movie in API Two
function searchMovie(){
    const searchedMovie = document.querySelector("#titleToSearch").value;
    var IMDBID;
    searchableMovie = searchedMovie.replace(/\s/g, '%20');

    URLQuery = "https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/" + searchableMovie + "/?rapidapi-key=b6b4afebbfmsh76417d03defb3e7p185101jsn31487b9b83c2"
    console.log(URLQuery)
    const requestMovieInfo = new XMLHttpRequest;
    requestMovieInfo.open("GET", URLQuery, true);
   /*  URLQuery = "https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/" + searchableMovie 
    const requestMovieInfo = new XMLHttpRequest;
    requestMovieInfo.withCredentials = true;
    requestMovieInfo.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });
    requestMovieInfo.open("GET", URLQuery, true);
    requestMovieInfo.setRequestHeader("X-RapidAPI-Key", "b6b4afebbfmsh76417d03defb3e7p185101jsn31487b9b83c2");
    requestMovieInfo.setRequestHeader("X-RapidAPI-Host", "moviesminidatabase.p.rapidapi.com"); 
 */
    requestMovieInfo.onload = function() {
        data = JSON.parse(this.response);
        if(requestMovieInfo.status == 200){
            console.log('found movie')//working!!
            IMDBID = data.results.imdb_id
            console.log(IMDBID)
        }
        else{
            console.log(`Error occurred. Status: ${requestMovieInfo.status}`)
        }

    } 

    requestMovieInfo.send();
    return IMDBID;

    
    /* URLQuery = "https://api.themoviedb.org/3/search/movie?api_key=ea21b9adbbf424fd68259ea26cdb0591&query=" + searchableMovie
    console.log(URLQuery)

    document.getElementById("searchMovieBtn").addEventListener("click", function(){ alert("Hello World!"); });

    const requestMovieInfo = new XMLHttpRequest;
    requestMovieInfo.open("GET", URLQuery, true);

    requestMovieInfo.onreadystatechange = function() {
        data = JSON.parse(this.response);
        if(requestMovieInfo.status == 200){
            console.log('found movie')//working!!
            /* movieID = data.id
            console.log(movieID); */
            // source = 'https://api.themoviedb.org/3/search/movie?api_key=ea21b9adbbf424fd68259ea26cdb0591&query=' + searchableMovie + data.poster_path
            // image = document.createElement("img");
            // image.src = source;
            // document.querySelector("#poster").append(image);
}

//Show image from API One
function showImage(){
    const searchedMovie = document.querySelector("#searchMovie").value;
    searchableMovie = searchedMovie.replace(/ /g, "+");

    const request = new XMLHttpRequest;
    request.open("GET","https://api.themoviedb.org/3/search/movie?api_key=ea21b9adbbf424fd68259ea26cdb0591&query=" + searchableMovie, true);

    request.onload = function() {
        data = JSON.parse(this.response);
        if(request.status == 200){
            console.log('working') //working!!
            // source = 'https://api.themoviedb.org/3/search/movie?api_key=ea21b9adbbf424fd68259ea26cdb0591&query=' + searchableMovie + data.poster_path
            // image = document.createElement("img");
            // image.src = source;
            // document.querySelector("#poster").append(image);
        }
        else{
            console.log(`Error occurred. Status: ${request.status}`)
        }
    }

    request.send();
} 

//Load similar titles by using ID retrieved from API Two and inputting it into API One
function loadSimilarTitles(){
    document.querySelector("#movieLikability").innerHTML = "";
    //call returned IMDB ID from searchMovie()
    const requestFindByIMDBID = new XMLHttpRequest;
    var IMDBID = searchMovie();
    var TMDBID; 
    requestFindByIMDBID.open("GET","https://api.themoviedb.org/3/find/" + IMDBID + "?api_key=ea21b9adbbf424fd68259ea26cdb0591&language=en-US&external_source=imdb_id", true);
    requestFindByIMDBID.onload = function() {
        data = JSON.parse(this.response);
        if(request.status == 200){
            TMDBID = data.id;
        }
        else{
            console.log(`Error occurred. Status: ${requestFindByIMDBID.status}`)
        }
    }
    requestFindByIMDBID.send();
    //use ID to search similar titles 
    const requestFindSimilarByID = new XMLHttpRequest;
    requestFindSimilarByID.open("GET","https://api.themoviedb.org/3/movie/" + TMDBID + "/similar?api_key=ea21b9adbbf424fd68259ea26cdb0591&language=en-US&page=1", true);
    requestFindSimilarByID = function() {
        data = JSON.parse(this.response);
        if(request.status == 200){
            //print similar titles to page
        }
        else{
            console.log(`Error occurred. Status: ${requestFindSimilarByID.status}`)
        }
    }
    requestFindSimilarByID.send();
}

// Message for when user did not like movie
function didNotLike(){ 
    document.querySelector("#movieLikability").innerHTML = "I'm sorry you didn't like it!" 
}

// Clear radio buttons/associated output when submit new movie
function clearRadios(){
    document.querySelector('#no').checked = false;
    document.querySelector('#yes').checked = false;
    document.querySelector("#movieLikability").innerHTML = "";
}