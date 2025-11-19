import React, { useState, useEffect } from "react";

// Define TypeScript interfaces for user data
interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

// UserList Component
interface UserListProps {
  users: User[];
  onUserClick: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onUserClick,
  onDeleteUser,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
              Name / Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Website
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              <td
                className="px-6 py-4 whitespace-nowrap"
                onClick={() => onUserClick(user)}
              >
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                onClick={() => onUserClick(user)}
              >
                {user.address.street}, {user.address.suite}, {user.address.city}
                , {user.address.zipcode}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                onClick={() => onUserClick(user)}
              >
                {user.phone}
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline"
                onClick={() => onUserClick(user)}
              >
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {user.website}
                </a>
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                onClick={() => onUserClick(user)}
              >
                {user.company.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening modal when clicking delete
                    onDeleteUser(user.id);
                  }}
                  className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                  aria-label={`Delete ${user.name}`}
                >
                  {/* Simple X icon using SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// UserDetailModal Component
interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}`;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform animate-slide-up relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 rounded-full p-1"
          aria-label="Close modal"
        >
          {/* Close icon (X) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
        <p className="text-blue-600 text-sm mb-4">{user.email}</p>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Address</h3>
          <p className="text-gray-700">
            {user.address.street}, {user.address.suite}
          </p>
          <p className="text-gray-700">
            {user.address.city}, {user.address.zipcode}
          </p>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center mt-2"
          >
            {/* Map pin icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            View on map
          </a>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Contact</h3>
          <p className="text-gray-700">Phone: {user.phone}</p>
          <p className="text-gray-700">
            Website:{" "}
            <a
              href={`http://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user.website}
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Company</h3>
          <p className="text-gray-700">Name: {user.company.name}</p>
          <p className="text-gray-700">
            Catchphrase: {user.company.catchPhrase}
          </p>
          <p className="text-gray-700">Business: {user.company.bs}</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Custom styles for animations */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .font-inter {
            font-family: 'Inter', sans-serif;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        `}
      </style>
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Users</h1>
      </header>

      <main className="max-w-6xl mx-auto">
        <UserList
          users={users}
          onUserClick={handleUserClick}
          onDeleteUser={handleDeleteUser}
        />
      </main>

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
