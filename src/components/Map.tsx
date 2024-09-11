import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const Map: React.FC<{}> = (props) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState<number | string>(-82.821);
  const [lat, setLat] = useState<number | string>(42.7169);
  const [zoom, setZoom] = useState<number | string>(9.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN,
      container: mapContainerRef.current as any,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng as number, lat as number],
      zoom: zoom as number,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4) as string);
      setLat(map.getCenter().lat.toFixed(4) as string);
      setZoom(map.getZoom().toFixed(2) as string);
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        showUserLocation: true,
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      }),
      "top-right"
    );

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ paddingTop: "50px" }}>
      <div id="map">
        <div
          className="m-auto w-[90%] md:w-[50%] h-[200px] md:h-[500px]"
          ref={mapContainerRef}
        />
      </div>
    </div>
  );
};

export default Map;
