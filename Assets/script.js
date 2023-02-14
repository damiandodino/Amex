//clicks accordion after clicking button

var button = document.getElementById('click-on-me');
button.addEventListener('click', clicksButton)

function clicksButton() {
    var accordion = document.getElementById('chck2');
    accordion.click()

}

var hoverRightColumn = false;
var curScroll = 0; //initialize var that handles right column's scroll

//Determine whether column left is at the bottom 
let endColumnLeft = document.getElementById('end-column-left');

let columnLeftIsScrolled = false;

let columnRight = document.querySelector('.column-right');
let columnRightHeight = columnRight.scrollHeight - columnRight.clientHeight; //subtract the height of the visible area

let observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('end-column-left is in the viewport');
      columnLeftIsScrolled = true;
    } else {
      console.log('end-column-left is NO longer in the viewport');
      columnLeftIsScrolled = false;
    }

    if (columnLeftIsScrolled === true) {
      console.log('Column left is scrolled');
      var isScrollingEnabled = false;

      function controlScroll(e) {
        var evt = window.event || e;
        var delta = evt.detail ? evt.detail * (0) : evt.wheelDelta;
        if (delta < 0) {
          //scroll down
          curScroll += 50;
        } else if (delta > 0) {
          //scroll up
          if (document.querySelector('.column-left:hover')) {
            //mouse is over the column-left element
            columnRight.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            curScroll = 0; //reset curScroll to 0
          } else if (document.querySelector('.column-right:hover') && columnLeftIsScrolled) {
            //mouse is over the column-right element and endColumnLeft is in the viewport
            curScroll -= 50;
          }
        }
        if (columnLeftIsScrolled) {
          curScroll = Math.min(curScroll, columnRightHeight);
          curScroll = Math.max(curScroll, 0);
          columnRight.scrollTo({
            top: curScroll,
            behavior: "smooth"
          });
        }
      }
      
      
      

      document.addEventListener("mousemove", function () {
        if (document.querySelector(".column-right:hover")) {
          console.log('Mouse is over the right column now');
          if (isScrollingEnabled) {
            document.removeEventListener("mousewheel", controlScroll);
            isScrollingEnabled = false;
          }
        } else {
          console.log('Mouse is not over the right column now');
          if (!isScrollingEnabled) {
            document.addEventListener("mousewheel", controlScroll);
            isScrollingEnabled = true;
          }
        }
      });
    }

  });
});

observer.observe(endColumnLeft);

let endColumnRight = document.getElementById('end-column-right');
let columnRightIsScrolled = false;

let observerRight = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('end-column-right is in the viewport');
        columnRightIsScrolled = true;
      } else {
        console.log('end-column-right is NO longer in the viewport');
        columnRightIsScrolled = false;
      }
  
      if (columnRightIsScrolled === true) {
        console.log('Column right is scrolled');

      }
    });
});
  

observerRight.observe(endColumnRight);


setInterval(() => {
    if (columnRightIsScrolled === true && columnRightIsScrolled === true) {
      const hideElements = document.querySelectorAll(".hide");
      hideElements.forEach(element => element.classList.remove("hide"));
    }
  }, 200);
  
  
