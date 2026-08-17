// =========================
// IMAGE GALLERY
// =========================

const galleryImages = document.querySelectorAll(".gallery .image");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const counter = document.querySelector(".counter");

// Theme
const themeBtn = document.getElementById("themeBtn");

// Search
const searchInput = document.getElementById("search");

// Filter
const filterBtns = document.querySelectorAll(".buttons button");

let currentImages = [];
let currentIndex = 0;
let currentFilter = "all";

// =========================
// DARK MODE
// =========================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }else{
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

});

// =========================
// FILTER
// =========================

filterBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filterBtns.forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        filterImages();

    });

});

// =========================
// SEARCH
// =========================

searchInput.addEventListener("keyup",filterImages);

function filterImages(){

    const value = searchInput.value.toLowerCase();

    galleryImages.forEach(image=>{

        const category = [...image.classList]
        .find(cls=>cls!="image")
        .toLowerCase();

        const matchFilter =
        currentFilter==="all" || category===currentFilter;

        const matchSearch =
        category.includes(value);

        if(matchFilter && matchSearch){

            image.style.display="block";

        }else{

            image.style.display="none";

        }

    });

}

// =========================
// LIGHTBOX
// =========================

galleryImages.forEach(img=>{

    img.addEventListener("click",()=>{

        currentImages=[...document.querySelectorAll(".gallery .image")]
        .filter(item=>item.style.display!=="none");

        currentIndex=currentImages.indexOf(img);

        showImage();

        lightbox.classList.add("active");

    });

});

function showImage(){

    const image=currentImages[currentIndex].querySelector("img");

    lightboxImg.src=image.src;

    counter.textContent=`${currentIndex+1} / ${currentImages.length}`;

}

// =========================
// NEXT
// =========================

nextBtn.onclick=()=>{

    currentIndex++;

    if(currentIndex>=currentImages.length){

        currentIndex=0;

    }

    showImage();

}

// =========================
// PREVIOUS
// =========================

prevBtn.onclick=()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=currentImages.length-1;

    }

    showImage();

}

// =========================
// CLOSE
// =========================

closeBtn.onclick=()=>{

    lightbox.classList.remove("active");

}

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});

// =========================
// KEYBOARD
// =========================

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

    if(e.key==="Escape"){

        lightbox.classList.remove("active");

    }

});

// =========================
// LIKE BUTTON
// =========================

const likes=document.querySelectorAll(".like");

likes.forEach(btn=>{

    btn.addEventListener("click",(e)=>{

        e.stopPropagation();

        btn.classList.toggle("active");

        if(btn.classList.contains("active")){

            btn.innerHTML='<i class="fa-solid fa-heart"></i>';

        }else{

            btn.innerHTML='<i class="fa-regular fa-heart"></i>';

        }

    });

});