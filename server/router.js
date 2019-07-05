'use strict';

let express = require('express');
let db = require('./db');

let router = express.Router();


// Home page
router.get('/', (req, res) => {
  res.render('home', {
    pageId: 'home',
    title: 'Home',
  });
});


// Search page
router.get('/search', async (req, res, next) => {
  if (req.query.landlocked) req.query.landlocked = req.query.landlocked === 'true';
  try {
    const countries = await db.searchCountries(req.query);
    res.render('search', {
      countries,
      pageId: 'search',
      title: 'Search',
      formValues: req.query,
    });
  } catch (error) {
    next(error);
  }
});


// Initial create page
router.get('/create', (req, res) => {
  res.render('create', {
    pageId: 'create',
    title: 'Create a Country',
    formValues: {},
    formErrors: {},
  });
});


/**
 * Submitted create page
 * 1. Validate request.body and send 400 response if invalid
 * 2. Insert into JSON DB
 * 3. Respond with a 301 redirect to /search?name=request.body.name
 */
router.post('/create', async (req, res, next) => {
  // Validation
  const formErrors = {};
  if (!req.body.name) {
    formErrors.name = 'Required';
  }
  if (!req.body.region) {
    formErrors.region = 'Required';
  }

  // Validate there are no countries with the same name
  if (!formErrors.name) {
    try {
      const exists = await db.countryExists(req.body.name);
      if (exists) formErrors.global = 'Duplicate country found.';
    } catch (error) {
      next(error);
      return; // Ensures rest of function doesn't run
    }
  }

  // If invalid rerender the form with a 400 status code
  if (Object.keys(formErrors).length) {
    res
      .status(400)
      .render('create', {
        pageId: 'create',
        title: 'Create a Country',
        formValues: req.body,
        formErrors,
      });
  } else { // Else create the country and redirect to the search page
    try {
      await db.createCountry({
        ...req.body,
        landlocked: !!req.body.landlocked,
      });
      res.redirect(`/search?name=${req.body.name}`);
    } catch (error) {
      next(error);
    }
  }
});


module.exports = router;
