document.addEventListener("DOMContentLoaded", function(event) {
  
  // Changes button from Enlightened Green to Resistance Blue on click
  function changeButton() {
    console.log("changeButton");
    var button = document.getElementById("b1");
    if (button.className == "enlightened") {
      button.className = "resistance";
      button.value = "Resistance"
    } else {
      button.className = "enlightened";
      button.value = "Enlightened"
    }
  }
  
  // Move box on click
  function moveBox() {
    console.log("moveBox");
    var box = document.getElementById("box1");
    var currentPosition = box.offsetLeft;
    var newPosition = currentPosition + 100;
    if (newPosition > window.innerWidth-100) {
      box.style.left = "20px";
    } else {
      box.style.left = newPosition + 'px'; // loops back to beginning
    }
  }
  
  // Slide box (smoothly) on click
  function slideBox() {
    // slide box 1px every 1 ms
    var interval = setInterval(function() {
      console.log("slideBox")
      var box = document.getElementById("box2");
      var currentPosition = box.offsetLeft;
      var newPosition = currentPosition + 1;
      console.log(newPosition)
      if (newPosition > window.innerWidth-100) {
        box.style.left = "20px";
        clearInterval(interval);
      } else {
        box.style.left = newPosition + 'px'; // loops back to beginning
      }
    }, 1);
    
  }
  
  // Button Change
  document.getElementById("b1").addEventListener("click", changeButton, false);
  // Move Box
  document.getElementById("box1").addEventListener("click", moveBox, false);
  // Slide Box
  document.getElementById("box2").addEventListener("click", slideBox, false);
  
});

