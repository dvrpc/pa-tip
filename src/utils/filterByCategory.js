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

  // for later: update markers state with the selected filter (someway, somehow!)
  // how to communicate with the map component from here? dont. just invoke
  // another function that does

  /* METHOD: 
    1) Pass a bool (or a string, like above) (markerFilter) to the store
    2) have Map.js listen for that bool on the store
      3) before calling updateMarkers in the didUpdate() hook, check if(markerFilter)
        4) true: 
          A) do the logic at the reducer - check for the bool after response and filter accordingly
          B) filter state and call updateMarkers()?
        5) false: call updateMarkers as usual
  */
};
