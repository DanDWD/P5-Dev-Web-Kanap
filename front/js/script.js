//----recuperer les données de l'API
fetch("http://localhost:3000/api/products")

.then((response) => response.json())

  //recuperation du resultat sous forme de table (>log)
  .then((articlesList) => {   
    console.table(articlesList);
    display(articlesList);
  })
  //en cas d'erreur
  .catch((err) => { 
    document.querySelector(".items").innerHTML = "<h2>Erreur 404. L'API est injoinable</h2>";
    console.log("L'API est injoinable" + err);
  });


//----affichage des articles sur la page index
function display(articlesList) {
let newHtml = "";

articlesList.forEach(article => { 
  newHtml += displayItems(article)
});

//selection de la zone d'affichage
document.getElementById("items").innerHTML = newHtml;
}

//----code à injecter dans le html
function displayItems(article) {
  return  `
    <a href="./product.html?id=${article._id}">
      <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}">
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>
    </a>`;
}