$(document).ready(function() {
  // --- our code goes here ---
  $(".new-tweet textarea").on("keyup", function() {
    let counter = 140 - $(this).val().length;
    $("#counter").css("color", counter < 0 ? "red" : "black")
    $("#counter").text(counter);
  });
});