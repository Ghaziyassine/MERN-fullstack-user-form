// src/components/UpdateUserForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../../features/users/usersSlice';

const UpdateUserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);
    const BackMessage = "<- Back"
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({ id, name, email, file }));
    };

    const backToHome = () => {
        navigate("/")
    }
    return (
        <>
            <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">

                <h1 className="text-3xl font-bold flex justify-center mb-5">Upadte User</h1>

                <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-md shadow-md">
                    <div className='flex flex-col'>
                        <div>
                            <label className="mb-1 text-sm font-medium text-gray-700">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label>File:</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className=" w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="  w-full mt-8 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >Update User</button>
                        {status === 'loading' && <p>Loading...</p>}
                        {status === 'succeeded' && <p>User updated successfully!</p>}
                        {status === 'failed' && <p>Error: {error}</p>}
                    </div>
                </form>
                <div className="mt-6">
                    <button
                        onClick={() => backToHome()}
                    >{BackMessage}</button>
                </div>
            </div>
        </>
    );
};

export default UpdateUserForm;
