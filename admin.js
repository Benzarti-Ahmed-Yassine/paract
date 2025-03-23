// src/Admin.js
import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Admin = () => {
  const [patients, setPatients] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!auth.currentUser) return;

      try {
        // For admin, we fetch all patients (secured by Firestore rules)
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

  // Filter patients by name
  const filteredPatients = patients.filter(patient =>
    patient.nom.toLowerCase().includes(searchName.toLowerCase())
  );

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="admin-container">
      <h1>Interface Admin - Fiches des Patients</h1>
      <div className="search-section">
        <label>Rechercher par nom : </label>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Entrez le nom du patient"
        />
      </div>
      <div className="patients-table">
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Âge</th>
              <th>Glycémie</th>
              <th>TA</th>
              <th>Taille</th>
              <th>Poids</th>
              <th>IMC</th>
              <th>Spécialités</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.prenom}</td>
                  <td>{patient.nom}</td>
                  <td>{patient.age}</td>
                  <td>{patient.glycemie}</td>
                  <td>{patient.ta}</td>
                  <td>{patient.taille}</td>
                  <td>{patient.poids}</td>
                  <td>{patient.imc}</td>
                  <td>
                    {patient.specialites
                      .filter(s => s.checked)
                      .map(s => s.nom)
                      .join(', ')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Aucun patient trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;