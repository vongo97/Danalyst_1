import { POST } from "@/app/api/auth/reset-password/route";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

jest.mock("@/lib/prisma", () => ({
  passwordReset: {
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
  user: {
    update: jest.fn(),
  },
}));

jest.mock("bcryptjs");

jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: any, init: any) => {
      return {
        status: init.status,
        json: async () => body,
      };
    },
  },
}));

describe("POST /api/auth/reset-password", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if token or password is missing", async () => {
    const req = {
      json: async () => ({ token: "", password: "" }),
    } as Request;

    const response = await POST(req);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe("Faltan datos requeridos");
  });

  it("should return 400 if token is invalid or expired", async () => {
    (prisma.passwordReset.findUnique as jest.Mock).mockResolvedValue(null);

    const req = {
      json: async () => ({ token: "invalidtoken", password: "newpassword123" }),
    } as Request;

    const response = await POST(req);
    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.error).toBe("Token inválido o expirado");
  });

  it("should update password and delete token on valid request", async () => {
    const fakeResetRecord = {
      id: 1,
      email: "user@example.com",
      expires: new Date(Date.now() + 10000),
    };
    (prisma.passwordReset.findUnique as jest.Mock).mockResolvedValue(
      fakeResetRecord
    );
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedpassword");
    (prisma.user.update as jest.Mock).mockResolvedValue({});
    (prisma.passwordReset.delete as jest.Mock).mockResolvedValue({});

    const req = {
      json: async () => ({ token: "validtoken", password: "newpassword123" }),
    } as Request;

    const response = await POST(req);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { email: fakeResetRecord.email },
      data: { passwordHash: "hashedpassword" },
    });
    expect(prisma.passwordReset.delete).toHaveBeenCalledWith({
      where: { id: fakeResetRecord.id },
    });
  });
});
