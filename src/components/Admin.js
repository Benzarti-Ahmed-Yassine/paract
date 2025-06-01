import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Admin = () => {
  const [patients, setPatients] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!auth.currentUser) return;

      try {
        const querySnapshot = await getDocs(collection(db, 'patients'));
        const patientList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientList);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des patients : ', error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.nom.toLowerCase().includes(searchName.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Interface Admin - Fiches des Patients
      </h1>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rechercher par nom :
        </label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Entrez le nom du patient"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Âge</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Glycémie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taille</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poids</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IMC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialités</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{patient.prenom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.glycemie}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.ta}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.taille}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.poids}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.imc}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.specialites
                      .filter(s => s.checked)
                      .map(s => s.nom)
                      .join(', ')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                  Aucun patient trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;