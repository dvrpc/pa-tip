import mapboxgl from "mapbox-gl";
import { createVNode } from "inferno";
import { VNodeFlags } from "inferno-vnode-flags";

import { colors } from "./tileGeometryColorType.js";

export const updateBounds = mapReference => {
  let bounds = mapReference.map.getBounds();

  const NEbounds = bounds.getNorthEast();
  const SWbounds = bounds.getSouthWest();

  bounds = [NEbounds.lng, NEbounds.lat, SWbounds.lng, SWbounds.lat];

  mapReference.props.getTIPByMapBounds(bounds);
};
