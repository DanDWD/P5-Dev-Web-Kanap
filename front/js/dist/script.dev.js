"use strict";

//----recuperer les données de l'API
fetch("http://localhost:3000/api/products").then(function (response) {
  return response.json();
}) //----ecuperation du resultat sous forme de table (>log)
.then(function (articlesList) {
  console.table(articlesList);
  display(articlesList); // appel de la fonction
})["catch"](function (err) {
  // en cas d'erreur
  document.querySelector(".items").innerHTML = "<h2>Erreur 404. L'API est injoinable</h2>";
  console.log("L'API est injoinable" + err);
}); //----affichage des articles sur la page index

function display(articlesList) {
  var newHtml = "";
  articlesList.forEach(function (article) {
    newHtml += displayItems(article);
  }); //----selection de la zone d'affichage

  document.getElementById("items").innerHTML = newHtml;
} //----code à injecter dans le html


function displayItems(article) {
  return "\n    <a href=\"./product.html?id=".concat(article._id, "\">\n      <article>\n        <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n        <h3 class=\"productName\">").concat(article.name, "</h3>\n        <p class=\"productDescription\">").concat(article.description, "</p>\n      </article>\n    </a>");
}
//# sourceMappingURL=script.dev.js.map
