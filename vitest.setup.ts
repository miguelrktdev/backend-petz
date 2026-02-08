vi.mock("bcryptjs", () => ({
	default: {
		hash: vi.fn(),
		compare: vi.fn(),
	},
}))
