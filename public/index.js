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
