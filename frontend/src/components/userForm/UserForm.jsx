import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, uploadUser, deleteUser } from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateUser = (event) => {
    const formData = new FormData(event.target);
    dispatch(uploadUser(formData));
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleUpdate = id => {
    navigate(`/update/${id}`)
  }




  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <p>{import.meta.env.VITE_API}</p>
      <h1 className='text-3xl font-bold flex justify-center mb-5'>Users</h1>
      <form onSubmit={handleCreateUser} className="space-y-4 p-4 bg-gray-100 rounded-md shadow-md">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            id="name"
            placeholder="Name"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            id="email"
            placeholder="Email"
            type="email"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="file" className="mb-1 text-sm font-medium text-gray-700">Photo</label>
          <input
            name="file"
            id="file"
            type="file"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create
        </button>
      </form>





      <div className="mt-6">
        {loading && <p className="mt-2 text-center text-blue-600">Loading...</p>}
        {error && <p className="mt-2 text-center text-red-600">Error: {error}</p>}

        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between mt-4">
            <div className='flex'>
              {user.photo && (
                <img
                  src={`http://localhost:3000/api/image/${user.photo._id}`}
                  alt={user.name} width="100"
                  className='h-12 w-12 rounded-full object-cover mr-4'
                />
              )}

              <div>
                <p className="text-sm font-medium text-gray-900"> {user.name}</p>
                <p className="text-sm text-gray-600"> {user.email}</p>
              </div>
            </div>
            <div>

              <button
                onClick={() => handleUpdate(user._id)}
                className="middle none center mr-4 rounded-lg bg-indigo-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;
