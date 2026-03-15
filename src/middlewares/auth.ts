import { JwtPayload } from "jsonwebtoken";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { HttpException } from "@/core/exceptions/httpException";
import { httpStatus } from "@/core/constants/httpStatus";
import { errorCodes } from "@/core/constants/errorCodes";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export interface UserPayload extends JwtPayload {
  userId: string;
  role?: string | { id: string; [key: string]: any };
}

export const authenticateToken: RequestHandler = async (req, _res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(
      new HttpException(
        httpStatus.NOT_FOUND,
        "Token not found",
        errorCodes.NOT_FOUND
      )
    );
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = user;
    return next();
  } catch {
    return next(
      new HttpException(
        httpStatus.FORBIDDEN,
        "Unauthorized",
        errorCodes.FORBIDDEN
      )
    );
  }
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
