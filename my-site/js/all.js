document.addEventListener("DOMContentLoaded", function(event) {
  
  // Changes button from Enlightened Green to Resistance Blue on click
  function changeButton() {
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
    var box = document.getElementById("box1");
    var currentPosition = box.offsetLeft;
    var newPosition = currentPosition + 100;
    if (newPosition > window.innerWidth-100) {
      box.style.left = "20px"; // loops back to beginning
    } else {
      box.style.left = newPosition + 'px';
    }
  }
  
  // Slide box (smoothly) on click
  // NOTE: Request Animation Frame
  function slideBox() {
    // slide box 1px every 1 ms
    var interval = setInterval(function() {
      console.log("slideBox")
      var box = document.getElementById("box2");
      var currentPosition = box.offsetLeft;
      var newPosition = currentPosition + 1;
      console.log(newPosition)
      if (newPosition > window.innerWidth-100) {
        box.style.left = "20px"; // loops back to beginning
        clearInterval(interval);
      } else {
        box.style.left = newPosition + 'px';
      }
    }, 1);
  }
  
  function submitToDo() {
    var button = document.getElementById("b2");
    todo = button.form.content.value;
    if (todo != "") {
      // create new list item
      var listItem = document.createElement('li');
      listItem.className = 'to-do';
      document.getElementById("to-do-list").appendChild(listItem);
      // get last list item
      var allItems = document.getElementsByClassName("to-do");
      var emptySlot = allItems[allItems.length-1];
      // add todo content
      emptySlot.innerHTML = todo;
    }
    button.form.reset();
  }
  
  // Button Change
  document.getElementById("b1").addEventListener("click", changeButton, false);
  // Move Box
  document.getElementById("box1").addEventListener("click", moveBox, false);
  // Slide Box
  document.getElementById("box2").addEventListener("click", slideBox, false);
  // To-Do List
  document.getElementById("b2").addEventListener("click", submitToDo, false);
  
});

