function logoutHook(setLogged)
{
    localStorage.removeItem('user');
    localStorage.setItem('user',JSON.stringify({loggedin:false}))
    setLogged(false);
}

export default logoutHook;