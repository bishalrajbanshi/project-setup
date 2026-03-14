import { JwtPayload } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "core/config/error.handler.config";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export interface UserPayload extends JwtPayload {
  role: string | { id: string; [key: string]: any };
}
declare module "express" {
  interface Request {
    user?: UserPayload;
  }
}
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json(HttpError("Unauthorized", 401));
    return;
  }

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      res.status(403).json(HttpError("Unauthorized", 403));
      return;
    }
    req.user = user as UserPayload;
    next();
  });
};

// export const permissionScopeCheck = (requiredScopes: string[]) => {
//   return async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       const { user } = req;
//       if (!user) {
//         res
//           .status(401)
//           .json(apiError(PLAIN_RESPONSE_MSG.unAuthenticated, 401, {}));
//         return;
//       }
//       const roleId =
//         typeof user.role === "object" && user.role.id
//           ? user.role.id
//           : user.role;

//       const roleDoc = await RoleModel.findById(roleId);
//       if (!roleDoc) {
//         res
//           .status(403)
//           .json(apiError(PLAIN_RESPONSE_MSG.accessDenied, 403, {}));
//         return;
//       }
//       const permissionDoc = await PermissionModel.findOne({ role: roleId });
//       if (!permissionDoc) {
//         res
//           .status(403)
//           .json(apiError(PLAIN_RESPONSE_MSG.accessDenied, 403, {}));
//         return;
//       }

//       if (permissionDoc.adminAccess) {
//         return next();
//       }
//       const roleScopes: string[] = permissionDoc.permissionScopes || [];
//       const hasPermission = requiredScopes.some((scope) =>
//         roleScopes.includes(scope)
//       );

//       if (!hasPermission) {
//         res
//           .status(403)
//           .json(apiError(PLAIN_RESPONSE_MSG.permissionDenied, 403, {}));
//         return;
//       }
//       next();
//     } catch (err: any) {
//       res.status(500).json(apiError(PLAIN_RESPONSE_MSG.serverError, 500, {}));
//     }
//   };
// };
