var button = document.querySelector('.href');

button.addEventListener("click", function(){
  window.location.href = "http://127.0.0.1:5501/index.html";
});

var button = document.querySelector('.href');

button.addEventListener("click", function(){
  window.location.href = "http://127.0.0.1:5501/index.html";
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    'Content-Type': 'application/json;charset=utf-8',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTI3ZTRmNTE5NGE5Y2I4MjM1ODQwYzUzZTYwN2QwYyIsInN1YiI6IjY2MjljYmQ4OGQ3N2M0MDA5YjJkN2NhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4rAgqLmw9SuSgTo__-CeayGcrzowkMVcMPPhswcNAo',
  },
};

const fetchMovieData = async () => {
  const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
  const dataResponsed = await data.json();
  return dataResponsed.results; 
};

const makeMovieCard = async () => {
  const movies = await fetchMovieData();
  const cardList = document.querySelector('.cardList');
  if (cardList) {
    cardList.innerHTML = movies.map(
        (movie) => `
      <div class="movieCard" id="${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" >
        <h3 class="cardTitle">${movie.title}</h3>
        <p>${movie.overview}</p>
        <p>${movie.release_date}</p>
        <p>Rating : ${movie.vote_average}</p>
      </div>`
      )
      .join("");
      handleSearch();
  } else {
    console.error("The element with class 'cardList' was not found.");
  }
}; 

const handleSearch = () => {
  const movieCards = document.querySelectorAll('.movieCard');

  movieCards.forEach((card) => { 
    const cardId = card.id; // id를 가져오rp
    const exportId = localStorage.getItem('exportId');

    if (cardId === exportId) {
      card.style.display = "block"; // display를 보이게 하기
    } else {
      card.style.display = "none"; // display를 안 보이게 하기
    }
  });
};

makeMovieCard();