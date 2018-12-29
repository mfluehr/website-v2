function changeSlide(delta) {
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

  newIndex = prevIndex + Number(delta);

  if (newIndex < 0) {
    newIndex = slides.length - 1;
  }
  else if (newIndex >= slides.length) {
    newIndex = 0;
  }

  viewSlide(slides[newIndex], true);
}

function closeSlide(e) {
  view.remove();
}

function handleChangeButton(e) {
  e.preventDefault();
  changeSlide(e.target.dataset.delta);
}

function handleInput(e) {
  const el = e.target;

  if (e.which === 1 || e.key === "Enter") {
    if (el && el.classList.contains("slide-link")) {
      e.preventDefault();
      viewSlide(el.parentElement);
    }
    else if (el && el.classList.contains("slides-link")) {
      viewSlide(el.closest(".project").querySelector(".slide"));
    }
  }
  else if (e.key === "ArrowLeft") {
    changeSlide(-1);
  }
  else if (e.key === "ArrowRight") {
    changeSlide(1);
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
  slide.querySelector("a").focus();

  if (!inPlace) {
    container.insertBefore(view, lastOnLine.nextSibling);
  }
}


const html = `
<figure class="view-inner" id="view">
  <button class="view-button view-button-prev i-arrow-left" type="button" data-delta="-1" aria-label="Previous image"></button>
  <div class="view-content">
    <img>
    <figcaption></figcaption>
  </div>
  <button class="view-button view-button-next i-arrow-right" type="button" data-delta="1" aria-label="Next image"></button>
</figure>
<button class="view-button view-button-close i-ex" type="button" aria-label="Close image"></button>
`;

const view = document.createElement("li");
view.className = "view";
view.innerHTML = html;
const img = view.querySelector("img");
const caption = view.querySelector("figcaption");
const prevButton = view.querySelector(".view-button-prev");
const nextButton = view.querySelector(".view-button-next");
const closeButton = view.querySelector(".view-button-close");
let prevSlide;

document.addEventListener("keydown", (e) => handleInput(e));
document.addEventListener("click", (e) => handleInput(e));
prevButton.addEventListener("click", handleChangeButton);
nextButton.addEventListener("click", handleChangeButton);
closeButton.addEventListener("click", closeSlide);
