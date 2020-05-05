export const clickTile = (project, setProjectScope) => {
  if (!project) {
    console.log("no data: ", project);
    return;
  }

  const data = project.data;
  const lng = data.LONGITUDE;
  const lat = data.LATITUDE;
  const id = data.MPMS_ID;

  const projectScope = {
    coords: [lng, lat],
    id,
    zoom: 18
  };

  // set info for map.js
  setProjectScope(projectScope);

  // render for keywords or geocoded response format
  project.history.push(`/Project/${id}`);
};
