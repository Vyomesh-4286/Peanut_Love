
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".card-scroll-ref-trigger").forEach((element, index) => {
    const parentElement = element.closest(".card-scroll-wrapper, .card-toggle-content");
    console.log(parentElement);

    gsap.matchMedia().add("(min-width: 0px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      if (index > 0) {
        timeline
          .from(
            parentElement.querySelectorAll(".layout16_image-wrap")[index],
            {
              yPercent: 120,
              ease: "none",
            },
            "<"
          )
          .to(
            parentElement.querySelectorAll(".layout16_image-wrap")[index - 1],
            {
              scale: 0.8,
              ease: "none",
            },
            "<"
          );
      }

      // New GSAP timeline initialization with smoother transitions
      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 30%",
          end: "bottom 30%",
          scrub: 0.5,
           onEnter: function() {
            if (index > 0) {
              parentElement.querySelectorAll(".layout16_content").forEach(txt => txt.classList.remove("is-active"));
              parentElement.querySelectorAll(".card-scroll-nav-bar").forEach(nav => nav.classList.remove("is-active"));
            }

            parentElement.querySelectorAll(".card-scroll-nav-bar")[index].classList.add("is-active");
            parentElement.querySelectorAll(".layout16_content")[index].classList.add("is-active");

    
          },
          onEnterBack: function() {
            parentElement.querySelectorAll(".layout16_content").forEach(txt => txt.classList.remove("is-active"));
            parentElement.querySelectorAll(".card-scroll-nav-bar").forEach(nav => nav.classList.remove("is-active"));
            parentElement.querySelectorAll(".layout16_content")[index].classList.add("is-active");
            parentElement.querySelectorAll(".card-scroll-nav-bar")[index].classList.add("is-active");
          }
        }
      });

    });
  });
});


document.querySelectorAll(".card-scroll-nav-bar").forEach((navBar, index) => {
  navBar.addEventListener("click", function() {
    // Get the corresponding ".card-scroll-ref-trigger" element
    const scrollSticky = this.closest(".scroll-sticky");
    const target = scrollSticky.querySelectorAll(".card-scroll-ref-trigger")[index];

    // Calculate the target scroll position
    const targetOffsetTop = target.getBoundingClientRect().top + window.pageYOffset;
    const targetOuterHeight = target.offsetHeight;
    const targetScrollTop = targetOffsetTop + targetOuterHeight;
    const windowHeight = window.innerHeight;

    // Animate the scroll
    window.scrollTo({
      top: targetScrollTop - windowHeight,
      behavior: "smooth"
    });
  });
});