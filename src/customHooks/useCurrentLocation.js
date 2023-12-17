import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserCurrentLocationCordinates } from '../features/locationCordinatesSlice';
const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    userLatitude: null,
    userLongitude: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          setLocation({ userLatitude, userLongitude });
          dispatch(
            addUserCurrentLocationCordinates([userLatitude, userLongitude])
          );
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
