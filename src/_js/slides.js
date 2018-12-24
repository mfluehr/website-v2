function changeSlide(e) {
  e.preventDefault();

  const container = prevSlide.parentElement;
  const slides = container.querySelectorAll(".slide");
  let prevIndex = -1;
  let newIndex = -1;

  for (let i = 0; i < slides.length; i ++) {
    if (slides[i].classList.contains("slide-current")) {
      prevIndex = i;
      break;
    }
  }

  newIndex = prevIndex + Number(e.target.dataset.change);

  if (newIndex < 0) {
    newIndex = slides.length - 1;
  }
  else if (newIndex >= slides.length) {
    newIndex = 0;
  }

  viewSlide(slides[newIndex], true);
}

function toggleSlide(e) {
  if (e.which != 1 && e.key != "Enter") return;

  const slide = e.target.parentElement;

  if (slide && slide.classList.contains("slide")) {
    e.preventDefault();
    viewSlide(slide);
  }
}

function viewSlide(slide, inPlace = false) {
  const container = slide.parentElement;
  let lastOnLine = slide;

  if (prevSlide) {
    prevSlide.classList.remove("slide-current");
  }

  while (lastOnLine.nextElementSibling &&
      lastOnLine.nextElementSibling.getBoundingClientRect().top ===
      slide.getBoundingClientRect().top) {
    lastOnLine = lastOnLine.nextElementSibling;
  }

  prevSlide = slide;
  img.src = slide.querySelector("img").src;
  img.alt = "";
  caption.textContent = slide.querySelector("img").alt;
  slide.classList.add("slide-current");

  if (!inPlace) {
    container.insertBefore(view, lastOnLine.nextSibling);
  }
}


const html = `
<figure class="slide-view-inner">
  <button class="view-button view-button-prev i-arrow-left" type="button" data-change="-1" aria-label="Previous image"></button>
  <div class="view-content">
    <img>
    <figcaption></figcaption>
  </div>
  <button class="view-button view-button-next i-arrow-right" type="button" data-change="1" aria-label="Next image"></button>
</figure>
`;

const view = document.createElement("li");
view.className = "slide-view";
view.innerHTML = html;
const img = view.querySelector("img");
const caption = view.querySelector("figcaption");
const prevButton = view.querySelector(".view-button-prev");
const nextButton = view.querySelector(".view-button-next");
let prevSlide;

document.addEventListener("keydown", (e) => toggleSlide(e));
document.addEventListener("click", (e) => toggleSlide(e));
prevButton.addEventListener("click", changeSlide);
nextButton.addEventListener("click", changeSlide);
