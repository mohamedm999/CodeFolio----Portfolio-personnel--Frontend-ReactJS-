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
import { Project, CreateProjectInput, UpdateProjectInput } from '../../types/firebase.types';
import { uploadImage, deleteImage } from './storage.service';

const COLLECTION_NAME = 'projects';

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Project));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error);
    throw error;
  }
};

export const createProject = async (data: CreateProjectInput, imageFile?: File): Promise<Project> => {
  try {
    let imageUrl = data.imageUrl;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile, 'projects');
    }

    const projectData = {
      ...data,
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), projectData);
    
    return {
      id: docRef.id,
      ...projectData,
      // Temporary timestamp for immediate UI update before server response
      createdAt: new Date(),
      updatedAt: new Date()
    } as Project;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id: string, data: UpdateProjectInput, imageFile?: File): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    let updateData = { ...data, updatedAt: serverTimestamp() };

    if (imageFile) {
      // If there was an old image, we might want to delete it, but for safety we'll just upload the new one
      // Ideally, we check the old document to get the old image URL and delete it
      const oldDoc = await getDoc(docRef);
      if (oldDoc.exists()) {
        const oldData = oldDoc.data() as Project;
        if (oldData.imageUrl) {
          // Optional: delete old image
          // await deleteImage(oldData.imageUrl);
        }
      }
      
      const imageUrl = await uploadImage(imageFile, 'projects');
      updateData.imageUrl = imageUrl;
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    
    // Get document to delete image if exists
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Project;
      if (data.imageUrl) {
        await deleteImage(data.imageUrl);
      }
    }

    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting project ${id}:`, error);
    throw error;
  }
};
