const request = require('request-promise-native');


const fetchMyIP = function() {
      return request('https://api.ipify.org?format=json')
  // return request('https://api.ipify.org?format=json')
  // , (error, response, body) => {
  //   if (error) {
  //     return callback(error, null);
  //   }

  //   if (response.statusCode !== 200) {
  //     const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
  //     callback(Error(msg), null);
  //     return;
  //   }

  //   const ip = JSON.parse(body).ip;
  //   callback(null, ip);
  // });
};

// console.log(fetchMyIP);
// const ip = JSON.parse(fetchMyIP()).ip;
// console.log(`https://api.freegeoip.app/json/${ip}`)

const fetchCoordsByIP = function(body) {
  // const ip = JSON.parse(body).ip;
  return request('https://api.freegeoip.app/json/8.8.8.8?apikey=0811f1c0-a663-11ec-9213-f9d7f8fa56e0')
  // return request(`https://api.freegeoip.app/json/${ip}`)
  // , (error, response, body) => {
    // if (error) {
    //   return callback(error, null);
    // }
    
    // if (response.statusCode !== 200) {
    //   const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
    //   callback(Error(msg), null);
    //   return;
    // }

    // const { latitude, longitude } = JSON.parse(body);
    // // const latitude = JSON.parse(body).latitude;
    // // const longitude = JSON.parse(body).longitude;
    // callback(null, {latitude, longitude});

  // })
};

const fetchISSFlyOverTimes = function(body){
  const {latitude, longitude } = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  return request(url)
  //   , (error, response, body) => {
  //   if (error) {
  //     return callback(error, null);
  //   }
    
  //   if (response.statusCode !== 200) {
  //     const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
  //     callback(Error(msg), null);
  //     return;
  //   }


  //   const passes = JSON.parse(body).response;
  //   callback(null, passes);
  // });
};

const nextISSTimesForMyLocation = function(callback) {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });

  // fetchMyIP((error, ip) => {
  //   if (error) {
  //     return callback(error, null);
  //   }

  //   fetchCoordsByIP(ip, (error, loc) => {
  //     if (error) {
  //       return callback(error, null);
  //     }

  //     fetchISSFlyOverTimes(loc, (error, nextPasses) => {
  //       if (error) {
  //         return callback(error, null);
  //       }

  //       callback(null, nextPasses);
  //     });
  //   });
  // });
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation  };