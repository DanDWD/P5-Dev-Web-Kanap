"use strict";

//----recuperer l'id dans l'url
function getProductId() {
  //recuperer l'url
  var url = new URL(window.location.href); //recuperer les parametres dans l'url

  var params = new URLSearchParams(url.search); //recuperation du parametre id

  if (params.has('id')) {
    var id = params.get('id');
    return id;
  } else {
    alert("Erreur : impossible de récupérer l'identifiant dans l'url");
  }
} //----retourner les caracteristiques des articles sur l'api


function getProductData() {
  var productId, response;
  return regeneratorRuntime.async(function getProductData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          productId = getProductId();
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("http://localhost:3000/api/products/".concat(productId)));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          return _context.abrupt("return", _context.sent);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          alert("Erreur. L'API est injoinable" + _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

; //----afficher le produit

(function displayProducts() {
  var data, colors, colorRender;
  return regeneratorRuntime.async(function displayProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getProductData());

        case 2:
          data = _context2.sent;
          document.getElementById('title').textContent = data.name;
          document.getElementById('price').textContent = data.price;
          document.getElementById('description').textContent = data.description;
          document.querySelector('.item__img').innerHTML = "\n            <img src=\"".concat(data.imageUrl, "\" alt=\"").concat(data.altTxt, "\">\n        "); //choix de la couleur

          colors = data.colors; //rendu

          colorRender = '';
          colors.forEach(function (item) {
            var htmlContentItem = "\n                <option value=\"".concat(item, "\">").concat(item, "</option>\n            "); //placer le rendu en memoire

            colorRender = colorRender + htmlContentItem;
          }); //injecter le rendu dans l'html 

          document.getElementById("colors").innerHTML += colorRender;
          document.getElementById("addToCart").addEventListener("click", function (e) {
            addProductToCart(data._id);
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
})(); //----ajouter le(s) produit(s) dans le panier


function addProductToCart(id) {
  //recuperation de la couleur  
  var color = document.querySelector("#colors").value; //recuperation de la quantité

  var quantity = document.querySelector("#quantity").value; //possibles erreurs

  var errorMessage = "";

  if (!id) {
    errorMessage += "il manque l'identifiant produit\n";
  }

  if (quantity < 1 || quantity > 100) {
    errorMessage += "Quantité non séléctionnée !\n";
  }

  if (color == "") {
    errorMessage += "Couleur non séléctionnée !\n";
  }

  if (errorMessage !== "") {
    alert(errorMessage);
  } else {
    var selection = {
      id: id,
      color: color,
      quantity: quantity
    }; //si la quantite enregistree est comprise entre 1 et 100

    var cart = JSON.parse(localStorage.getItem("panier")); //si le panier n'existe pas

    if (cart == null) {
      //on cree le panier et on le stock en localstorage
      var _cart = [selection];
      localStorage.setItem("panier", JSON.stringify(_cart)); //tester si il y a un doublon dans le tableau
    } else if (cart.some(function (y) {
      return y.id === selection.id && y.color === selection.color;
    }) == true) {
      //on prend son index
      var duplicateIndex = cart.findIndex(function (e) {
        return e.id === selection.id && e.color === selection.color;
      }); //addition de la valeur initiale du panier + la selection

      cart[duplicateIndex].quantity = parseFloat(cart[duplicateIndex].quantity) + parseFloat(selection.quantity); //mise a jour du panier en ls

      localStorage.setItem("panier", JSON.stringify(cart)); //si l'element n'est pas dans un panier
    } else {
      //envoyer directement la selection au panier
      cart.push(selection);
      localStorage.setItem("panier", JSON.stringify(cart));
    }

    ;
    alert("".concat(selection.quantity, " article(s) ").concat(selection.color, " ajoute(s) dans le panier"));
  }
}
//# sourceMappingURL=product.dev.js.map
