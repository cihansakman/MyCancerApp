// 1. Import dependencies
const express = require("express");
const router = express.Router();
const request = require("request-promise");
const utils = require("../../utils/utils");
const fields = utils.fields;

//2. Setup router
router.post("/score", async (req, res) => {
  //3. Get access token from IBM Watson
  const options = {
    method: "POST",
    url: process.env.AUTH_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      apikey: process.env.WML_API_KEY,
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    },
  };

  let response = "";
  let access_token = "";

  try {
    response = await request(options);
    access_token = JSON.parse(response)["access_token"];
    //res.send(access_token);
  } catch (err) {
    console.log(err);
    res.send(err);
  }

  // 4. Make a scoring request
  const {
    tumor_stage,
    age_at_diagnosis,
    days_to_birth,
    gender,
    disease,
    primary_diagnosis,
    morphology,
    site_of_resection_or_biopsy,
    race,
  } = req.body;
  console.log(
    tumor_stage,
    age_at_diagnosis,
    days_to_birth,
    gender,
    disease,
    primary_diagnosis,
    morphology,
    site_of_resection_or_biopsy,
    race
  );

  //Scoring template. We need to send our request as like that template.
  //We're assigning all the categorical feature values to 0 then below we assign 1 for the corresponding feature.
  //For ex. if the race is american only the race_american feature is going to be 1.
  let template = [
    3.0, //Tumor stage
    20880.0, //age_at_diagnosis
    -20880.0, //days_to_birth
    0.0, // gender
    0.0, // disease(ALWAYS 0 FOR LUAD)
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
  ];

  //Here we assign the values what we're going to post to get a score
  //Populate tumor_stage
  template[fields.findIndex((val) => val === `tumor_stage`)] = tumor_stage;
  //Populate age_at_diagnosis
  template[fields.findIndex((val) => val === `age_at_diagnosis`)] =
    age_at_diagnosis;
  //Populate days_to_birth
  template[fields.findIndex((val) => val === `days_to_birth`)] =
    -age_at_diagnosis;
  //Populate gender
  template[fields.findIndex((val) => val === `gender`)] = gender;
  //Populate primary_diagnosis
  template[
    fields.findIndex((val) => val === `primary_diagnosis_${primary_diagnosis}`)
  ] = 1;
  //Populate morphology
  template[fields.findIndex((val) => val === `morphology_${morphology}`)] = 1;
  //Populate site_of_resection_or_biopsy
  template[
    fields.findIndex(
      (val) =>
        val === `site_of_resection_or_biopsy_${site_of_resection_or_biopsy}`
    )
  ] = 1;
  //Populate race
  template[fields.findIndex((val) => val === `race_${race}`)] = 1;

  //res.send({ fields: fields, template: template });

  //Last but not least SCORE!!
  const scoring_options = {
    method: "POST",
    url: process.env.WML_SCORING_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
      "ML-Instance-ID": process.env.WML_INSTANCE_ID,
    },
    body: JSON.stringify({
      input_data: [{ fields: fields, values: [template, template] }],
    }),
  };

  ('{"input_data": [{"fields": [array_of_input_fields], "values": [array_of_values_to_be_scored, another_array_of_values_to_be_scored]}]}');

  let scoring_response = "";

  try {
    scoring_response = await request(scoring_options);
    res.send(scoring_response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
