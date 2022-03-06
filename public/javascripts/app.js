// File Name: app.js
// Author's Name: Nicanor Emilio Manuel Montoya
// Student ID: 301247391

console.log('Goes to the client side.');

if(getTitle == "Movie List")
{
    let deleteButtons = document.querySelectorAll('.btn-danger');
        
    for(button of deleteButtons)
    {
        button.addEventListener('click', (event)=>{
            if(!confirm("Are you sure?")) 
            {
                event.preventDefault();
            }

            var movieId = button.getAttribute("data-id");
            console.log(movieId);

            var http = require('http');
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb.com/v2/6223d1793f968577fa111fc9#metrics/replicaSet/6223d28a9780ed75722291d4/explorer/myFirstDatabase";

            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var myquery = { id: movieId };
              db.collection("movies").remove(myquery, function(err, obj) {
                if (err) throw err;
                console.log("Movie deleted");
                db.close();
              });
            }); 
			
        });
    }
}