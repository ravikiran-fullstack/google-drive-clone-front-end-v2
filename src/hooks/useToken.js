import { useState } from 'react';

const useToken = () => {
  const getToken = () => { 
    const tokenString = localStorage.getItem('token');
    
    console.log(tokenString);
    return tokenString ? tokenString: null;
  }

  const saveToken = userToken => {
    // console.log('userToken ------------', userToken);
    if (userToken && userToken.username) { 
      localStorage.setItem('token', JSON.stringify(userToken.token));
      setToken(userToken.token);
    }
    
    //console.log(userToken);
    //window.location.assign('/');
    
  };

  const [token, setToken] = useState(getToken());
  return {
    setToken: saveToken,
    token
  }
}

export default useToken
