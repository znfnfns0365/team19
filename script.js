const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const editId = document.getElementById("cardSpace");
const cardsClick = document.querySelector(".cards");
const titleClick = document.getElementById("title");

// getElementById와 querySelector 차이 (ID를 불러올 때)

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGM4OGNlYWFlNzM1MTU1ZDM5YzZhZDNjZTFlN2FiYiIsInN1YiI6IjY2MmI0ZWY5NWMwNzFiMDExYzVlOGEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNpJDRr1L7kWApfidXYuOYPhFYLWnSW_z-oQuq0VEwo"
  }
};

const fetchMovie = async () => {
  const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
  const dataResponsed = await data.json();
  displayMovies(dataResponsed);
  makeEvent(dataResponsed);
};

const search = (data) => {
  let getArr = Array.from(data.results);
  let filteredArr = getArr.filter(function (obj) {
    const cmp = obj.title.toLowerCase();
    return cmp.includes(searchInput.value.toLowerCase());
  });
  if (filteredArr.length == 0) {
    alert("검색 결과가 없습니다.");
    return;
  }
  editId.innerHTML = null;
  const element = document.querySelector(".cards");
  element.style.margin = "0px";
  for (let i = 0; i < filteredArr.length; i++) {
    editId.innerHTML += getMovieCode(filteredArr[i]);
  }
  return;
};

function cardClicked(event) {
  if (event.target === event.currentTarget) return;

  if (event.target.matches(".card")) {
    alert(`영화 id: ${event.target.id}`);
  } else {
    alert(`영화 id: ${event.target.parentNode.id}`);
  }
}

const makeEvent = (data) => {
  searchButton.addEventListener("click", () => {
    search(data);
  });
  searchInput.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
      search(data);
    }
  });
  cardsClick.addEventListener("click", cardClicked);
  titleClick.addEventListener("click", () => {
    location.reload(true);
  });
};

function getMovieCode(movie) {
  const { id, poster_path, title, overview, vote_average } = movie; // alert에서 밖에 "없이 띄어쓰기 하면 오류나는 이유..?
  // const movieCode = `<div onclick="alert('영화 id: ' + '${id}')" id="${id}" class="card">
  const movieCode = `<div id="${id}" class="card">
          <img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="card-img-top">
          <h2 class="card-title">${title}</h2>
          <p class="card-text">${overview}</p>
          <p></p>
          <p class="card-rating">Rating: ${vote_average}</p>
        </div>`;
  return movieCode;
}

function displayMovies(data) {
  data.results.forEach((movie) => {
    editId.innerHTML += getMovieCode(movie);
  });
}

window.onload = function () {
  searchInput.focus();
};

fetchMovie();
