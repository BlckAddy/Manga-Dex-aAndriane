

var container = document.getElementById("container");
var utog = document.getElementById("utog");


    utog.addEventListener("keydown" ,(ev) => {
        if (ev.key == "Enter"){
            console.log("Submit");
            var value = utog.value;
            console.log(value);

fetch(`https://api.mangadex.org/manga?limit=20&title=${value}&includes%5B%5D=cover_art`)
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
 
        

      
      return response.json();
    }).then(data => {
       for (let i = 0; i < 20; i++) {
            var req = data.data[i];
            var title = req.attributes.title.en;
            var description = req.attributes.description.en;
            var mangaId = req.id;
            var coverArt = req.relationships.find(rel => rel.type === "cover_art").attributes.fileName;

         

            console.log(coverArt);

            container.innerHTML += `<h1 class="Header" >${title}</h1>
                            <p class="head" >${description}</p>
                            <img class="Header" src="https://uploads.mangadex.org/covers/${mangaId}/${coverArt}" alt="noimg">
                            `;

        }
    }).catch(error => {
        console.log(error);
    });

            
 }

});

