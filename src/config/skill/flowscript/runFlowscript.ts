import { IS_LOCAL_DEV } from "../../environment/environmentVariables";
import { Engine } from "../../types/Engine";

export function initializeFlowscriptVariableContext($: Engine) {
  return {
    variables: { user: $.user as Record<string, string> },
  };
}

export async function runFlowscript($: Engine) {
  try {
    await $.flowscript.execute($, initializeFlowscriptVariableContext($));
  } catch (error) {
    if (IS_LOCAL_DEV && error instanceof Error) {
      $.voice.say("Error running flowscript.");
      $.voice.say(error.message);
      console.log("#### Flowscript Error#####");
      console.log(error);
    } else {
      throw error;
    }
  }
}
