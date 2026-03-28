import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../lib/firebase/config";

const SKILLS_COLLECTION = "skills";

export const getSkills = async () => {
  const querySnapshot = await getDocs(collection(db, SKILLS_COLLECTION));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createSkill = async (data) => {
  const docRef = await addDoc(collection(db, SKILLS_COLLECTION), data);
  return docRef.id;
};

export const updateSkill = async (id, data) => {
  const docRef = doc(db, SKILLS_COLLECTION, id);
  await updateDoc(docRef, data);
};

export const deleteSkill = async (id) => {
  const docRef = doc(db, SKILLS_COLLECTION, id);
  await deleteDoc(docRef);
};
