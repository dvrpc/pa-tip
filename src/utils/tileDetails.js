// util function to populate tiles with information (background, title, etc)

import { geometryColorType, colors } from "./tileGeometryColorType.js";

export const tileDetails = (propsProject, width, height) => {
  let projectName;
  let background;
  let projectType;
  let borderBottom;

  let project = propsProject.attributes;

  if (project) {
    // limit project names to 80 characters
    projectName = project.ROAD_NAME;
    if (projectName.length > 40) projectName = projectName.slice(0, 36) + "...";

    // Get a background image for the project according to its type (function needs coords & category)
    const path = geometryColorType(project);

    background = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${width}x${height}&maptype=satellite${path}`;

    // based on the project type, assign the gradient value for the caption text
    projectType = project.DESCRIPTIO;

    borderBottom = `border-bottom: 8px solid ${colors[projectType].darkest}`;

    return { background, borderBottom, projectName };
  } else {
    return false;
  }
};
