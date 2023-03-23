import React, { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import Layout from '@/components/layout';
import { User } from '@/types/user';
import { deleteUser, getUsers, update } from '@/api-services/user.service';

import { useForm, SubmitHandler } from 'react-hook-form';

const UserPage: NextPageWithLayout = (userRole) => {
  const isAdmin = Object.values(userRole)[0] === 'admin';
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<User>();

  useEffect(() => {
    setLoading(true);
    fetchUsers();
    setLoading(false);
  }, []);

  const fetchUsers = async (): Promise<void> => {
    const users = await getUsers();
    setData(users);
  };
  const onSetEditUser = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: User) => {
    event.preventDefault();
    setValue('id', user.id);
    setValue('fullName', user.fullName);
    setValue('email', user.email);
    setValue('role', user.role);
  };

  const onEditUser: SubmitHandler<User> = async (data) => {
    setLoading(true);
    const responseData = await update(data);
    if (responseData) {
      alert('Update user successfully');
      await fetchUsers();
    }
    setLoading(false);
  };

  const onDeleteUser = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => {
    event.preventDefault();
    setLoading(true);
    const responseData = await deleteUser(id);
    if (responseData) {
      alert('Delete user successfully');
      await fetchUsers();
    }
    setLoading(false);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!data && <p>No data</p>}

      {data && (
        <div className="flex justify-center items-center flex-col mt-10">
          {isAdmin && (
            <form
              onSubmit={handleSubmit(onEditUser)}
              className=" flex border border-gray-300 p-4 mb-4"
              action=""
              method="post"
            >
              <div className="">
                <label htmlFor="fullName">Full Name</label>
                <input
                  className="border mx-3 p-2"
                  type="text"
                  id="fullName"
                  {...register('fullName')}
                />
              </div>
              <div className="">
                <label htmlFor="email">Email</label>
                <input
                  disabled={!isAdmin}
                  className="border mx-3 p-2"
                  type="email"
                  id="email"
                  {...register('email', {
                    required: true,
                    pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                  })}
                />
              </div>
              <div className="">
                <label htmlFor="role">Role</label>
                <select
                  className="border mx-3 p-2"
                  id="role"
                  {...register('role', { required: true })}
                >
                  <option value="" disabled>
                    Select Option
                  </option>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>

              <button className="bg-violet-500 text-sm p-2 rounded-md text-white" type="submit">
                Update
              </button>
            </form>
          )}
          <table className="table-auto">
            <thead>
              <tr>
                <th className="p-4 bg-red-200">No.</th>
                <th className="p-4 bg-red-200">Full Name</th>
                <th className="p-4 bg-red-200">Email</th>
                <th className="p-4 bg-red-200">Role</th>
                <th className="p-4 bg-red-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user: User, index) => (
                <tr key={user.id}>
                  <td className="p-4 border">{index + 1}</td>
                  <td className="p-4 border">{user.fullName}</td>
                  <td className="p-4 border">{user.email}</td>
                  <td className="p-4 border">{user.role}</td>
                  <td className="p-4 border">
                    <button
                      className="p-2 text-sm  bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed rounded  text-white mr-2"
                      onClick={(event) => onSetEditUser(event, user)}
                      disabled={!isAdmin}
                    >
                      Edit
                    </button>
                    <button
                      className="p-2 text-sm bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed rounded  text-white"
                      onClick={(event) => onDeleteUser(event, user.id)}
                      disabled={!isAdmin}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default UserPage;
