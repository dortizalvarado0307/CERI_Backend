interface JwtPayload {
  userId: number;
  roleId: number;
  permissions: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};