import React from 'react';
import Lisiting_group from './Lisiting_group';
function User({username}) {
    console.log(username)
    return (
        <div>
            <Lisiting_group type="User" username={username}></Lisiting_group>
        </div>
    )
}

export default User
