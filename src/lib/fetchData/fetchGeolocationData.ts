const POSITIONSTACK_URL = "http://api.positionstack.com/v1/forward";

export const fetchGeolocationData = async (address: string) => {
  try {
    const response = await fetch(
      `${POSITIONSTACK_URL}?access_key=${process.env.NEXT_PUBLIC_REACT_APP_GEOCODE}&query=${address}&https=false`
    );

    const data = await response.json();

    const label = data.data[0].label;
    const latitude = data.data[0].latitude;
    const longitude = data.data[0].longitude;

    return { label, latitude, longitude };
  } catch (error) {
    console.log(error);
  }
};
