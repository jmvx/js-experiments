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
    if (newPosition > window.innerWidth - 100) {
      newPosition = 20; // loops back to beginning
    }
    box.style.left = newPosition + 'px';
  }
  
  // Slide box (smoothly) on click
  function slideBox(event) {
    // slide box 1px every 1 ms
    var interval = setInterval(function() {
      var box = event.target;
      var currentPosition = box.offsetLeft;
      var newPosition = currentPosition + 1;
      console.log(newPosition)
      if (newPosition > window.innerWidth - 100) {
        box.style.left = "20px"; // loops back to beginning
        clearInterval(interval);
      } else {
        box.style.left = newPosition + 'px';
      }
    }, 1);

    // You should know that setInterval/setTimeout are throttled,
    // and to different thresholds in different browsers, so this
    // is not really safe (the speed of the box animation depends on
    // the speed of the throttled timer).
    // In this case, you are definitely *not* going to get a 1ms
    // interval. See http://www.belshe.com/test/timers.html for more.
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
    var startTime = undefined;
    var box = event.target;
    var startPosition = box.offsetLeft;
    function step(timestamp) {
      if (!startTime)
        startTime = timestamp;
      var progress = timestamp - startTime;
      var newPosition = startPosition + progress / 10;
      box.style.left = newPosition + 'px';
      if (newPosition < window.innerWidth - 100) {
        window.requestAnimationFrame(step);
      } else {
        box.style.left = "20px"; // loops back to beginning
      }
    }
    window.requestAnimationFrame(step);
  }

  var swap_me = [];
  function swapBox(event) {
    var box = event.target;
    if (box == swap_me[0]) {
      // if box was already clicked on, reset swap_me (deselect box)
      swap_me[0].classList.remove("swap")
      swap_me = []
    } else if (swap_me.length < 2) {
      // if two boxes haven't been selected, add box to set and change it blue
      box.classList.add("swap");
      swap_me.push(box)
    } 
    if (swap_me.length == 2) {
      // if two boxes have been selected, swap
      swapDivs();
    }
    function swapDivs() {
      var parentDiv = document.getElementById(swap_me[0].id).parentNode;
      var childDiv = document.getElementById(swap_me[0].id);
      var sibDiv = document.getElementById(swap_me[1].id);
      // Remove the blue "swap" class so it's not cloned with it
      childDiv.classList.remove("swap");
      sibDiv.classList.remove("swap");
      // Make copies of the original divs, replace old divs with copies
      var copyChild = childDiv.cloneNode(true);
      var copySib = sibDiv.cloneNode(true);
      childDiv = parentDiv.replaceChild(copySib,childDiv);
      sibDiv = parentDiv.replaceChild(copyChild,sibDiv);
      // swap is finished, clear the swapped boxes array
      swap_me = [];
      // Reassign event handlers to new divs
      copySib.onclick = swapBox;
      copyChild.onclick = swapBox;
    }
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
  // Swappable box
  divs = document.getElementsByClassName("swapable");
  // assign swapBox event handler
  var i = 0
  for (i = 0; i < divs.length; i++) {
    divs[i].onclick = swapBox;
  }
  
  // Returns true if object is in the Array
  Array.prototype.contains = function(obj) {
    var len = this.length;
    var i;
    for (i = 0; i < len; i++) {
      if (this[i] == obj) {
        return true;
      }
    } return false;
  }
  
  
});

