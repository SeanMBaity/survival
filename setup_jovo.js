#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const child = require("child_process");
const prompts = require("prompts");

const ASK_STATES_PATH = "platforms/alexaSkill/.ask/ask-states.json";

async function main() {
  console.log(
    `Setting up your skill on each platform! This may take a few moments.`
  );

  console.log(`Creating new skill via Jovo...`);
  child.execSync("jovo3 build --stage staging", {
    stdio: "inherit",
  });

  await setupExistingAlexaSkill();

  child.execSync("jovo3 deploy --stage staging", {
    stdio: "inherit",
  });

  const skillId = getSkillId();

  replace(
    "src/config/environment/environmentVariables.ts",
    /{{skillId}}/g,
    skillId
  );

  console.log(`Your skill ID is "${skillId}"!`);
}

function getSkillId() {
  if (fs.existsSync(ASK_STATES_PATH)) {
    const file = fs.readFileSync(ASK_STATES_PATH, "utf-8");
    const json = JSON.parse(file);
    return json["profiles"]["default"]["skillId"];
  } else {
    let path = "platforms/googleAction/settings/settings.yaml";
    if (fs.existsSync(path)) {
      const file = fs.readFileSync(path, "utf-8");
      return file.match(/"projectId": "(.+)"/)[1];
    } else {
      throw new Error(
        "Can't find Alexa skill id or Google Actions project id."
      );
    }
  }
}

function replace(file, pattern, replace) {
  const txt = fs.readFileSync(file, "utf-8").replace(pattern, replace);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(file, txt);
}

async function setupExistingAlexaSkill() {
  if (fs.existsSync(ASK_STATES_PATH)) {
    const { alexaSkillId } = await prompts({
      type: "text",
      name: "alexaSkillId",
      message:
        "Enter existing Alexa skill ID. (or press enter to create a new skill ID)",
      initial: null,
    });
    if (!alexaSkillId.length) return;
    if (
      !alexaSkillId.match(/amzn1\.ask\.skill\.\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)
    ) {
      console.error(
        "Invalid skill id. Ask CLI skill IDs should be formatted 'amzn1.ask.skill.12345678-1234-1234-123456789123'. Re-run 'setup_jovo.js' again with a valid skill ID or omit to create a new skill ID."
      );
      process.exit(1);
    }
    setAlexaSkillId(alexaSkillId);
  }
}

function setAlexaSkillId(skillId) {
  const file = fs.readFileSync(ASK_STATES_PATH, "utf-8");
  const json = JSON.parse(file);
  json["profiles"]["default"]["skillId"] = skillId;
  fs.writeFileSync(ASK_STATES_PATH, JSON.stringify(json, null, 2));
}

main()
  .then(() => {
    console.log("Finished! ", "\n");
  })
  .catch((error) => console.error(error));
