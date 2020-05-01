export const clickTile = (instance, e) => {
  e && e.preventDefault();
  const data = instance.props.data;
  // @UPDATE: the trick here is to change the route WITHOUT triggering a re-render

  // render for keywords or geocoded response format
  const id = data.id || data.MPMS_ID;
  instance.props.history.push(`/Project/${id}`);

  // @UPDATE:
  // This needs to:
  // zoom to point or line extent
  // point zoom
  // change style to increase radius, stroke width, etc., of selected project
};
