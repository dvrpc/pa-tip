import mapboxgl from "mapbox-gl";
import { createVNode } from "inferno";
import { VNodeFlags } from "inferno-vnode-flags";

import { colors } from "./tileGeometryColorType.js";

export const updateBounds = mapReference => {
  var features = mapReference.map.querySourceFeatures("pa-tip", {
    sourceLayer: "patip_fy19"
  });

  if (features) {
    //work out some logic to populate the tiles
    console.log(features);
  }

  //@TODO old logic
  let bounds = mapReference.map.getBounds();

  const NEbounds = bounds.getNorthEast();
  const SWbounds = bounds.getSouthWest();

  bounds = [NEbounds.lng, NEbounds.lat, SWbounds.lng, SWbounds.lat];

  mapReference.props.getTIPByMapBounds(bounds);
};
