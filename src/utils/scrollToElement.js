export const scrollToElement = (instance, e, target) => {
  e.preventDefault();
  instance[target].scrollIntoView({ behavior: "smooth", block: "start" });
};
