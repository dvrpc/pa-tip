import Polyline from "@mapbox/polyline";

export const geometryColorType = geometryType => {
  let path;
  if (geometryType === "LineString") {
    path = `&path=color:0x${
      this.props.color
    }ff|weight:8|enc:${Polyline.fromGeoJSON(this.props.data)}`;
  } else if (geometryType === "MultiLineString") {
    path = this.props.data.geometry.coordinates
      .map(
        c =>
          `&path=color:0x${
            this.props.color
          }ff|weight:8|enc:${Polyline.fromGeoJSON({
            type: "LineString",
            coordinates: c
          })}`
      )
      .join("");
  } else if (geometryType === "Point") {
    path = `&markers=color:0x${this.props.color}|${
      this.props.data.geometry.coordinates[1]
    },${this.props.data.geometry.coordinates[0]}`;
  } else if (geometryType === "Polygon") {
    path = this.props.data.geometry.coordinates
      .map(
        c =>
          `&path=color:0x${this.props.color}ff|fillcolor:0x${
            this.props.color
          }66|weight:4|enc:${Polyline.fromGeoJSON({
            type: "LineString",
            coordinates: c
          })}`
      )
      .join("");
  }
};

export const colors = {
  "Bicycle/Pedestrian Improvement": "3388FF",
  "Bridge Repair/Replacement": "b50103",
  Streetscape: "00c8a9",
  "Transit Improvements": "4240BF",
  "Signal/ITS Improvements": "e8c346",
  "Roadway Rehabilitation": "BF409F",
  "Roadway New Capacity": "BF8A40",
  "Intersection/Interchange Improvements": "F57332",
  Other: "3b9770"
};
