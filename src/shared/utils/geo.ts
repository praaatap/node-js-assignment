const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const haversineDistanceKm = (
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): number => {
  const dLat = toRadians(toLat - fromLat);
  const dLon = toRadians(toLon - fromLon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(fromLat)) *
      Math.cos(toRadians(toLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
};
