import { vi } from "vitest"

vi.mock("bcryptjs", async () => {
  return {
    default: {
      hash: vi.fn(),
      compare: vi.fn(),
    },
    hash: vi.fn(),
    compare: vi.fn(),
  }
})
