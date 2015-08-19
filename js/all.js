document.addEventListener("DOMContentLoaded", function(event) {
  
  // converts month portion of date to string name
  Date.prototype.JMVgetMonthName = function() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var index = this.getMonth();
    return months[index];
  };
  
  // converts month portion of date to string name
  Date.prototype.JMVgetDayName = function() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var index = this.getDay();
    return days[index];
  };
  
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

  var f = function calendar() {
    // get today's date to title calendar
    var today = new Date();
    var month = today.JMVgetMonthName();
    var day = today.getDate();
    var year = today.getFullYear();
    var weekday = today.JMVgetDayName();
    var todaysDate = weekday + " " + month + " " + day + ", " + year;
    var calDiv = document.getElementById("post7");
    var calTitleDiv = document.createElement("h2");
    var calSubtitleDiv = document.createElement("h3");
    var subtitleContent = document.createTextNode(month);
    var titleContent = document.createTextNode(todaysDate);
    calTitleDiv.appendChild(titleContent);
    calSubtitleDiv.appendChild(subtitleContent);
    calDiv.appendChild(calTitleDiv);
    calDiv.appendChild(calSubtitleDiv);
    // get first date of the month to start calendar numbering
    var g = function makeGrid() {
      var calendar = document.createElement("div");
      calendar.className = "calendar";
      var grid = calDiv.appendChild(calendar);
      var cellId = 0
      for (var j = 0; j < 6; j++) {
        var row = document.createElement("div");
        row.className = "row";
        for(var i = 0; i < 7; i++) {
          var cell = document.createElement("div");
          cell.className = "cell";
          cell.id = cellId;
          cellId += 1;
          row.appendChild(cell);
        } grid.appendChild(row);
      }
    }();
    var h = function fillGrid() {
      var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      var date = 1;
      for (var i = firstDay.getDay(); i < 42; i++) {
        var c = document.getElementById(i);
        if (date == day) { c.classList.add("today"); }
        var stuff = document.createTextNode(date)
        c.appendChild(stuff)
        date = date+1;
        if (date > lastDay.getDate()) {
          break;
        }
      }
    }();
  }();

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
  var divs = document.getElementsByClassName("swapable");
  // assign swapBox event handler
  for (var i = 0; i < divs.length; i++) {
    divs[i].onclick = swapBox;
  }
});

