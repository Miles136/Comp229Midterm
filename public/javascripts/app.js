// File Name: app.js
// Author's Name: Nicanor Emilio Manuel Montoya
// Student ID: 301247391

console.log('Goes to the client side.');



if (window.location.pathname == "/movie/list") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var movieid = $(this).attr("data-id");
    console.log(movieid);
    var MongoClient = require( 'mongodb' ).MongoClient;
    var url = "milesmidterm.herokuapp.com/movie/delete/";

    MongoClient.connect( url , function( err , db ) {
      if (err) throw err;
      var dbo = db.db("myFirstDatabase");
      var query = { id : movieid };
      dbo.collection("movies").deleteOne(query, function(err, obj) {
        if (err) throw err;
        console.log("Deleted successfully");
      })
    });
    var request = {
      url: "https://milesmidterm.herokuapp.com/movie/delete/${id}",
      method: "DELETE"
    };

    if (confirm("Remove this movie from the list?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
}
