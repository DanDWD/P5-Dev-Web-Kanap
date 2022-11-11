"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//----recuperation de l'url
var paramsUrl = new URLSearchParams(document.location.search);
var articleId = paramsUrl.get("id"); // recuperation de l'id
//----recuperation des differentes infos des articles dans l'api

fetch("http://localhost:3000/api/products/".concat(articleId)) //----conversion format json, renommage
.then(function (response) {
  return response.json();
}).then(function (articleInfos) {
  console.table(articleInfos);
  displayArticleInfos(articleInfos); // appel de la fonction
}); //----insertion des information produits dans le code 

function displayArticleInfos(articleInfos) {
  document.getElementById("title").textContent = articleInfos.name;
  document.getElementById("price").textContent = articleInfos.price;
  document.getElementById("description").textContent = articleInfos.description;
  document.querySelector(".item__img").innerHTML = "\n        <img src=\"".concat(articleInfos.imageUrl, "\" alt=\"").concat(articleInfos.altTxt, "\">"); //----choix des couleurs

  var colors = articleInfos.colors; //----creation d'un rendu

  var renderColor = "";
  colors.forEach(function (color) {
    var newHtml = "\n            <option value=\"".concat(color, "\">").concat(color, "</option>");
    renderColor = renderColor + newHtml; // stocker le rendu en memoire
  }); //----l'html est injecte dans le code

  document.getElementById("colors").innerHTML = renderColor;
}

; //----creation d'un modele qui servira pour les articles selectionnés

var article = function article(articleId, color, quantity) {
  _classCallCheck(this, article);

  this.articleId = articleId;
  this.color = color;
  this.quantity = quantity;
};

; //----recuperer le choix du prospect 

function addToCart() {
  var articleData = displayArticleInfos(articleInfos); // article choisi

  var button = document.querySelector("#addToCart"); // ciblage sur le bouton d'ajout

  var colorSelected = document.querySelector("#colors"); // ciblage sur selection de la couleur

  var quantitySelected = document.querySelector("#quantity"); // ciblage sur selection de la quantité
  //----ecoute du bouton d'ajout

  button.addEventListener("click", function (event) {
    event.preventDefault(); // bloquer les evenements par defaut
    //---Creation de l'objet de recuperation de la saisie de l'utilisateur

    var selected = new product(articleData._id, colorSelected.value, Number(quantitySelected.value));

    if (selected.quantity >= 1 && selected.quantity <= 100) {
      // controle de la quantité 1=>100
      var inCart = JSON.parse(localStorage.getItem("laSelection")); // envoi de la selection vers localstorage

      if (inCart == null) {
        // si le panier n'a pas de valeur
        var _inCart = [selected]; // on lui en donne une

        localStorage.setItem("laSelection", JSON.stringify(_inCart));
      } else if (inCart.some(function (i) {
        return (// verifier si l'article existe deja
          i.id === selected.id && i.color === selected.color
        );
      }) == true) {
        var duplicateId = cart.findIndex(function (e) {
          return (// on prend son id
            e.id === selected.id && e.color === selected.color
          );
        });
        cart[duplicateId].quantity = cart[duplicateId].quantity + selected.quantity; // et on additionne les deux valeurs

        localStorage.setItem("laSelection", JSON.stringify(cart)); // enfin le panier se met a jour
      } else {
        // si l'article est le premier de son genre
        cart.push(selection);
        localStorage.setItem("laSelection", JSON.stringify(cart));
      }

      ;
    } else {
      // enfin si la quantité est inferieur ou superieur a [1-100]
      alert("la quantité doit être comprise entre 1 et 100."); // envoyer un message d'avertissement au client
    }
  });
}

;
//# sourceMappingURL=product.dev.js.map
