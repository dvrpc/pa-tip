// util function to populate tiles with information (background, title, etc)

import { geometryColorType, colors } from "./tileGeometryColorType.js";
import cachedFetch from "./cachedFetch.js";

export const tileDetails = async (propsProject, width, height) => {
  let projectName;
  let background;
  let projectType;
  let borderBottom;

  if (propsProject) {
    // limit project names to 80 characters
    projectName = propsProject.PROJECTNAM;
    if (projectName.length > 40) projectName = projectName.slice(0, 36) + "...";

    // Get a background image for the project according to its type (function needs coords & category)
    const path = geometryColorType(propsProject);

    background = await cachedFetch(
      `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${width}x${height}&maptype=satellite${path}`
    )
      .then(r => r.blob())
      .then(b => URL.createObjectURL(b));

    // based on the project type, assign the gradient value for the caption text
    projectType = propsProject.TYPE_DESC;

    borderBottom = {
      borderBottom: `10px solid ${colors[projectType].darkest}`
    };

    return { background, borderBottom, projectName };
  } else {
    return false;
  }
};
