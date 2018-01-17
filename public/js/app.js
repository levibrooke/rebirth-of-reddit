// create elements
let header = document.createElement("header");
document.body.appendChild(header);
let nav = document.createElement("nav");
document.body.appendChild(nav);
let main = document.createElement("main");
main.id = "feed";
document.body.appendChild(main);

window.onload = function() {

  // populate page w/ default feed
  let reqDefault = new XMLHttpRequest();
  reqDefault.open("GET", "https://www.reddit.com/r/mls.json");
  reqDefault.send();
  reqDefault.addEventListener("load", defaultFeed);

  function defaultFeed() {
    let defaultResponse = JSON.parse(this.response);
    console.log(defaultResponse.data.children);
    
    defaultResponse.data.children.forEach(function(element, index, array) {
        console.log(element);

        let newArticle = document.createElement("article");
        feed.appendChild(newArticle);

        let newDiv = document.createElement("div");
        newDiv.className = "title";
        newDiv.innerText = element.data.title;
        newArticle.appendChild(newDiv);

    });



    // response.data.children is an array
    // [0].data.preview.images[0].source.url // images in an array
    // [0].data.title
    // [0].data.url
    // [0].data.author
    // [0].data.created_utc
    // [0].data.ups
  }

}();