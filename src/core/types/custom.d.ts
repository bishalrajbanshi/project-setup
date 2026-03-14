import { INavBarDocument } from '@modules/rbac/roleNavbarItems/model/navbar.model';
import { Connection } from 'mongoose';


declare global {
  namespace Express {
    interface Request {
      dbConn?: Connection;
      tenantId?: string;
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}


declare global {
  namespace Express {
    interface Request {
      navbar?: INavBarDocument;
    }
  }
}


export {};
