export const filterByCategory = (instance, e) => {
  // get a handle on the selected option
  const selector = instance.categorySelector;
  const categoryToFilter = selector.options[selector.selectedIndex].text;
  const categoryValue = selector.options[selector.selectedIndex].val;
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
  // for later: update markers state with the selected filter (someway, somehow!)

  /* METHOD: 
    1) Pass a bool (or a string, like above) (markerFilter) to the store
    A) do the logic at the reducer - check for the bool after response and filter accordingly
    
    2) have Map.js listen for that bool on the store
      a) before calling updateMarkers in the didUpdate() hook, check if(markerFilter)
        b) true: 
          ba) filter state and call updateMarkers()?
        c) false: call updateMarkers as usual
  */
};
