'use strict';

let util = require('util');
let path = require('path');
let fs = require('fs');

let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

const filePath = path.resolve('server/db/countries.json');


/**
 * Reads and returns contents of countries.json.
 * @returns {Promise<Array<Object>>}
 */
async function readCountries() {
  const json = await readFile(filePath);
  return JSON.parse(json);
}


/**
 * Replaces the contents of countries.json.
 * @param {Array<Object>} countries to insert into JSON file
 * @returns {Promise<undefined>}
 */
async function writeCountries(countries) {
  const json = JSON.stringify(countries, null, 2);
  await writeFile(filePath, json);
}


/**
 * Gets a filtered list of countries that meet all search conditions.
 * @param {string} query.name of countries to search as a part of a country name
 * @param {string} query.region of countries to limit search to
 * @param {boolean} query.landlocked to limit search to
 * @returns {Promise<Array<Object>>} Countries matching search results
 */
async function searchCountries(query) {
  let countries = await readCountries();

  if (query.name) {
    const pattern = new RegExp(query.name, 'i');
    countries = countries.filter(country => pattern.test(country.name));
  }

  if (query.region) {
    countries = countries.filter(country => country.region === query.region);
  }

  if (typeof query.landlocked === 'boolean') {
    countries = countries.filter(country => country.landlocked === query.landlocked);
  }

  return countries;
}


/**
 * Returns whether a country exists or not.
 * @param {string} name of country
 * @returns {Promise<boolean>}
 */
async function countryExists(name) {
  const countries = await readCountries();
  return countries.some(country => country.name === name);
}


/**
 * Adds a new country to DB.
 * @param {country} country to create
 * @returns {Promise<undefined>}
 */
async function createCountry(country) {
  const allCountries = await readCountries();
  await writeCountries(allCountries.concat(country));
}


module.exports = {
  searchCountries,
  countryExists,
  createCountry,
  getAllCountries: readCountries,
};
