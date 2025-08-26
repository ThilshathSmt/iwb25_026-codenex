import ballerina/http;
import ballerina/jwt;
import ballerina/log;

// JWT Validator configuration remains the same
jwt:ListenerJwtAuthProvider jwtValidator = new({
    issuer: "https://api.asgardeo.io/t/safepath/oauth2/token",
    audience: "qqEpnkv051QgwstfZa0SJOJnhMAa",
    signatureConfig: {
        jwksConfig: {
            url: "https://api.asgardeo.io/t/safepath/oauth2/jwks"
        }
    }
});

listener http:Listener securedEP = new(8050);

@http:ServiceConfig {
    cors: {
        // Your CORS configuration remains the same
        allowOrigins: ["http://localhost:5173"], 
        allowCredentials: true,
        allowHeaders: ["Authorization", "Content-Type"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        exposeHeaders: ["Content-Length", "Content-Type"]
    }
}
service /api on securedEP {

    // Helper function to check for a role in the JWT payload
    function hasRole(jwt:Payload jwtPayload, string requiredRole) returns boolean {
        // Roles from Asgardeo are often in the 'groups' claim. This may vary.
        // Inspect your actual token payload to confirm the claim name.
        anydata groupsClaim = jwtPayload.get("groups");
        if groupsClaim is json[] {
            foreach var group in groupsClaim {
                if group.toString() == requiredRole {
                    return true;
                }
            }
        }
        return false;
    }

    // Generic resource to validate any logged-in user
    resource function get user(http:Request req) returns http:Response|error {
        log:printInfo("Received request to /api/user");
        var validationResult = checkAuth(req);
        if validationResult is jwt:Payload {
            return createResponse(200, "Authorized: You are a logged-in user.");
        } else {
            return validationResult;
        }
    }

    // Admin-only resource
    resource function get admin(http:Request req) returns http:Response|error {
        log:printInfo("Received request to /api/admin");
        var validationResult = checkAuth(req);
        if validationResult is jwt:Payload {
            // Check if the user has the 'admin' role
            if self.hasRole(validationResult, "admin") {
                return createResponse(200, "Success: Authorized as Admin.");
            } else {
                return createResponse(403, "Forbidden: Admin role required.");
            }
        } else {
            return validationResult; // Returns 401 Unauthorized or 400 Bad Request
        }
    }

    // Responder-only resource
    resource function get responder(http:Request req) returns http:Response|error {
        log:printInfo("Received request to /api/responder");
        var validationResult = checkAuth(req);
        if validationResult is jwt:Payload {
            // Check if the user has the 'responder' role
            if self.hasRole(validationResult, "responder") {
                return createResponse(200, "Success: Authorized as Responder.");
            } else {
                return createResponse(403, "Forbidden: Responder role required.");
            }
        } else {
            return validationResult;
        }
    }

    // Tourist-only resource
    resource function get tourist(http:Request req) returns http:Response|error {
        log:printInfo("Received request to /api/tourist");
        var validationResult = checkAuth(req);
        if validationResult is jwt:Payload {
             // Check if the user has the 'tourist' role
            if self.hasRole(validationResult, "tourist") {
                return createResponse(200, "Success: Authorized as Tourist.");
            } else {
                return createResponse(403, "Forbidden: Tourist role required.");
            }
        } else {
            return validationResult;
        }
    }
}

// Helper function to handle token extraction and validation
function checkAuth(http:Request req) returns jwt:Payload|http:Response {
    string|error authHeader = req.getHeader("Authorization");
    if authHeader is error {
        return createResponse(400, "Missing Authorization header");
    }

    if !authHeader.startsWith("Bearer ") {
        return createResponse(400, "Invalid Authorization header format");
    }

    string token = authHeader.substring(7);

    // Validate the token
    var validationResult = jwtValidator.authenticate(token);

    if validationResult is jwt:Payload {
        log:printInfo("Token validation successful");
        return validationResult;
    } else {
        log:printError("Token validation failed: " + validationResult.message());
        return createResponse(401, "Unauthorized: Invalid token");
    }
}

// Helper function to create an HTTP Response
function createResponse(int statusCode, string payload) returns http:Response {
    http:Response res = new;
    res.statusCode = statusCode;
    res.setTextPayload(payload);
    return res;
}