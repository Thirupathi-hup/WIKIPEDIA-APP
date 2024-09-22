let inputEl = document.getElementById("inputId");
let spinnerEl = document.getElementById("spinner");
let searchResultEl = document.getElementById("SearchResults");

function createWikipediaResult(result) {
  let { link, title, description } = result;

  let listContainer = document.createElement("div");
  searchResultEl.appendChild(listContainer);
  let titleEl = document.createElement("a");
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  titleEl.href = link;
  titleEl.target = "_blank";
  listContainer.appendChild(titleEl);
  let breakEl = document.createElement("div");
  listContainer.appendChild(breakEl);
  let linkEl = document.createElement("a");
  linkEl.textContent = link;
  linkEl.href = link;
  linkEl.target = "_blank";
  linkEl.classList.add("result-url");
  listContainer.appendChild(linkEl);
  let descriptionEl = document.createElement("p");
  descriptionEl.textContent = description;
  descriptionEl.classList.add("link-description");
  listContainer.appendChild(descriptionEl);
}

function displayResults(search_results) {
  spinnerEl.classList.add("d-none");

  for (let result of search_results) {
    createWikipediaResult(result);
  }
}

function getData(event) {
  if (event.key === "Enter") {
    spinnerEl.classList.remove("d-none");
    searchResultEl.textContent = ""; // result area emepty when user search new word//
    let userInput = event.target.value;
    let url = "https://apis.ccbp.in/wiki-search?search=" + userInput;
    let option = {
      method: "GET",
    };

    fetch(url, option)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        let { search_results } = jsonData;
        console.log(jsonData);
        displayResults(search_results);
      });
  }
}

inputEl.addEventListener("keydown", getData);
