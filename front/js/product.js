//----recuperation de l'url
let paramsUrl = new URLSearchParams(document.location.search);
let articleId = paramsUrl.get("id"); // recuperation de l'id

//----recuperation des differentes infos des articles dans l'api
fetch(`http://localhost:3000/api/products/${articleId}`)

//----conversion format json, renommage
.then ((response) => response.json())
    .then((articleInfos) => {   
        console.table(articleInfos);
        displayArticleInfos(articleInfos); // appel de la fonction
    })

//----insertion des information produits dans le code 
function displayArticleInfos(articleInfos) {
    document.getElementById("title").textContent = articleInfos.name;
    document.getElementById("price").textContent = articleInfos.price;
    document.getElementById("description").textContent = articleInfos.description;
    document.querySelector(".item__img").innerHTML = `
        <img src="${articleInfos.imageUrl}" alt="${articleInfos.altTxt}">`;
    
    //----choix des couleurs
    let colors = articleInfos.colors;

    //----creation d'un rendu
    let renderColor = "";

    colors.forEach(color => {
        let newHtml = `
            <option value="${color}">${color}</option>`;
        renderColor = renderColor+newHtml; // stocker le rendu en memoire
    });

    //----l'html est injecte dans le code
    document.getElementById("colors").innerHTML = renderColor;
};

//----creation d'un modele qui servira pour les articles selectionnés
class article {
    constructor(articleId, color, quantity) {
      this.articleId = articleId;
      this.color = color;
      this.quantity = quantity;
    }
};

//----recuperer le choix du prospect 
function addToCart(){
    let articleData = displayArticleInfos(articleInfos); // article choisi
    const button = document.querySelector("#addToCart");     // ciblage sur le bouton d'ajout
    const colorSelected = document.querySelector("#colors");     // ciblage sur selection de la couleur
    const quantitySelected = document.querySelector("#quantity");     // ciblage sur selection de la quantité

    //----ecoute du bouton d'ajout
    button.addEventListener("click", (event) => {
        event.preventDefault(); // bloquer les evenements par defaut

        //---Creation de l'objet de recuperation de la saisie de l'utilisateur
        let selected = new product(
            articleData._id,
            colorSelected.value,
            Number(quantitySelected.value)
            );

        if (selected.quantity >= 1 && selected.quantity <= 100) { // controle de la quantité 1=>100
            let inCart = JSON.parse(localStorage.getItem("laSelection")); // envoi de la selection vers localstorage
    
            if (inCart == null) { // si le panier n'a pas de valeur
                let inCart = [selected]; // on lui en donne une
                localStorage.setItem("laSelection", JSON.stringify(inCart));

            } else if (inCart.some(i => // verifier si l'article existe deja
                i.id === selected.id &&
                i.color === selected.color) == true) {
                    const duplicateId = cart.findIndex(e => // on prend son id
                        e.id === selected.id &&
                        e.color === selected.color);
                    cart[duplicateId].quantity = cart[duplicateId].quantity + selected.quantity; // et on additionne les deux valeurs
                    localStorage.setItem("laSelection", JSON.stringify(cart)); // enfin le panier se met a jour
            } else { // si l'article est le premier de son genre
                cart.push(selection);
                localStorage.setItem("laSelection", JSON.stringify(cart));
            };
        } else { // enfin si la quantité est inferieur ou superieur a [1-100]
            alert("la quantité doit être comprise entre 1 et 100."); // envoyer un message d'avertissement au client
        }
    });
};