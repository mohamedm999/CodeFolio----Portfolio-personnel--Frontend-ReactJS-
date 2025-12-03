import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Experience, CreateExperienceInput, UpdateExperienceInput } from '../../types/firebase.types';

const COLLECTION_NAME = 'experiences';

export const getAllExperiences = async (): Promise<Experience[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('startDate', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Experience));
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};

export const getExperienceById = async (id: string): Promise<Experience | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Experience;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching experience ${id}:`, error);
    throw error;
  }
};

export const createExperience = async (data: CreateExperienceInput): Promise<Experience> => {
  try {
    const experienceData = {
      ...data,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), experienceData);
    
    return {
      id: docRef.id,
      ...experienceData,
      createdAt: new Date()
    } as Experience;
  } catch (error) {
    console.error('Error creating experience:', error);
    throw error;
  }
};

export const updateExperience = async (id: string, data: UpdateExperienceInput): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`Error updating experience ${id}:`, error);
    throw error;
  }
};

export const deleteExperience = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting experience ${id}:`, error);
    throw error;
  }
};
