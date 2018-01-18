// create structure
function buildStructure() {
  let body = document.body;
  let container = document.createElement("div"); // create container
  container.id = "container";
  let header = document.createElement("header"); // create header
  container.appendChild(header);
  let logo = document.createElement("img"); // create header logo
  logo.setAttribute("src", "assets/logo.svg");
  header.appendChild(logo);
  let plusButton = document.createElement("button"); // create header button
  header.appendChild(plusButton);
  let nav = document.createElement("nav"); // create nav
  container.appendChild(nav);
  let navOne = document.createElement("a");
  navOne.innerText = "Board One";
  nav.appendChild(navOne);
  let navTwo = document.createElement("a");
  navTwo.innerText = "Board Two";
  nav.appendChild(navTwo);
  let navThree = document.createElement("a");
  navThree.innerText = "Board Three";
  nav.appendChild(navThree);
  let main = document.createElement("main"); // create main
  container.appendChild(main);
  let ul = document.createElement("ul"); // create ul
  ul.id = "feed";
  main.appendChild(ul);
  let footer = document.createElement("footer"); // create footer
  container.appendChild(footer);
  body.appendChild(container);
}
buildStructure();

// let header = document.createElement("header");
// document.body.appendChild(header);
// let logo = document.createElement("img");
// logo.setAttribute("src", "assets/logo.svg");
// header.appendChild(logo);
// let plusButton = document.createElement("button");
// header.appendChild(plusButton);
// let nav = document.createElement("nav");
// document.body.appendChild(nav);
// let navOne = document.createElement("a");
// navOne.innerText = "Board One";
// let navTwo = document.createElement("a");
// navTwo.innerText = "Board Two";
// let navThree = document.createElement("a");
// navThree.innerText = "Board Three";
// let main = document.createElement("main");
// document.body.appendChild(main);
// let ul = document.createElement("ul");
// ul.id = "feed";
// main.appendChild(ul);
// let footer = document.createElement("footer");
// document.body.appendChild(footer);

window.onload = function() {

  // populate page w/ default feed
  let reqDefault = new XMLHttpRequest();
  reqDefault.open("GET", "https://www.reddit.com/r/mls.json");
  reqDefault.send();
  reqDefault.addEventListener("load", defaultFeed);

  function defaultFeed() {
    let defaultResponse = JSON.parse(this.response);
    
    defaultResponse.data.children.forEach(function(element, index, array) {
      console.log(element);
      let newArticle = document.createElement("li");
      feed.appendChild(newArticle);

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

    });
  }

}();