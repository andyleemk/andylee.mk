
/* jQuery import */
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

/* Simple Helper Function to determine client local time in terms of minutes + automatically set site theme to dark or light mode */

function initializeDarkCheck() {
  var offset = new Date().getTimezoneOffset();
  var UTChour = new Date().getUTCHours();
  var UTCmin = new Date().getUTCMinutes();

  var LocalTime = UTChour * 60 + UTCmin - offset;

  if (LocalTime >= 1440) {
      LocalTime -= 1440;
  }
  
  if (LocalTime > 1020 || LocalTime < 300) {
      console.log('dark mode');
      return true;
  } else {
      console.log('light mode');
      return false;
  }
}

/* Method to clear local storage using Timestamps*/

var time = {value: "value", timestamp: new Date().getTime()}
localStorage.setItem("key", JSON.stringify(time));

var time = JSON.parse(localStorage.getItem("key")),
    prevTimestamp = time.timestamp,
    curTimestamp = new Date().getTime().toString();

    if (curTimestamp - prevTimestamp > 86400) {
      localStorage.clear();
    }

/* Light and Dark Theme Helper Function */
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

function switchTheme(e) {
  if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); 
  }
  else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); 
  }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

else {

 var initializeCheck = initializeDarkCheck();

  if(initializeCheck) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitch.checked = true;
  }

  else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

/* Text Animation with Anime.js, reference: https://tobiasahlin.com/moving-letters/#9 */

var textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

var textWrapper2 = document.querySelector('.ml9 .letters-2');
textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter2'>$&</span>");

var textWrapper3 = document.querySelector('.ml9 .letters-3');
textWrapper3.innerHTML = textWrapper3.textContent.replace(/\S/g, "<span class='letter3'>$&</span>");

console.log(textWrapper.innerHTML);
anime.timeline({loop: true})
.add({
  targets: '.ml9 .letter',
  scale: [0, 1],
  duration: 1500,
  elasticity: 600,
  delay: (el, i) => 45 * (i+1)
}).add({
  targets: '.ml9 .letter',
  opacity: 0,
  duration: 1000,
  easing: "easeOutExpo",
  delay: 500
}).add({
  targets: '.ml9 .letter2',
  scale: [0, 1],
  duration: 1500,
  elasticity: 600,
  delay: (el, i) => 45 * (i+1)
}).add({
  targets: '.ml9 .letter2',
  opacity: 0,
  duration: 1000,
  easing: "easeOutExpo",
  delay: 500
}).add({
  targets: '.ml9 .letter3',
  scale: [0, 1],
  duration: 1500,
  elasticity: 600,
  delay: (el, i) => 45 * (i+1)
}).add({
  targets: '.ml9 .letter3',
  opacity: 0,
  duration: 500,
  easing: "easeOutExpo",
  delay: 1000
});

/* Accordion Menu Callback Function */

var previewTextCont = document.querySelectorAll('.projectContainer');

for(var i = 0; i < previewTextCont.length; i++) {
  previewTextCont[i].addEventListener('click', openAccordion);
}

function openAccordion(e) {
  var previewContainer = this;
  console.log(previewContainer);
	var bodyContainer = this.getElementsByClassName("bodyContainer")[0];
  var arrow = this.getElementsByClassName("fa-chevron-down arrow")[0];
  var bodyHeight = 50 + this.getElementsByClassName("bodyText")[0].clientHeight;

  console.log(bodyHeight);
	if (!previewContainer.classList.contains("isActive")) {
    $(previewContainer).addClass("isActive");
    $(bodyContainer).css("height", bodyHeight);
    $(arrow).css("transform", "scale(-1,-1)");
  }
  
	else {
    $(previewContainer).removeClass("isActive");
    $(bodyContainer).css("height", "0px");
    $(arrow).css("transform", "none");
	}
}

/* Audio player */

function playAudio(url) {
  new Audio(url).play();
}

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */

 /* Reduced Resizor.js Function */

function ResizeSensor(element, callback)
{
    let zIndex = parseInt(getComputedStyle(element));
    if(isNaN(zIndex)) { zIndex = 0; };
    zIndex--;

    let expand = document.createElement('div');
    expand.style.position = "absolute";
    expand.style.left = "0px";
    expand.style.top = "0px";
    expand.style.right = "0px";
    expand.style.bottom = "0px";
    expand.style.overflow = "hidden";
    expand.style.zIndex = zIndex;
    expand.style.visibility = "hidden";

    let expandChild = document.createElement('div');
    expandChild.style.position = "absolute";
    expandChild.style.left = "0px";
    expandChild.style.top = "0px";
    expandChild.style.width = "10000000px";
    expandChild.style.height = "10000000px";
    expand.appendChild(expandChild);

    let shrink = document.createElement('div');
    shrink.style.position = "absolute";
    shrink.style.left = "0px";
    shrink.style.top = "0px";
    shrink.style.right = "0px";
    shrink.style.bottom = "0px";
    shrink.style.overflow = "hidden";
    shrink.style.zIndex = zIndex;
    shrink.style.visibility = "hidden";

    let shrinkChild = document.createElement('div');
    shrinkChild.style.position = "absolute";
    shrinkChild.style.left = "0px";
    shrinkChild.style.top = "0px";
    shrinkChild.style.width = "200%";
    shrinkChild.style.height = "200%";
    shrink.appendChild(shrinkChild);

    element.appendChild(expand);
    element.appendChild(shrink);

    function setScroll()
    {
        expand.scrollLeft = 10000000;
        expand.scrollTop = 10000000;

        shrink.scrollLeft = 10000000;
        shrink.scrollTop = 10000000;
    };
    setScroll();

    let size = element.getBoundingClientRect();

    let currentWidth = size.width;
    let currentHeight = size.height;

    let onScroll = function()
    {
        let size = element.getBoundingClientRect();

        let newWidth = size.width;
        let newHeight = size.height;

        if(newWidth != currentWidth || newHeight != currentHeight)
        {
            currentWidth = newWidth;
            currentHeight = newHeight;

            callback();
        }

        setScroll();
    };

    expand.addEventListener('scroll', onScroll);
    shrink.addEventListener('scroll', onScroll);
};
