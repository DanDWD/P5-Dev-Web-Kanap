//----recuperation de l'url
let paramsUrl = new URLSearchParams(document.location.search);
// recuperation de l'id
let articleId = paramsUrl.get("id");

//----recuperation des differentes infos des articles dans l'api
fetch(`http://localhost:3000/api/products/${articleId}`)

// conversion format json, renommage
.then ((response) => response.json())
    .then((articleInfos) => {   
        console.table(articleInfos);
        // appel de la fonction
        displayArticleInfos(articleInfos);
    })

//----insertion des information produits dans le code 
function displayArticleInfos(articleInfos) {
    document.getElementById("title").textContent = articleInfos.name;
    document.getElementById("price").textContent = articleInfos.price;
    document.getElementById("description").textContent = articleInfos.description;
    // insertion image 
    document.querySelector(".item__img").innerHTML = `
        <img src="${articleInfos.imageUrl}" alt="${articleInfos.altTxt}">`;
    
    // choix des couleurs
    let colors = articleInfos.colors;

    // creation d'un rendu
    let renderColor = "";

    colors.forEach(color => {
        let newHtml = `
            <option value="${color}">${color}</option>`;
        // stocker le rendu en memoire
        renderColor = renderColor+newHtml;
    });
    // injection du rendu dans l'html 
    document.getElementById("colors").innerHTML = renderColor;
};