export const handleRadioChange = (instance, e) => {
  instance.setState({
    selectedButton: e.target.value
  });

  switch (e.target.value) {
    case "Place":
      return (instance.input.placeholder =
        "enter address, location, building, etc");
    case "MPMS":
      return (instance.input.placeholder = "enter project MPMS ID");
    case "Keyword":
      return (instance.input.placeholder = "enter project keywords");
    default:
      return (instance.input.placeholder =
        "enter address, location, building, etc");
  }
};
