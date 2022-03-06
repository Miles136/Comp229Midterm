console.log('Goes to the client side.');

if(getTitle == "Movie List")
{
    let deleteButtons = document.querySelectorAll('.btn-danger');
        
    for(button of deleteButtons)
    {
        button.addEventListener('click', (event)=>{
            var id = $(this).attr("data-id");
            var request = {
              // Change URL
              url: `https://FIXTHIS.herokuapp.com/movie/delete/${id}`,
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
}