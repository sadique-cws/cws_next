const AdminDashboardCard = ({ title, value }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    );
  };

  import React from 'react';

  const AdminDashboard = () => {
    return (
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">New Admissions</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2">Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">John Doe</td>
                  </tr>
                  <tr>
                    <td className="py-2">Jane Smith</td>
                  </tr>
                  <tr>
                    <td className="py-2">Alice Johnson</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Due Fees</h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">John Doe</td>
                    <td className="py-2">$100</td>
                  </tr>
                  <tr>
                    <td className="py-2">Jane Smith</td>
                    <td className="py-2">$50</td>
                  </tr>
                  <tr>
                    <td className="py-2">Alice Johnson</td>
                    <td className="py-2">$75</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

const AdminDashboardPage = () => {
  return (
    <div className='flex flex-col flex-1 gap-5'>
    <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <AdminDashboardCard title="Total Students" value="1500" />
      <AdminDashboardCard title="Total Courses" value="30" />
      <AdminDashboardCard title="Total Revenue" value="$50,000" />
      <AdminDashboardCard title="New Enrollments" value="200" />
    </div>
    
    <AdminDashboard/>
    </div>
  );
};

export default AdminDashboardPage;
