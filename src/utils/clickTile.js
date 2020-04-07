export const clickTile = (instance, e) => {
  e && e.preventDefault();
  const data = instance.props.data;

  // render for keywords or geocoded response format
  const id = data.id || data.MPMS_ID;
  instance.props.history.push(`/expanded/${id}`);
};
