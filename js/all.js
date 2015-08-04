document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelector("#b1").className = "enlightened";
  
  // Changes button from Enlightened Green to Resistance Blue on click
  function changeButton() {
    var b = document.querySelector("#b1");
    if (b.className == "enlightened") {
      b.className = "resistance";
    } else {
      b.className = "enlightened";
    }
  }
  
  // Event listener for button change
  document.querySelector("#b1").addEventListener("click", changeButton, false)
});

