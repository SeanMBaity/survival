import { Engine } from "../../src/config/types/Engine.js";
import { User } from "../../src/config/types/User";
import { mockIntent } from "./mockIntent";
import { mockListen } from "./mockListen";

const mockLayer = () => ({
  say: jest.fn(),
  mark: jest.fn(),
  delay: jest.fn(),
  emotion: jest.fn(),
  play: jest.fn(),
});

export const mockEngine = () => {
  /** We include the mockLayerMap so that if a scene has multiple layers,
   * each one can have it's own mock functions. The mockLayerMap is
   * included in the closure of the mockEngine() so it will persist across
   * multiple calls with the same layer number.
   */
  const mockLayerMap: Record<number, unknown> = {};
  return {
    user: {} as User,
    voice: {
      say: jest.fn(),
    },
    isp: {
      buy: jest.fn(),
    },
    hal: {
      layer: jest.fn((n: number) => {
        mockLayerMap[n] = mockLayerMap[n] ?? mockLayer();
        return mockLayerMap[n];
      }),
    },
    listen: mockListen([mockIntent("LaunchRequest")]),
    routes: {
      register: jest.fn(),
    },
  } as never as Engine;
};
