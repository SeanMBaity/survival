"use strict";

const fs = require("fs");

const mainModelData = fs.readFileSync("models/en.json", "utf-8");
const mainModel = JSON.parse(mainModelData);
const { _nameFreeInteraction } = mainModel.alexa.interactionModel.languageModel;

const alexaModelData = fs.readFileSync(
  "platforms/alexaSkill/skill-package/interactionModels/custom/en-US.json",
  "utf-8"
);
const alexaModel = JSON.parse(alexaModelData);
alexaModel.interactionModel = {
  ...alexaModel.interactionModel,
  _nameFreeInteraction,
};

fs.writeFileSync(
  "platforms/alexaSkill/skill-package/interactionModels/custom/en-US.json",
  JSON.stringify(alexaModel, null, 2)
);
