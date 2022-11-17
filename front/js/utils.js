function getDatas(uri){
    const URL = "http://localhost:3000/api/";

    if(uri){
        URL += uri;
    }
    fetch(URL)
    .then((response) => response.json())
    //recuperation du resultat
    .then ((data) =>{
        return data
    })
    //en cas d'erreur
    .catch((err) => {
        return err
    });
}




export { getDatas };