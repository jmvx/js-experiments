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
      box.style.left = "20px"; // loops back to beginning
    } else {
      box.style.left = newPosition + 'px';
    }
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
  
  var swapped_boxes = [];
  function swapBox(event) {
    var box = event.target;
    if (swapped_boxes.length < 2) {
      // if two boxes haven't been selected, add box to set and change it blue
      box.classList.add("swap");
      swapped_boxes.push(box)
      if (swapped_boxes.length == 2) {
        // if adding the box makes a complete set, swap the HTML contents
        swapHTML(swapped_boxes);
      }
    } else if (swapped_boxes.length == 2 && swapped_boxes.contains(box) == true) {
      // if there is already a complete set and a box in the set is re-clicked
      // just swap the HTML contents
      swapHTML(swapped_boxes);
      if (box == swapped_boxes[0]) {
        // if the reclicked box was the oldest box, make it the newest box
        swapped_boxes = swapped_boxes.reverse();
      }
    } else if (swapped_boxes.length == 2 && swapped_boxes.contains(box) == false){
      // if there is already a complete set and a third new box is clicked
      // remove the oldest box from the set
      // add the new box to the set
      // swap the content of the boxes
      swapped_boxes[0].classList.remove("swap");
      swapped_boxes.shift();
      box.classList.add("swap");
      swapped_boxes.push(box);
      swapHTML(swapped_boxes);
    }
    // swapps innerHTML for two divs
    function swapHTML(ary) {
      var temp = ary[0].innerHTML;
      ary[0].innerHTML = ary[1].innerHTML;
      ary[1].innerHTML = temp;
      return ary;
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
  divs = document.getElementsByClassName("swapable")
  var i = 0
  for (i = 0; i < divs.length; i++) {
    divs[i].onclick = swapBox;
  }
  
  // Prototype method stuff
  
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

