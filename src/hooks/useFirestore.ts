import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  getDocs, 
  DocumentData, 
  QueryConstraint,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';

interface UseFirestoreResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export const useFirestore = <T = DocumentData>(
  collectionName: string, 
  queryConstraints: QueryConstraint[] = [],
  realtime: boolean = false
): UseFirestoreResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(collection(db, collectionName), ...queryConstraints);
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as unknown as T[];
      
      setData(documents);
      setError(null);
    } catch (err: any) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [collectionName, JSON.stringify(queryConstraints)]);

  useEffect(() => {
    if (realtime) {
      setLoading(true);
      const q = query(collection(db, collectionName), ...queryConstraints);
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as unknown as T[];
          setData(documents);
          setLoading(false);
        },
        (err) => {
          console.error(`Error watching ${collectionName}:`, err);
          setError(err);
          setLoading(false);
        }
      );
      
      return () => unsubscribe();
    } else {
      fetchData();
    }
  }, [fetchData, realtime]);

  return { data, loading, error, refresh: fetchData };
};
