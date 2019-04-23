const request = require("request");
const geocode = (address, callback) => {
 const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  address
 )}.json?access_token=pk.eyJ1IjoibWF0d21pbmciLCJhIjoiY2p1bzFhNWJpMDk1ODRkbzVhNGw5ZTA5aSJ9.CkWUmqQVs9QRKejxqfQqtg&limit=5`;
 request({ url: url, json: true }, (error, { body }) => {
  if (error) {
   callback("unable to connect to location services", undefined);
  } else if (body.features.length === 0) {
   callback("unable to find location.Try another search", undefined);
  } else {
   callback(undefined, {
    latitude: body.features[0].center[1],
    longitude: body.features[0].center[0],
    location: body.features[0].place_name
   });
  }
 });
};

const forecast = (latitude, longitude, callback) => {
 const url = `https://api.darksky.net/forecast/8084a5fb47d8102cd6c0aaf51b565882/${latitude},${longitude}`;
 request({ url: url, json: true }, (error, { body }) => {
  if (error) {
   callback("unable to connect to weather service", undefined);
  } else if (body.error) {
   callback("unable to find location", undefined);
  } else {
   callback(
    undefined,
    body.daily.data[0].summary + "it is currently " + body.currently.temperature + " degrees out"
   );
  }
 });
};
module.exports = {
 geocode,
 forecast
};
