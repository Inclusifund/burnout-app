import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { collection, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

// Generic hook to fetch data from a Firestore collection
export function useFirestore<T = DocumentData>(
    collectionName: string,
    options?: Omit<UseQueryOptions<T[], Error>, 'queryKey' | 'queryFn'>
) {
    return useQuery<T[], Error>({
        queryKey: [collectionName],
        queryFn: async () => {
            const colRef = collection(db, collectionName);
            const snapshot = await getDocs(colRef);
            return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
                id: doc.id,
                ...doc.data(),
            })) as T[];
        },
        staleTime: 5 * 60 * 1000, // Default 5 minutes
        ...options,
    });
}
