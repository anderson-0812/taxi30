import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOLGE_ID_APP_ANDROID);
// const client = new OAuth2Client( process.env.GOOGLE_SECRET );


export const googleVerify = async (token) => {

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOLGE_ID_APP_ANDROID
    });

    const payload = ticket.getPayload();
    const { name, email, picture, given_name, family_name } = payload;
    return { name, email, picture, given_name, family_name };

  } catch (e) {
    console.log("error al verificar token google ", e);
    return false;
  }
}
