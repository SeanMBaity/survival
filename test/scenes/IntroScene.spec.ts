/* eslint-disable @typescript-eslint/unbound-method */

import IntroScene from "../../src/scenes/IntroScene";
import { mockEngine } from "../mocks/mockEngine";
import { mockIntent } from "../mocks/mockIntent";
import { mockListen } from "../mocks/mockListen";
import { mockSlot } from "../mocks/mockSlot";

/**
 * Sample test cases to demonstrate @volley/gev-testing, a fluent testing
 * framework for GEV (https://github.com/Volley-Inc/gev-testing).
 */
describe("IntroScene", () => {
  it("Will ask name, gives a valid intent and slots", async () => {
    const $ = {
      ...mockEngine(),
      listen: mockListen([
        mockIntent("LaunchRequest"),
        mockIntent("Name", { name: mockSlot("John Doe") }),
      ]),
      myFancyCustomFunction: jest.fn(),
    };

    await IntroScene($);
    expect($.voice.say).toHaveBeenCalledWith("What is your name?");
    expect($.listen).toHaveBeenCalledTimes(2);
    expect($.user.name).toBe("John Doe");
    expect($.voice.say).toHaveBeenCalledWith("Nice to meet you John Doe!");
  });

  it("Will ask name, gives an invalid intent and slots", async () => {
    const $ = {
      ...mockEngine(),
      listen: mockListen([
        mockIntent("LaunchRequest"),
        mockIntent(""),
        mockIntent("Name", { name: mockSlot("John Doe") }),
      ]),
      myFancyCustomFunction: jest.fn(),
    };

    await IntroScene($);
    expect($.voice.say).toHaveBeenCalledWith("What is your name?");
    expect($.listen).toHaveBeenCalledTimes(3);
    expect($.voice.say).toHaveBeenCalledWith("Nice to meet you John Doe!");
    expect($.voice.say).toHaveBeenCalledWith("Sorry, I didn't catch that.");
  });

  it("Remembers the user's name", async () => {
    const $ = {
      ...mockEngine(),
      listen: mockListen([
        mockIntent("LaunchRequest"),
        mockIntent("Name", { name: mockSlot("John Doe") }),
        mockIntent("LaunchRequest"),
      ]),
      myFancyCustomFunction: jest.fn(),
    };

    await IntroScene($);
    await IntroScene($);
    expect($.voice.say).toHaveBeenCalledWith(
      "It's great to see you again John Doe!"
    );
  });
});
