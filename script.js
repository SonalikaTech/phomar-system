/*==========================================
        Phomar Systems
        script.js
==========================================*/

// ===============================
// Sticky Navbar
// ===============================

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 60) {

        navbar.style.background = "#001f3f";
        navbar.style.padding = "10px 0";
        navbar.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";

    } else {

        navbar.style.background = "#002b5c";
        navbar.style.padding = "15px 0";
        navbar.style.boxShadow = "none";

    }

});


// ===============================
// Counter Animation
// ===============================

const counters = document.querySelectorAll("#counter h2");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = Number(counter.innerText.replace("+",""));

        const current = Number(counter.getAttribute("data-count")) || 0;

        const increment = Math.ceil(target / 100);

        if(current < target){

            counter.innerText = current + increment + "+";

            counter.setAttribute("data-count", current + increment);

            setTimeout(updateCounter,20);

        }

        else{

            counter.innerText = target + "+";

        }

    };

    updateCounter();

});


// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// ===============================
// Scroll To Top Button
// ===============================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";

topBtn.style.right="20px";

topBtn.style.bottom="20px";

topBtn.style.width="50px";

topBtn.style.height="50px";

topBtn.style.borderRadius="50%";

topBtn.style.border="none";

topBtn.style.background="#007bff";

topBtn.style.color="#fff";

topBtn.style.fontSize="22px";

topBtn.style.cursor="pointer";

topBtn.style.display="none";

topBtn.style.zIndex="999";

window.addEventListener("scroll",()=>{

    if(window.scrollY>400){

        topBtn.style.display="block";

    }

    else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// ===============================
// Fade In Animation
// ===============================

const reveal=document.querySelectorAll("section");

window.addEventListener("scroll",()=>{

    reveal.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        const windowHeight=window.innerHeight;

        if(top<windowHeight-100){

            section.style.opacity="1";

            section.style.transform="translateY(0px)";

            section.style.transition=".8s";

        }

    });

});


// ===============================
// Default Hidden
// ===============================

reveal.forEach(section=>{

    section.style.opacity="0";

    section.style.transform="translateY(60px)";

});


// ===============================
// Active Navbar Link
// ===============================

const navLinks=document.querySelectorAll(".navbar a");

navLinks.forEach(link=>{

    link.addEventListener("click",function(){

        navLinks.forEach(item=>{

            item.classList.remove("active");

        });

        this.classList.add("active");

    });

});


// ===============================
// Contact Form Validation
// ===============================

const form=document.querySelector("form");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const inputs=form.querySelectorAll("input, textarea");

let valid=true;

inputs.forEach(input=>{

if(input.value.trim()==""){

input.style.border="2px solid red";

valid=false;

}

else{

input.style.border="2px solid green";

}

});

if(valid){

alert("Thank You! We will contact you soon.");

form.reset();

}

});

}


// ===============================
// Loader
// ===============================

window.onload=function(){

const loader=document.querySelector(".loader");

if(loader){

loader.style.display="none";

}

};


// ===============================
// Console
// ===============================

console.log("Phomar Systems Website Loaded Successfully");



document.getElementById("contactBtn").addEventListener("click", function () {

    window.open(
        "https://forms.gle/XXXXXXXXXXXX",
        "_blank"
    );

});
