let data;
getPopularMovies();
var IMDBID;
//var TMDBID;

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
function searchMovie(){
    const searchedMovie = document.querySelector("#titleToSearch").value;
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
            console.log('found movie')
            IMDBID = data.results[0].imdb_id
            console.log(IMDBID)      
        }
        else{
            console.log(`Error occurred. Status: ${requestMovieInfo.status}`)
        }

    } 

    requestMovieInfo.send();
    return IMDBID;
}
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
function loadSimilarTitles(){
    var TMDBID;
    //call returned IMDB ID from searchMovie()
    const requestFindByIMDBID = new XMLHttpRequest;
    var secondAPIURL = "https://api.themoviedb.org/3/find/" + IMDBID + "?api_key=ea21b9adbbf424fd68259ea26cdb0591&language=en-US&external_source=imdb_id";
    console.log(secondAPIURL);
    requestFindByIMDBID.open("GET", secondAPIURL, true);
    requestFindByIMDBID.onload = function() {
        data = JSON.parse(this.response);
        if(requestFindByIMDBID.status == 200){
            console.log('connected to second API')
            TMDBID = data.movie_results[0].id;
            console.log(TMDBID)
        }
        else{
            console.log(`Error occurred. Status: ${requestFindByIMDBID.status}`)
        }
    TMDBIDString = TMDBID.toString()
    //console.log(TMDBIDString)
    return(TMDBIDString);
    }
    requestFindByIMDBID.send();

    //use ID to search similar titles 
    console.log(TMDBIDString)
    var similarTitlesURL = "https://api.themoviedb.org/3/movie/" + TMDBIDString + "/similar?api_key=ea21b9adbbf424fd68259ea26cdb0591&language=en-US&page=1"
    console.log(similarTitlesURL)

    const requestFindSimilarByID = new XMLHttpRequest;
    requestFindSimilarByID.open("GET", similarTitlesURL, true);
    requestFindSimilarByID.onload = function() {
        data = JSON.parse(this.response);
        if(requestFindSimilarByID.status == 200){
            console.log('similar titles query complete')
            data.results.forEach(
                film =>
                {
                    console.log(film.original_title);
                }
            )
        }
        else{
            console.log(`Error occurred. Status: ${requestFindSimilarByID.status}`)
        }
    }
    requestFindSimilarByID.send(); 
}