// File Name: app.js
// Author's Name: Nicanor Emilio Manuel Montoya
// Student ID: 301247391

console.log('Goes to the client side.');

if (window.location.pathname == "/movie/list") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");
    console.log(id);
    var request = {
      url: `https://milesmidterm.herokuapp.com/movie/delete/${id}`,
      method: "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
}
