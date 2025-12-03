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
import { Skill, CreateSkillInput, UpdateSkillInput } from '../../types/firebase.types';

const COLLECTION_NAME = 'skills';

export const getAllSkills = async (): Promise<Skill[]> => {
  try {
    // Order by level desc or name? Let's do level for now, or maybe category
    const q = query(collection(db, COLLECTION_NAME), orderBy('level', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Skill));
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};

export const getSkillById = async (id: string): Promise<Skill | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Skill;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching skill ${id}:`, error);
    throw error;
  }
};

export const createSkill = async (data: CreateSkillInput): Promise<Skill> => {
  try {
    const skillData = {
      ...data,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), skillData);
    
    return {
      id: docRef.id,
      ...skillData,
      createdAt: new Date()
    } as Skill;
  } catch (error) {
    console.error('Error creating skill:', error);
    throw error;
  }
};

export const updateSkill = async (id: string, data: UpdateSkillInput): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`Error updating skill ${id}:`, error);
    throw error;
  }
};

export const deleteSkill = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting skill ${id}:`, error);
    throw error;
  }
};
