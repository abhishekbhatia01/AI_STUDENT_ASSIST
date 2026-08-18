import jwt from "jsonwebtoken";
import AppErrors from "../utils/AppErrors.utils.js";

const authorizedRole = (...requiredRole) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if(!requiredRole.includes(userRole)) {
            throw new AppErrors("You do not have permission to access this resource", 403);
        }
        next();
    }
}


export default authorizedRole;