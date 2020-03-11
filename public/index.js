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

function updateMenu(uID) {
  $.ajax({
    url: '/menu/' + uID,
    type: 'PUT',
    data: $('#update-menu').serialize(),
    success: function(result) {
      window.location = '/menu/' + uID;
    }
  })

  return false;
}
