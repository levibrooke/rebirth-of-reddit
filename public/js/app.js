// create structure
function buildStructure() {
  let body = document.body;
  let container = document.createElement("div");
  container.id = "container";
  let header = document.createElement("header");
  container.appendChild(header);

  let logo = document.createElement("img");
  logo.setAttribute("src", "assets/logo.svg");
  header.appendChild(logo);

  let plusButton = document.createElement("button");
  header.appendChild(plusButton);

  let nav = document.createElement("nav");
  nav.id = "board-nav";
  container.appendChild(nav);

  let navOne = document.createElement("a");
  navOne.innerText = "MLS";
  navOne.id = "board-one";
  nav.appendChild(navOne);

  let navTwo = document.createElement("a");
  navTwo.innerText = "FootballTactics";
  navTwo.id = "board-two";
  nav.appendChild(navTwo);

  let navThree = document.createElement("a");
  navThree.innerText = "WorldFootball";
  navThree.id = "board-three";
  nav.appendChild(navThree);

  let navFour = document.createElement("a");
  navFour.innerText = "Random";
  navFour.id = "board-four";
  nav.appendChild(navFour);

  let main = document.createElement("main");
  main.id = "main";
  container.appendChild(main);

  let footer = document.createElement("footer");
  container.appendChild(footer);

  let fb = document.createElement("a");
  fb.id = "facebook-logo";
  fb.setAttribute("href", "#");
  footer.appendChild(fb);

  let ig = document.createElement("a");
  ig.id = "instagram-logo";
  ig.setAttribute("href", "#");
  footer.appendChild(ig);
  
  body.appendChild(container);
}

function newRequest(subreddit) {
  // populate page w/ default feed
  let reqDefault = new XMLHttpRequest();
  reqDefault.open("GET", "https://www.reddit.com/r/" + subreddit + ".json");
  reqDefault.send();
  reqDefault.addEventListener("load", function() {
    let defaultResponse = JSON.parse(this.response);
    buildCards(defaultResponse.data.children);
  });
  console.log("You are viewing this subreddit: " + subreddit);
}

function buildCards(data) {

  let ul = document.createElement("ul");
  ul.id = "feed";
  
  data.forEach(function(element, index, array) {
    let newArticle = document.createElement("li");
    let imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    newArticle.appendChild(imgContainer);
    let newImg = document.createElement("img");
    
    if (element.data.preview) { // if image provided set newImg
      newImg.setAttribute("src", element.data.preview.images[0].source.url);
    } else { // if no image provided get fallback
      newImg.setAttribute("src", "assets/placeholder.jpg");
    }
    imgContainer.appendChild(newImg);

    let newTitle = document.createElement("a");
    newTitle.className = "title";
    newTitle.setAttribute("href", element.data.url);
    newTitle.innerText = element.data.title;
    newArticle.appendChild(newTitle);

    let newMeta = document.createElement("p");
    newMeta.className = "post-meta";
    newArticle.appendChild(newMeta);
    let newAuthor = document.createElement("span");
    newAuthor.className = "author";
    newAuthor.innerHTML = "by " + element.data.author;
    newMeta.appendChild(newAuthor);

    let newTimestamp = document.createElement("span");
    let formatTimestamp = moment.unix(element.data.created_utc);
    formatTimestamp = moment(formatTimestamp).fromNow();
    newTimestamp.className = "timestamp";
    newTimestamp.innerText = formatTimestamp;
    newMeta.appendChild(newTimestamp);

    let newUpvotes = document.createElement("span");
    newUpvotes.className = "upvotes";
    newUpvotes.innerText = element.data.ups + " upvotes";
    newMeta.appendChild(newUpvotes);
    let newDescription = document.createElement("p");
    newDescription.className = "description";

    if (element.data.selftext === "") {
      newDescription.innerText = "Link shared from: " + element.data.domain;
    } else {
    newDescription.innerText = element.data.selftext;
    }
    newArticle.appendChild(newDescription); 
    ul.appendChild(newArticle);     
  });
  
  let main = document.getElementById("main");
  main.innerHTML = "";
  main.appendChild(ul);
}

// event listeners
function eventListeners() {

  document.getElementById("board-nav").addEventListener("click", selectBoard);
  
  function randomSub() {
    let random = ["bundesliga", "premierleague", "coys", "ussoccer", "soundersfc", "stadiumporn", "assistporn"];
    let num = Math.floor(Math.random() * 7);
    return random[num];
  }

  function selectBoard() {
    if (event.target.id === "board-one") {
      newRequest("mls");
    } else if (event.target.id === "board-two") {
      newRequest("footballtactics");
    } else if (event.target.id === "board-three") {
      newRequest("worldfootball");
    } else if (event.target.id === "board-four") {
      newRequest(randomSub());
    }
  }
}

buildStructure();
newRequest("mls");
eventListeners();