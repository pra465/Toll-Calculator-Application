import { useEffect, useState } from 'react';

const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    userLatitude: null,
    userLongitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          // console.log(userLatitude, userLongitude);
          setLocation({ userLatitude, userLongitude });
        },
        (error) => {
          console.log('Error getting user location: ', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported in your browser');
    }
  }, []);

  return location;
};

export default useCurrentLocation;
