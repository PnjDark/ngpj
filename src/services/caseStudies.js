import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../lib/firebase/config";

const CASE_STUDIES_COLLECTION = "case_studies";

export const getCaseStudies = async () => {
  const querySnapshot = await getDocs(collection(db, CASE_STUDIES_COLLECTION));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getCaseStudy = async (id) => {
  const docRef = doc(db, CASE_STUDIES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const getCaseStudyByProject = async (projectId) => {
  const q = query(collection(db, CASE_STUDIES_COLLECTION), where("projectId", "==", projectId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  return null;
};

export const createCaseStudy = async (data) => {
  const docRef = await addDoc(collection(db, CASE_STUDIES_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateCaseStudy = async (id, data) => {
  const docRef = doc(db, CASE_STUDIES_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const deleteCaseStudy = async (id) => {
  const docRef = doc(db, CASE_STUDIES_COLLECTION, id);
  await deleteDoc(docRef);
};
