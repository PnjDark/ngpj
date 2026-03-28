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

const PROJECTS_COLLECTION = "projects";

export const getProjects = async (publishedOnly = true) => {
  const q = publishedOnly
    ? query(collection(db, PROJECTS_COLLECTION), where("status", "==", "Published"))
    : collection(db, PROJECTS_COLLECTION);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProject = async (id) => {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const createProject = async (data) => {
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateProject = async (id, data) => {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const deleteProject = async (id) => {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
};
