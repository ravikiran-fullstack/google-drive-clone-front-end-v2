import { useState } from 'react';

const useToken = () => {
  const getToken = () => { 
    console.log('Retrieving token');
    const tokenString = localStorage.getItem('token');
    return tokenString ? tokenString: null;
  }

  const saveToken = userToken => {
    console.log('Saving token');
    if (userToken && userToken.username) { 
      localStorage.setItem('token', JSON.stringify(userToken.token));
      localStorage.setItem('username', JSON.stringify(userToken.username));
      setToken(userToken.token);
    }    
  };

  const [token, setToken] = useState(getToken());
  return {
    setToken: saveToken,
    token
  }
}

export default useToken
