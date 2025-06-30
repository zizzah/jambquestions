// __tests__/forgot-password.test.ts
import { POST } from "../app/api/auth/forgot-password/route";
import { NextRequest } from "next/server";

// Mock dependencies
jest.mock("postgres", () => {
  const mockSql = jest.fn();
  mockSql.mockImplementation(() => {
    return Promise.resolve([]);
  });
  return jest.fn(() => mockSql);
});

jest.mock("../app/lid/action/email", () => ({
  sendPasswordResetEmail: jest.fn().mockResolvedValue({ success: true }),
}));

jest.mock("crypto", () => ({
  randomBytes: jest.fn(() => ({
    toString: jest.fn(() => "mock-token-123"),
  })),
}));

describe("Forgot Password API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error when email is missing", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/auth/forgot-password",
      {
        method: "POST",
        body: JSON.stringify({}),
      }
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Email is required");
  });

  it("should return success message for valid email format", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/auth/forgot-password",
      {
        method: "POST",
        body: JSON.stringify({ email: "test@example.com" }),
      }
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.message).toBe(
      "If an account with that email exists, we have sent a password reset link."
    );
  });
});
