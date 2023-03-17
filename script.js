let data;
getPopularMovies();

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