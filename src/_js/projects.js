function init() {
  [...projects].forEach((project, i) => {
    if (project.getBoundingClientRect().top > window.innerHeight) {
      project.classList.add("hidden");
      intersectionObserver.observe(project);
    }
  });
}

function observe(entries) {
  if (!entries[0].isIntersecting) return;

  entries.forEach((entry) => {
    entry.target.classList.remove("hidden");
    intersectionObserver.unobserve(entry.target);
  });
}


try {
  const intersectionObserver = new IntersectionObserver(observe, {
    threshold: .3
  });

  const projects = document.getElementsByClassName("project");

  window.addEventListener("load", (e) => init(), { once: true });
}
catch (err) {
  console.warn("Intersection observer failed");
}
