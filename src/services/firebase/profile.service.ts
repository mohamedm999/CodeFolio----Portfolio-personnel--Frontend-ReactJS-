import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Profile, UpdateProfileInput } from '../../types/firebase.types';
import { uploadImage } from './storage.service';

const COLLECTION_NAME = 'profile';
// We'll assume a single profile document for the portfolio owner
// We can use a fixed ID or just fetch the first one
const PROFILE_DOC_ID = 'main_profile'; 

export const getProfile = async (): Promise<Profile | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, PROFILE_DOC_ID);
    // Try to get specific doc first
    // If not found, try to find any doc (migration fallback)
    
    // For now, let's stick to a fixed ID strategy for simplicity
    // If you want to support multiple users later, this would change
    
    // Check if the main profile exists
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   return { id: docSnap.id, ...docSnap.data() } as Profile;
    // }

    // Fallback: get the first document in the collection
    const q = query(collection(db, COLLECTION_NAME), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Profile;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

export const updateProfile = async (data: UpdateProfileInput, avatarFile?: File): Promise<void> => {
  try {
    // First, ensure we know which document to update
    let docId = PROFILE_DOC_ID;
    
    // Check if we already have a profile to get its ID
    const currentProfile = await getProfile();
    if (currentProfile) {
      docId = currentProfile.id;
    }

    const docRef = doc(db, COLLECTION_NAME, docId);
    let updateData = { ...data, updatedAt: serverTimestamp() };

    if (avatarFile) {
      const avatarUrl = await uploadImage(avatarFile, 'profile');
      updateData.avatar = avatarUrl;
    }

    // setDoc with merge: true creates the document if it doesn't exist
    await setDoc(docRef, updateData, { merge: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const createProfile = async (data: Profile): Promise<void> => {
    // This is essentially the same as update in our single-doc model
    // but we can expose it for clarity
    const { id, ...rest } = data;
    await updateProfile(rest as UpdateProfileInput);
};
