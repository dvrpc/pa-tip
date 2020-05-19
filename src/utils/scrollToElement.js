// @UPDATE: this stays in utils b/c it will be part of the new Project component (in addition to the homepage)
export const scrollToElement = (instance, e, target) => {
  e.preventDefault();
  instance[target].scrollIntoView({ behavior: "smooth", block: "start" });
};
