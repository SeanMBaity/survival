import { GevChoice, GevSlots } from "@volley/gev";

import { Intent } from "../../src/config/types/Intent.js";
import { Platforms } from "../../src/config/types/Platforms.js";
import { User } from "../../src/config/types/User.js";

export const mockListen = (
  intentSlotsMap: { intent: string; slots: GevSlots }[]
) =>
  jest.fn(async () => {
    const intentSlots = intentSlotsMap.shift();
    if (!intentSlots) throw new Error("No more intents to listen for.");

    const { intent, slots } = intentSlots;
    return Promise.resolve({
      name: intent,
      slots,
      request: undefined as never,
      is(__name: string) {
        return __name === intent;
      },
    } as GevChoice<User, Intent, Platforms>);
  });
