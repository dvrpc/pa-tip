export const clickTile = (instance, e) => {
  e && e.preventDefault();
  const data = instance.props.data;

  // render for keywords or geocoded response format
  const id = data.id || data.DBNUM;
  instance.props.history.push(`/expanded/${id}`);
};
