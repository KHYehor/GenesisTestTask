'use strict';

const https = require('https');
const zlib = require('zlib');
const fetch = require('node-fetch');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : /*process.env.HOST ||*/ '0.0.0.0',
    user : /*process.env.USER ||*/ 'node',
    password : /*process.env.PASSWORD ||*/ 'pass',
    database : /*process.env.DATABASE ||*/ 'Weather'
  }
});

/**
 * CONSTANTS FOR SCRIPT
 */
const URL_CITIES = 'https://www.weatherbit.io/static/exports/cities_all.json.gz';
const URL_HOURLY_REQUEST = 'https://api.weatherbit.io/v2.0/history/hourly?tz=utc&key=531ca5878587446e87b51534ff8bda92&';
const COUNT_OF_LAST_DAYS = 7;
const ONE_DAY = 24*3600*1000;
const CITY_FILTER_COUNTRY = 'US';

/**
 *
 * @param url
 * @returns {Promise<String>}
 */
const getUngzippedData = (url) => {
  return new Promise((resolve, reject) => {
    const buffer = [];
    https.get(url, res => {
      const gunzip = zlib.createGunzip();
      res.pipe(gunzip);
      gunzip
        .on('data', data => buffer.push(data.toString()))
        .on("end", () => resolve(buffer.join('')))
        .on("error", reject)
    })
    .on('error', reject);
  });
};

/**
 *
 * @param date
 * @returns {string}
 */
const formatData = date => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
};

/**
 *
 * @param json
 * @param filterOption
 * @returns {Array<Object>}
 */
const filterCities = (json, filterOption) => {
  return json.reduce((prev, cur) => {
    const { city_name, country_code, city_id } = cur;
    if (country_code === filterOption) {
      prev.push({ name: city_name });
    }
    return prev;
  }, []);
};

/**
 *
 * @param data
 * @returns {Array<Object>}
 */
const randomReduceCities = (data) => {
  const randomReducedData = [];
  data.forEach((city, id) => {
    if (id % 1000 === 0) {
      randomReducedData.push(city);
    }
  });
  return randomReducedData;
};

/**
 *
 * @param cities
 * @returns {Promise<Array<Object>>}
 */
const pullWeatherByCities = async (cities) => {
  const urls = [];
  cities.forEach(({ name }) => {
    let curDate = new Date();
    for (let i = 0; i < COUNT_OF_LAST_DAYS; i++) {
      let prevDate = new Date(curDate - ONE_DAY);
      const previousDate = formatData(prevDate);
      const currentDate = formatData(curDate);
      urls.push(URL_HOURLY_REQUEST + `start_date=${previousDate}&end_date=${currentDate}&city=${encodeURIComponent(name)}`);
      curDate = prevDate;
    }
  });
  return Promise.all(urls.map(url => {
    return new Promise((resolve, reject) => {
      fetch(url).then(res => res.json()).then(resolve).catch(reject);
    });
  }));
};

/**
 *
 * @param receivedWeather
 * @returns {Array<Object>}
 */
const convertDataToDBFormat = (receivedWeather) => {
  const mappedWeather = [];
  const city_ids = [];
  receivedWeather.forEach(el1 => el1.data.forEach(el2 => {
    const {
      rh, wind_spd, timestamp_utc,
      vis, pod, pres, clouds,
      wind_dir, app_temp, temp, slp
    } = el2;
    city_ids.push();
    mappedWeather.push({
      city_name: el1.city_name,
      relative_humidity: rh,
      wind_speed: wind_spd,
      wind_direction: wind_dir,
      timestamp: timestamp_utc.replace('T', ' '),
      visibility: vis,
      sea_level_pressure: slp,
      day_part: pod,
      clouds_persent: clouds,
      temperature: temp,
      temperature_feels: app_temp,
      pressure: pres,
    });
  }));
  return mappedWeather;
};

/**
 *
 * @returns {Promise<void>}
 */
const script = async () => {
  console.time(`Script finished in`);
  // Step 1
  console.log(`Loading Cities From Api...`);
  console.time(`Loaded Cities From Api in`);
  const data = await getUngzippedData(URL_CITIES);
  console.timeEnd('Loaded Cities From Api in');
  // Step 2
  console.log(`Parsing data to json...`);
  console.time(`Parsed data to json in`);
  const json = JSON.parse(data);
  console.timeEnd(`Parsed data to json in`);
  // Step 3
  console.log(`Filtering cities...`);
  console.time(`Filtered cities in`);
  const US_FULL = filterCities(json, CITY_FILTER_COUNTRY);
  console.timeEnd(`Filtered cities in`);
  // Step 4
  console.log(`Random picking cities...`);
  console.time(`Random picked in`);
  const US = randomReduceCities(US_FULL);
  console.timeEnd(`Random picked in`);
  // Step 5
  console.log(`Inserting cities...`);
  console.time(`Inserted cities in`);
  await knex('Cities').insert(US);
  console.timeEnd(`Inserted cities in`);
  // Step 6
  console.log(`Pulling weather for cities...`);
  console.time(`Pulling weather for cities in`);
  const receivedWeather = await pullWeatherByCities(US);
  console.timeEnd(`Pulling weather for cities in`);
  // Step 7
  console.log(`Mapping weather...`);
  console.time(`Mapped weather finished in`);
  const mappedWeather = convertDataToDBFormat(receivedWeather);
  console.timeEnd(`Mapped weather finished in`);
  // Step 8
  console.log(`Inserting weather...`);
  console.time(`Inserted weather in...`);
  await knex('Weather').insert(mappedWeather);
  console.timeEnd(`Inserted weather in...`);
  // Step 9
  console.timeEnd(`Script finished in`);
  process.exit(0);
};

script()
  .then(() => console.log('Finished'))
  .catch(err => {
    console.error(err);
    process.exit(0);
  });
