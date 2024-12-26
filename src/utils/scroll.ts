const scroll = (direction: string, scrollAmount: number = 300) => {
  const container = document.getElementById("recipe-container") as HTMLElement;

  if (container) {
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const maxScroll = container.scrollWidth - container.offsetWidth;

    if (direction === "left") {
      if (container.scrollLeft <= 0) {
        container.scrollLeft = maxScroll;
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft >= scrollWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  }
};

export default scroll;
