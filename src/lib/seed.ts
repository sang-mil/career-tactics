import { db, handleFirestoreError, OperationType } from './firebase';
import { doc, writeBatch } from 'firebase/firestore';
import { Career } from '../types';

export async function seedCareers(careers: Career[]) {
  const batch = writeBatch(db);
  const path = 'careers';
  careers.forEach((career) => {
    const careerRef = doc(db, path, career.code);
    batch.set(careerRef, career);
  });
  
  try {
    await batch.commit();
    console.log('Careers seeded successfully');
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}
