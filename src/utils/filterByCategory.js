export const filterByCategory = (instance, e) => {
  // get a handle on the selected option
  const selector = instance.categorySelector;
  const categoryToFilter = selector.options[selector.selectedIndex].text;

  // apply or remove filter depending on the selected option
  if (categoryToFilter === "All Categories") {
    instance.setState({ filtered: false });
  } else {
    instance.setState({
      filtered: true,
      categoryToFilter
    });
  }
  instance.props.setFilter(categoryToFilter);
};
