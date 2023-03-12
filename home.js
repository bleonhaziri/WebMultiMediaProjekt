const toTopButton = document.getElementById("to-top-btn");
window.addEventListener("scroll", scrollFunction);

function scrollFunction(){
    if (window.scrollY > 730) { 
        toTopButton.classList.add("show"); // show button
    }
    else {
        toTopButton.classList.remove("show"); // hide button
    }
}

toTopButton.addEventListener("click", function(){
    window.scrollTo(0,0); // scroll back to the top
})


/*---------------------Our Statistics------------------ */
const stats = document.querySelectorAll(".statistics");
const countBtn = document.getElementById("count-btn");

window.addEventListener("scroll",btnClick)

function btnClick(){
    if (window.scrollY > 680) {
    countBtn.click();
    countBtn.disabled = true}
}


function startCount(){
stats.forEach(function(statistics){
    
    statistics.innerText = "0";

    function updateCounter(){
        var target = parseInt(statistics.getAttribute("data-stop-count"));
        var counter = parseInt(statistics.innerText);
        var increment = target / 1000;


        if (counter < target) {
            statistics.innerText = Math.ceil(counter + increment);
            setTimeout(updateCounter,1);
        } else {
            statistics.innerText = target;
        }
    };
    updateCounter();
  
})};


/* -------------- toTop button counter ----------- */
var count = 0;
$("#to-top-btn").on('click', function() {
    count++;
  if (typeof(Storage) !== "undefined") {
      sessionStorage.toTopCount = count;
  }});



/* ------------------- Responsive Menu ----------------*/ 

const navSlide = () => {
    const menu = document.querySelector(".menu");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll(".nav_links li");
    
    //toggle now
    menu.addEventListener("click", () => {
        nav.classList.toggle("nav-active");

        //animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {link.style.animation = `navLinkFade 0.5s ease forwards ${index / 6 + 0.5}s`
        }
        });
        // menu animation
        menu.classList.toggle("line-toggle");
    });

}

navSlide();