const searchbtn = document.getElementById("music-search");
searchbtn.addEventListener("click",function(){
    const musicTitle = document.getElementById("music-title").value;
    // console.log(musicTitle);
    const searchButton = document.getElementById("search-result");
    // searchButton.innerHTML = '';
    // musicTitle.innerText = '';
    const url = `https://api.lyrics.ovh/suggest/${musicTitle}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayMusicData(data.data))

})

function displayMusicData(music) {
    for(let i = 0; i<music.length; i++){
        const allMusic = music[i];
        const musicName = allMusic.title;
        // console.log(allMusic);
        const mainDiv = document.getElementById("search-result");
        const singleResult = document.createElement("div");
        singleResult.className = "search-result col-md-8 mx-auto py-4";
        singleResult.innerHTML = ` 
            <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${musicName}</h3>
                <p class="author lead">Album by <span>${allMusic.artist.name}</span></p>
                <img src="${allMusic.artist.picture}">
                <audio controls>
                       <source src="${allMusic.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick= "displayMusicLyrics('${allMusic.artist.name}' , '${musicName}')"; class="btn btn-success">Get Lyrics</button>
            </div>
            </div>
         
        `
        mainDiv.appendChild(singleResult);

    }
  
}

const displayMusicLyrics = (artistName , musicName) =>{
    const url = `https://api.lyrics.ovh/v1/${artistName}/${musicName}`
    fetch(url)
    .then (res => res.json())
    .then (data => displayLyrics(data))
 }

 const displayLyrics = lyric =>{
    const lyricsDiv = document.getElementById("lyrics");
    lyricsDiv.innerText = lyric.lyrics;
 }
 

