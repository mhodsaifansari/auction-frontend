function logoutHook(setLogged)
{
    localStorage.removeItem('user');
    setLogged(false);
}

export default logoutHook;