//----recuperer le numero de la commande
function urlOrderId () {
    //recuperer l'url
    let url = new URL(window.location.href);

    //recuperation des parametres de l'url
    let params = new URLSearchParams(url.search);
    //recuperation de l'order
    //si il est dans l'url
    if (params.has('orderId')) {
        let order = params.get('orderId');
        return order;
    }
    //si il n'y est pas
    else {
        console.log("Erreur : l'identifiant n'est pas trouvable dans l'url");
        alert("Erreur : l'identifiant  n'est pas trouvable dans l'url");
    }
}

//----afficher le numero de commande
(function displayOrder () {
    let order = urlOrderId();

    //injection du numero dans l'html
    document.getElementById('orderId').textContent = `${order}`;

    //nettoyage du local storage
    localStorage.clear();

})()