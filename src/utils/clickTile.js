export const clickTile = (instance, e) => {
  e.preventDefault();
  const data = instance.props.data;

  // render for keywords or geocoded response format
  const county = data.county || data.attributes.CTY;
  const id = data.id || data.attributes.MPMS_ID;
  instance.props.getFullTIP(id);
  instance.props.history.push(`/expanded/${county}/${id}`);
};
