document.addEventListener("DOMContentLoaded", function(event) {
  
  // Changes button from Enlightened Green to Resistance Blue on click
  function changeButton(event) {
    console.log(event.type)
    var button = event.target;
    if (button.className == "enlightened") {
      button.className = "resistance";
      button.value = "Resistance"
    } else {
      button.className = "enlightened";
      button.value = "Enlightened"
    }
  }
  
  // Move box on click
  function moveBox(event) {
    var box = event.target;
    var currentPosition = box.offsetLeft;
    var newPosition = currentPosition + 100;
    if (newPosition > window.innerWidth-100) {
      box.style.left = "20px"; // loops back to beginning
    } else {
      box.style.left = newPosition + 'px';
    }
  }
  
  // Slide box (smoothly) on click
  // NOTE: Request Animation Frame?
  function slideBox(event) {
    // slide box 1px every 1 ms
    var interval = setInterval(function() {
      var box = event.target;
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
  
  function submitToDo(event) {
    var button = event.target;
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
  
  function slideBoxNew(event) {
    var startTime = performance.now();
    var box = event.target;
    function step(timestamp) {
      var progress = timestamp - startTime;
      var currentPosition = box.offsetLeft;
      var newPosition = currentPosition + 100;
      box.style.left = newPosition + 'px';
      if (newPosition < window.innerWidth-100) {
        window.requestAnimationFrame(step); // loops back to beginning
      } else {
        box.style.left = "20px";
      }
    }
    window.requestAnimationFrame(step);
  }
  
  // Button Change
  document.getElementById("b1").onclick = changeButton;
  // Move Box
  document.getElementById("box1").onclick = moveBox;
  // Slide Box
  document.getElementById("box2").onclick = slideBox;
  // To-Do List
  document.getElementById("b2").onclick = submitToDo;
  // New Slide Box
  document.getElementById("box3").onclick = slideBoxNew;
  
});

