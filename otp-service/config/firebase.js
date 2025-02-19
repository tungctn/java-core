import admin from "firebase-admin";
import { firebaseConfig } from "./constants";

const initializeFirebaseAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: firebaseConfig.project_id,
        clientEmail: firebaseConfig.client_email,
        privateKey: firebaseConfig.private_key.replace(/\\n/g, "\n"),
      }),
    });
  }
  return admin;
};

export { initializeFirebaseAdmin };
