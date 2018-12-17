function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
}
function requestAPI(url, func){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      func(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
function addArticle(newsArticle){
  var image = "";
  var has_image_style = "";
  var no_image_class = "";
  if(!newsArticle.description){
    newsArticle.description = "";
  }
  if(newsArticle.urlToImage){
    has_image_style = "display: none;";
    image = "<img src='" + newsArticle.urlToImage + "' onload='this.parentElement.removeAttribute(\"style\");' onerror='this.parentElement.classList.add(\"no_image\");this.parentElement.removeAttribute(\"style\");this.outerHTML=\"\";'>";
  }else{
    no_image_class = "no_image";
  }
  var className = "other";
  if(newsArticle.title && newsArticle.title.toLowerCase().indexOf("vodafone") != -1){
    className = "vodafoneTitle";
  }
  if(newsArticle.description && newsArticle.description.toLowerCase().indexOf("vodafone") != -1){
    className = "vodafoneDescription";
  }
  document.querySelector("div.content div." + className).innerHTML += `
  <a href="${newsArticle.url}" target="_blank" class="${no_image_class}" style='${has_image_style}'>
    ${image}
    <div class='meta'>
      <h1>${newsArticle.title}</h1>
      <p>${newsArticle.description}</p>
      <p class='meta'>By <strong>${newsArticle.source.name}</strong> on ${formatDate(new Date(newsArticle.publishedAt))}</p>
    </div>
  </a>
  `;
}
requestAPI("https://newsapi.org/v2/everything?language=en&pageSize=100&q=vodafone&apiKey=377facbb80c140388ec9cdb16a7f7ee0", function(responseText){
  var response = JSON.parse(responseText);
  response.articles.forEach(function(article){
    addArticle(article);
  });
});
