var button = document.querySelector(".href");

button.addEventListener("click", function () {
  window.location.href = "http://127.0.0.1:5501/index.html";
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json;charset=utf-8",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTI3ZTRmNTE5NGE5Y2I4MjM1ODQwYzUzZTYwN2QwYyIsInN1YiI6IjY2MjljYmQ4OGQ3N2M0MDA5YjJkN2NhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4rAgqLmw9SuSgTo__-CeayGcrzowkMVcMPPhswcNAo"
  }
};

const fetchMovieData = async () => {
  const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
  const dataResponsed = await data.json();
  console.log(dataResponsed);
  return dataResponsed.results;
};

const makeMovieCard = async () => {
  const movies = await fetchMovieData();
  const cardList = document.querySelector('.cardList');

  if (cardList) {
    cardList.innerHTML = movies
      .map(
        (movie) => `
      <div class="movieCard" id="${movie.id}">
      <h1>${movie.title}</h1>
        <div class="movie_image">
          <img id="test" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" >
          <div class="cardText" style="float:right">
          <h4>Date : ${movie.release_date}</h4>
          <h4>Rating : ${movie.vote_average}</h4>
          <h3>Story Line<h3>
          <h4 id="text">${movie.overview}</h4>
          </div>
        </div>
      </div>`
      )
      .join("");
    handleSearch();
  } else {
    console.error("The element with class 'cardList' was not found.");
  }
};

const handleSearch = () => {
  const movieCards = document.querySelectorAll(".movieCard");
  console.log(movieCards);
  movieCards.forEach((card) => {
    const cardId = card.id; // id를 가져오rp
    const exportId = localStorage.getItem("exportId");

    if (cardId === exportId) {
      card.style.display = "block"; // display를 보이게 하기
    } else {
      card.style.display = "none"; // display를 안 보이게 하기
    }
  });
};

makeMovieCard();
