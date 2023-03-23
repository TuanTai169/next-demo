import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!!response && !!response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log('error', error);
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/user/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!!response && !!response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/auth/profile`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!!response && !!response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (data: any) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/user/update/${data.id}`, data, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!!response && !!response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/user/delete/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (!!response) {
      return response;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
