import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, uploadUser, deleteUser } from '../../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.user);
  const [isLogin, token, logout] = useAuth();

  useEffect(() => {
    if (isLogin && token) {
      dispatch(fetchUsers());
    }
  }, [isLogin, token, dispatch]);


  
  const handleCreateUser = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      // Dispatch the uploadUser action and wait for it to complete
      const resultAction = await dispatch(uploadUser(formData)).unwrap();
      // Clear the form after a successful submission
      event.target.reset();
      // Optionally, re-fetch the user list if needed
      dispatch(fetchUsers());
    } catch (error) {
      console.error('Failed to create user: ', error);
    }
  };
  

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to the login page or home page after logging out
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex justify-between items-center mb-5">
        <h1 className='text-3xl font-bold'>Users</h1>
        {isLogin && (
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        )}
      </div>

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

        {users.map((user, index) => {
          // Check if the user object is nested
          const userObj = user.user ? user.user : user;

          // console.log('Rendering user:', userObj);
          return (
            <div key={userObj._id || index} className="flex justify-between mt-4">
              <div className='flex'>
                {userObj.photo && (
                  <img
                    src={`http://localhost:3000/api/image/${userObj.photo._id}`}
                    alt={userObj.name}
                    width="100"
                    className='h-12 w-12 rounded-full object-cover mr-4'
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{userObj.name}</p>
                  <p className="text-sm text-gray-600">{userObj.email}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleUpdate(userObj._id)}
                  className="mr-4 rounded-lg bg-indigo-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(userObj._id)}
                  className="rounded-lg bg-red-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
