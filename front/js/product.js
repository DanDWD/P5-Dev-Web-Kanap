//----recuperer l'id dans l'url
function getProductId () {
    //recuperer l'url
    let url = new URL(window.location.href);
    //recuperer les parametres dans l'url
    let params = new URLSearchParams(url.search);
    
        //recuperation du parametre id
        if (params.has('id')) {
            let id = params.get('id');
            return id;
        }
        else {
            alert("Erreur : impossible de récupérer l'identifiant dans l'url");
        }
    }
    
    //----retourner les caracteristiques des articles sur l'api
    async function getProductData () {
        const productId = getProductId ();
        try {
            let response = await fetch(`http://localhost:3000/api/products/${productId}`);
            //convertion au format json    
            return await response.json();
            }
        catch (e) {
            alert("Erreur. L'API est injoinable" + e );
        }
    };
      
    //----afficher le produit
    (async function displayProducts() {
        let data = await getProductData ();
        document.getElementById('title').textContent = data.name;
        document.getElementById('price').textContent = data.price;
        document.getElementById('description').textContent = data.description;
        document.querySelector('.item__img').innerHTML = `
            <img src="${data.imageUrl}" alt="${data.altTxt}">
        `;
        //choix de la couleur
        let colors = data.colors;
        //rendu
        let colorRender = '';
        colors.forEach(item => {
            let htmlContentItem = `
                <option value="${item}">${item}</option>
            `;
            //placer le rendu en memoire
            colorRender = colorRender+htmlContentItem;
        });
        //injecter le rendu dans l'html 
        document.getElementById("colors").innerHTML += colorRender;
        document.getElementById("addToCart").addEventListener("click", (e) => {
    
            addProductToCart(data._id);
        
        })
    })();

//----ajouter le(s) produit(s) dans le panier
function addProductToCart(id){
    //recuperation de la couleur  
    const color = document.querySelector("#colors").value;
    //recuperation de la quantité
    const quantity = document.querySelector("#quantity").value;
    //possibles erreurs
    let errorMessage = "";

    if(!id){
        errorMessage += "il manque l'identifiant produit\n"
    }

    if (quantity < 1 || quantity > 100) {
        errorMessage += "Quantité non séléctionné !\n";
    }

    if(color == ""){
        errorMessage += "Couleur non séléctionné !\n";
    }
    
    if(errorMessage !== ""){
       alert(errorMessage);
    }else{
        
        let selection = {
            id,
            color,
            quantity,    
        }
        
         //si la quantite enregistree est comprise entre 1 et 100
         let cart = JSON.parse(localStorage.getItem("panier"));
    
         //si le panier n'existe pas
         if (cart == null) {
             //on cree le panier et on le stock en localstorage
             let cart = [selection];
             localStorage.setItem("panier", JSON.stringify(cart));

         //tester si il y a un doublon dans le tableau
         } else if (cart.some(y =>
             y.id === selection.id &&
             y.color === selection.color) == true) {
                 //on prend son index
                 const duplicateIndex = cart.findIndex(e =>
                     e.id === selection.id &&
                     e.color === selection.color);
                 //addition de la valeur initiale du panier + la selection
                 cart[duplicateIndex].quantity = parseFloat(cart[duplicateIndex].quantity) + parseFloat(selection.quantity);
                 //mise a jour du panier en ls
                 localStorage.setItem("panier", JSON.stringify(cart));

         //si l'element n'est pas dans un panier
         } else {
             //envoyer directement la selection au panier
             cart.push(selection);
             localStorage.setItem("panier", JSON.stringify(cart));
         };
         
         alert(`${selection.quantity} article(s) ${selection.color} ajoute(s) dans le panier`);
        }     
}