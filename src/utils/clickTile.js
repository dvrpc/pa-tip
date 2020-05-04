export const clickTile = (instance, e) => {
  e.preventDefault();
  const data = instance.props.data;

  if (!data) {
    console.log("no data: ", data);
    return;
  }

  console.log("data at clickTile ", data);

  const lng = data.LONGITUDE;
  const lat = data.LATITUDE;
  const id = data.id || data.MPMS_ID;

  // hit reducer for projectPosition
  // fields:
  // lat/lng
  // zoom level
  // @TODO: handle lines. Need to fit bounds or something for these...
  // id for filtering
  // change style to increase radius, stroke width, etc., of selected project

  // render for keywords or geocoded response format
  instance.props.history.push(`/Project/${id}`);
};
