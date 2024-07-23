import jwtmod from "jsonwebtoken";

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0HYCXWdMlq5gTfPdA6JCU8m3tX84lY6wSA2u3gzBGiBJS2j0vhwXnuZ1ddCJEgFmgCv6rjXqN+/+F8bFN1Kva/+Fguy6cRkXbxGS6BKzZlpCCKaQlAl6mxtPuRAT+LfInQFHkvOMdaunHxFHDGNwiqU8LybXcXinWXj/PH3bcbrPE6Hp+w2GudYD9santFw545bTbfcDCuce6bMDxUCSwjlqUc8bk9pXvGrKhPLYWZNKWUcm74/o0tclMuuWr2WKTFtWILEB3ui/pKfMJKh7TrQNXUBnb32DPa9kSLDd2iRwSfQ6om/JWzizyRwJgYWnD2ug5JATVoYUYi34byjmQwIDAQAB
-----END PUBLIC KEY-----
`;

export default async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  try {
    const decodedToken = jwtmod.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    console.log(decodedToken);

    // // Extract email from the decoded token
    // const { email } = decodedToken;

    // // Attach the email to the request object
    // req.user = email;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.sendStatus(403);
  }
};