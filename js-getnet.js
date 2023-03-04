const http = require('http');
const net = require('net');

function getClientNetInfo(req) {
  // Get Client IP
  const _CLIENT_IP = req.connection.remoteAddress;

  // Filter IPv6
  if (!net.isIPv4(_CLIENT_IP)) {
    return { error: "IPv6 not supported" };
  }

  // Sending request to ip-api.com
  const url = `http://ip-api.com/json/${_CLIENT_IP}`;
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(data);
        // Check for error
        if (response.status === 'fail') {
          reject("Failed to retrieve client network information");
        }
        const ASN_RSL = response.as;
        const ISP_RSL = response.isp;
        const CITY_RSL = response.city;
        const REGION_RSL = response.regionName;
        const COUNTRY_RSL = response.country;

        // Return network information
        const netInfo = {
          asn: ASN_RSL,
          isp: ISP_RSL,
          city: CITY_RSL,
          region: REGION_RSL,
          country: COUNTRY_RSL,
          ip: _CLIENT_IP,
          user_agent: req.headers['user-agent']
        };
        resolve(netInfo);
      });
    }).on('error', (err) => {
      reject(err.message);
    });
  });
}
