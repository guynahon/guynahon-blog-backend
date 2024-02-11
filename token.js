const jwt = require('jsonwebtoken');

const payload = {
    id: "109932373019997923401",
    firstName: "Guy",
    lastName: "Nahon",
    picture: "https://lh3.googleusercontent.com/a/ACg8ocKx4wSfrlxxmUsDrURywc2y8nvdoqqVd2T-2WSVoX_I=s96-c",
    email: "guy.nahon@grunitech.com"
}

const token = jwt.sign(payload, "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", {
    expiresIn: "1y"
});

console.log(token);