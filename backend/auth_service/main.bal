import ballerina/http;
import ballerina/jwt;
import ballerina/log;

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
        allowOrigins: ["http://localhost:5173"], 
        allowCredentials: true,
        allowHeaders: ["Authorization", "Content-Type"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        exposeHeaders: ["Content-Length", "Content-Type"]
    }
}
service /secured on securedEP {

    resource function get admin(http:Request req) returns http:Response|error {
        log:printInfo("Received request to /secured/admin");

        string|error authHeader = req.getHeader("Authorization");
        if authHeader is error {
            return createResponse(400, "Missing Authorization header");
        }

        if !authHeader.startsWith("Bearer ") {
            return createResponse(400, "Invalid Authorization header format");
        }

        string token = authHeader.substring(7);

        var validationResult = jwtValidator.authenticate(token);

        if validationResult is jwt:Payload {
            log:printInfo("Token validation successful");
            return createResponse(200, "Authorized as Admin");
        } else {
            log:printError("Token validation failed: " + validationResult.toString());
            return createResponse(401, "Unauthorized");
        }
    }
}

function createResponse(int statusCode, string payload) returns http:Response {
    http:Response res = new;
    res.statusCode = statusCode;
    res.setTextPayload(payload);
    return res;
}
