let data;
getMovieAPIData();

// function getMovieAPIData(){
//     const request = new XMLHttpRequest;
//     request.open("GET","https://api.themoviedb.org/3/movie/550?", true);
//     request.setRequestHeader('key','ea21b9adbbf424fd68259ea26cdb0591');
// }

function getMovieAPIData(){
    const request = new XMLHttpRequest;
    request.open("GET","https://api.themoviedb.org/3/discover/movie?api_key=ea21b9adbbf424fd68259ea26cdb0591", true);
    // request.setRequestHeader('key','ea21b9adbbf424fd68259ea26cdb0591');

    request.onload = function() {
        data = JSON.parse(this.response);

        if(request.status == 200){
            console.log("Response OK.")

            data.results.forEach(
                movie =>
                {
                    let newSlctElt = document.createElement("option");
                    let slctTextNode = document.createTextNode(movie.title);
                    newSlctElt.appendChild(slctTextNode);
                    document.querySelector("#popMovies").appendChild(newSlctElt);
                }
            )

        }
        else{
            console.log(`Error occurred. Status: ${request.status}`)
        }

    }

    request.send();
}

function callMovieInfo(){

}
