let data;
getMovieAPIData();

function getMovieAPIData(){
    const request = new XMLHttpRequest;
    request.open("GET","https://api.themoviedb.org/3/movie/550?", true);
    request.setRequestHeader('key','ea21b9adbbf424fd68259ea26cdb0591');
}
