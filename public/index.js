function getPackingList() {
  var checkbox = document.getElementById("myCheck");
  var listContainer = document.getElementById("taking-list");

  if(checkbox.checked == true) {
    listContainer.style.display = "block";
  }
  else {
    listContainer.style.display = "none";
  }
}

function getLogin() {
  $.ajax({
    url: '/login/authentication',
    type: 'PUT',
    data: $('#get-login').serialize(),
    success: function(result) {
      window.location = '/';
    }
  })

  return false;
}
