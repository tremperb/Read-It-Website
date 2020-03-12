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


function updateFont() {

  var selectedFont = document.getElementById("fontOne").value;
  console.log("Selected Font: ", selectedFont)
  var item = document.getElementById("output-text");
  if(selectedFont == "Open Dyslexic") {
    item.style.fontFamily = "open-dyslexic";
  }
  else {
    item.style.fontFamily = "comic-sans";
  }
}

$(document).ready(function() {

  var elementExists = document.getElementById("output-text");
  if(elementExists) {
    updateFont();
    //call other functions here
  }

});
