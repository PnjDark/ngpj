import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../lib/firebase/config";

const MESSAGES_COLLECTION = "messages";

export const getMessages = async () => {
  const querySnapshot = await getDocs(collection(db, MESSAGES_COLLECTION));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createMessage = async (data) => {
  const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), {
    ...data,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const deleteMessage = async (id) => {
  const docRef = doc(db, MESSAGES_COLLECTION, id);
  await deleteDoc(docRef);
};
