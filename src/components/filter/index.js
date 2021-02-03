import { films } from '../../pages/home/mock.js'
import { printFilms, getFilms } from '../../pages/home/index.js'

export const createMenuFilter = () => {
  const filterContent = document.createElement('section');
  filterContent.classList.add('conteudo-section');
  filterContent.innerHTML = `
    <p> Filters: </p>
      <div class="filter-list">
        <select class="select-genre" id="genre">
            <option class="select-genre" value="genre" selected="disabled">Genre</option>
            <option class="select-genre" value="sci-fi">Sci-Fi</option>
            <option class="select-genre" value="drama">Drama</option>
            <option class="select-genre" value="comedy">Comedy</option>
            <option class="select-genre" value="horror">Horror</option>
            <option class="select-genre" value="fantasy">Fantasy</option>
            <option class="select-genre" value="animation">Animation</option>
            <option class="select-genre" value="documentary">Documentary</option>
          </select>
    </div>

      <div class="country-list">
      <select class="select-country" id="country">
          <option class="select-country" value="country" selected="disabled">Nationalities</option>
          <option class="select-country" value="Australia">Australia</option>
          <option class="select-country" value="Brazil">Brazil</option>
          <option class="select-country" value="Brazil, France">Brazil, France</option>
          <option class="select-country" value="Canada">Canada</option>
          <option class="select-country" value="China, USA">China, USA</option>
          <option class="select-country" value="Denmark, Iran">Denmark, Iran</option>
          <option class="select-country" value="France">France</option>
          <option class="select-country" value="Germany">Germany</option>
          <option class="select-country" value="Germany, West Germany">Germany, West Germany</option>
          <option class="select-country" value="Israel">Israel</option>
          <option class="select-country" value="Ireland">Ireland</option>
          <option class="select-country" value="Netherlands">Netherlands</option>
          <option class="select-country" value="New Zealand">New Zealand</option>
          <option class="select-country" value="Norway">Norway</option>
          <option class="select-country" value="Pakistan, USA">Pakistan, USA</option>
          <option class="select-country" value="South Africa, Kenya">South Africa, Kenya</option>
          <option class="select-country" value="Spain">Spain</option>
          <option class="select-country" value="Sweden">Sweden</option>
          <option class="select-country" value="UK">UK</option>
          <option class="select-country" value="UK, France">UK, France</option>
          <option class="select-country" value="UK, Portugal">UK, Portugal</option>
          <option class="select-country" value="USA">USA</option>
          <option class="select-country" value="USA, China">USA, China</option>
          <option class="select-country" value="USA, France">USA, France</option>
        </select>
      </div>
    

      <div class="score">
        <input type="range" min= "0" max= "10" step="0.1" id="imdbRating">
        <label for="imdb"> Imdb Score </label>
        <p id="value-area"></p>
      </div>


      
      <div class="year-movie">
        <input type="range" min="1900" max="2021"  step="1" id="Year">
        <label for="year"> Year: <span class="filter-subtitle"> 1900 - 2021 </span></label>
        <p id="year-area"></p>
      </div>
          
      <div class="time">
        <input type="range" min="1" max="40" id="Runtime">
        <label for="runtime"> Runtime: <span class="filter-subtitle">0 - 40 minutes </span> </label>
        <p id="time-area"></p>
      </div>
      
      <button class="clear" type="button" id="btn-clear" value="Clear">Clear</button>
      <button class="filter-btn" type="button" id="btn-filter" value="Filter">Filter</button>
    `;

  const filterByCountry = filterContent.querySelector('#country');
  filterByCountry.addEventListener('change', () => {
    document.querySelector('#catalogue').innerHTML = ' ';
    const chooseFilter = filterByCountry.value;
    filterData("Country", chooseFilter);
  });

  const filterByYear = filterContent.querySelector('#Year');
  filterByYear.addEventListener('change', () => {
    document.querySelector('#catalogue').innerHTML = ' ';
    filterData("Year", filterByYear.value)
  });

    const filterByRunTime = filterContent.querySelector('#Runtime');
    filterByRunTime.addEventListener('change', () => {
      document.querySelector('#catalogue').innerHTML = ' ';
      const timeArea = document.querySelector('#time-area');
      timeArea.innerHTML = `${filterByRunTime.value} min`;
      const getCondition = `${filterByRunTime.value} min`;
      filterData("Runtime", getCondition)
    });

  const filterByImdb = filterContent.querySelector('#imdbRating');
  filterByImdb.addEventListener('change', () => {
    document.querySelector('#catalogue').innerHTML = ' ';
    filterData("imdbRating", filterByImdb.value)
  });

  const filterByGenre = filterContent.querySelector('#genre');
  filterByGenre.addEventListener('change', () => {
      document.querySelector('#catalogue').innerHTML = ' ';
      for (const i of films) {
        if (filterByGenre.value === i.genre) {
          getFilms(i);
        }

      }
    });
    
  const filterData = (type, condition) => {
    const getCatalogueSection = document.querySelector('#catalogue');
    for (const i of films) {
      fetch(`https://www.omdbapi.com/?t=${i.title}&apikey=ce12da02`)
        .then((response) => response.json())
        .then((json) => {
          if (json[type] === condition) {
            getCatalogueSection.innerHTML = '';
            getCatalogueSection.appendChild(printFilms(json));
            printFilms(json);
          }
        });
    }
  };

  return filterContent;
};
