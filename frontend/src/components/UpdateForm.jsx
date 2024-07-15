import { Link, useParams } from "react-router-dom";
import { updateUser } from "../features/users/usersSlice";
import { useDispatch } from "react-redux";

const UpdateForm = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const handleUpdate = (event) => {
        const formData = new FormData(event.target);
        dispatch(updateUser({ userId, formData }));
    };

    return (
        <>
            <h1 className='text-3xl font-bold flex justify-center mb-5'>Users</h1>
            <form onSubmit={handleUpdate} className="space-y-4 p-4 bg-gray-100 rounded-md shadow-md">
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
                <Link to='/'>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Update
                    </button>

                </Link>

            </form>
        </>
    )
}

export default UpdateForm