import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Tableau de bord
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">
            Patients actifs
          </h2>
          <p className="text-3xl font-bold text-blue-600">24</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            Consultations aujourd'hui
          </h2>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-800 mb-2">
            Nouveaux patients
          </h2>
          <p className="text-3xl font-bold text-purple-600">3</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;