import { useState, useEffect } from "react";

export default function watchLocation() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(err);
      }
    );
    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, []);

  return { location, error };
}
