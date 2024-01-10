import { GevSlots } from "@volley/gev";

export const mockIntent = (intent: string, slots?: GevSlots) => ({
  intent,
  slots: slots ?? {},
});
