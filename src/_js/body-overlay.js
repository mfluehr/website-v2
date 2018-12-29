function look() {
  const i = Math.floor(Math.random() * 8);

  eyes.forEach((eye) => {
    eye.style.opacity = 0;
  });

  if (i < 4) {
    eyes[i].style.opacity = 1;
  }

  setTimeout(look, Math.random() * 4000 + 5000);
}


const chameleon = document.querySelector("#chameleon"),
      eyes = document.querySelectorAll(".eye"),
      varieties = 9;

setTimeout(look, 3000);
