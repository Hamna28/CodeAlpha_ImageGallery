const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = Array.from(galleryItems);
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const item = visibleItems[currentIndex];
    const image = item.querySelector("img");
    const title = item.querySelector("h3");
    const category = item.querySelector("p");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxTitle.textContent = title.textContent;
    lightboxCategory.textContent = category.textContent;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

function showNext() {
    currentIndex++;
    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }
    openLightbox(currentIndex);
}

function showPrevious() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }
    openLightbox(currentIndex);
}

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        const index = visibleItems.indexOf(item);
        openLightbox(index);
    });
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        const filter = button.dataset.filter;
        visibleItems = [];
        galleryItems.forEach(item => {
            if (filter === "all" || item.dataset.category === filter) {
                item.style.display = "block";
                visibleItems.push(item);
            } else {
                item.style.display = "none";
            }
        });
    });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrevious);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("show")) {
        return;
    }
    if (event.key === "ArrowRight") {
        showNext();
    }
    if (event.key === "ArrowLeft") {
        showPrevious();
    }
    if (event.key === "Escape") {
        closeLightbox();
    }
});