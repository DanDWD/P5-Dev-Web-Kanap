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
            console.log("Erreur : impossible de récupérer l'identifiant dans l'url");
            alert("Erreur : impossible de récupérer l'identifiant dans l'url");
        }
    }
    
    
   