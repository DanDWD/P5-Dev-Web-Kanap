"use strict";

//----recuperer les données de l'API
fetch("http://localhost:3000/api/products").then(function (response) {
  return response.json();
}) //recuperation du resultat
.then(function (data) {
  console.log(data);
  displayAllProducts(data);
}) //en cas d'erreur
["catch"](function (err) {
  document.querySelector(".items").innerHTML = "\n    <h2>Erreur de connection</h2>\n    <p>".concat(err, "</p>\n    ");
}); //----affichage des articles sur la page index

function displayAllProducts(data) {
  data.forEach(function (article) {
    document.getElementById("items").innerHTML += "\n    <a href=\"./product.html?id=".concat(article._id, "\">\n      <article>\n        <img src=\"").concat(article.imageUrl, "\" alt=\"").concat(article.altTxt, "\">\n        <h3 class=\"productName\">").concat(article.name, "</h3>\n        <p class=\"productDescription\">").concat(article.description, "</p>\n      </article>\n    </a>");
  });
}

;
//# sourceMappingURL=script.dev.js.map
