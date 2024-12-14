import React from 'react';
import { getAuth } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon

export function UserIcon() {
    const auth = getAuth();
    const user = auth.currentUser;

    // Navigate to the dashboard
    function handleClick() {
        window.location.hash = "#/dashboard";
    }

    return (
        <div className="user-icon" onClick={handleClick}>
            <FontAwesomeIcon 
                icon={faUser}  // Displays user icon
                className="user-avatar"
            />
        </div>
    );
}
