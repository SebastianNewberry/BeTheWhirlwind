import { searchForBusinesses } from "@/data-access/companies";

export const searchForBusinessesUseCase = async (location: string) => {
  const res = await fetch(`
    https://api.mapbox.com/search/geocode/v6/forward?q=${location}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`);

  const desiredCoordinates = await res.json();

  console.log(desiredCoordinates);

  const point = desiredCoordinates.features.geometry.coordinates;

  const sqlPoint = { x: point[0] as Number, y: point[1] as Number };

  searchForBusinesses({ sqlPoint: sqlPoint });
};
