# JS-GetNet

## Description
A JavaScript function to get client network information such as ASN, ISP, city, region, country, IP address, and user agent using the ip-api.com API.

## Installation
1. Copy `js-getnet.js` to your PHP project directory.
2. Including the js file to ur project

## Usage
Call the `getClientNetInfo(datarequest)` function to get the client network information:
Example in datarequest
```
const req = {
  connection: {
    remoteAddress: 'client ip address'
  },
  headers: {
    'user-agent': 'client useragent'
  }
};
```

```
getClientNetInfo(req)
 .then(netInfo => {
    console.log(netInfo);
 })
 .catch(error => {
    console.log(error);
});
```

The function will return an array with the following keys:
* `asn` - the client's ASN
* `isp` - the client's ISP
* `city` - the client's city
* `region` - the client's region
* `country` - the client's country
* `ip` - the client's IP address
* `user_agent` - the client's user agent
