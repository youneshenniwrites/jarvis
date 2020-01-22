import { FirebaseAuth } from './api';

const registerEmailAndPassword = async (email, password) => {
  try {
    await FirebaseAuth.createUserWithEmailAndPassword(email, password);
  } catch (e) {
    console.error(e.message);
  }
};

export default registerEmailAndPassword;
