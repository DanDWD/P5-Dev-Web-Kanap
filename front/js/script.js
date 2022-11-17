//----recuperer les données de l'API
fetch("http://localhost:3000/api/products")

.then((response) => response.json())

  //recuperation du resultat
  .then((data) => {   
    console.log(data);
    displayAllProducts(data);
  })
  //en cas d'erreur
  .catch((err) => { 
    document.querySelector(".items").innerHTML = `
    <h2>Erreur de connection</h2>
    <p>${err}</p>
    `
  });

//----affichage des articles sur la page index
function displayAllProducts(data) {
  data.forEach(article => { 
  document.getElementById("items").innerHTML +=  `
    <a href="./product.html?id=${article._id}">
      <article>
        <img src="${article.imageUrl}" alt="${article.altTxt}">
        <h3 class="productName">${article.name}</h3>
        <p class="productDescription">${article.description}</p>
      </article>
    </a>`;
})};