import React, { useEffect, useState } from 'react'
import ProfileHandler from '../Controllers/PublicProfileHandler'
const PublicProfile = ({ match }) => {
    const [profile, setProfile] = useState({
        data: [{}]
    });
    console.log(profile)
    useEffect(() => {
        ProfileHandler.get_user_data(match.params.id, setProfile)
    }, []);

    return (
        <div className="profile-container box-shadow">
            <div className="header">
                <h2>{profile.data[0].account_name}</h2>
            </div>
            <img src={profile.data[0].decoded_image} alt="" />

            <div className="row">
                <div className="leftcolumn">
                    <div className="card">
                        <h2>TITLE HEADING</h2>
                        <h5>Title description, Dec 7, 2017</h5>
                        <div className="fakeimg" style={{ height: "200px" }}>Image</div>
                        <p>Some text..</p>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </div>
                    <div className="card">
                        <h2>TITLE HEADING</h2>
                        <h5>Title description, Sep 2, 2017</h5>
                        <div className="fakeimg" style={{ height: "400px" }}>Image</div>
                        <p>Some text..</p>
                        <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </div>
                </div>
                <div className="rightcolumn">
                    <div className="card">
                        <h2>About Me</h2>
                        <div className="fakeimg" style={{ height: "100px" }}>Image</div>
                        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                    </div>
                    <div className="card">
                        <h3>Popular Post</h3>
                        <div className="fakeimg"><i className="fas fa-birthday-cake"></i>10.10.2020</div>
                        <div className="fakeimg"><i className="fas fa-mail-bulk"></i>Image</div>
                        <div className="fakeimg"><i className="fas fa-genderless"></i>Image</div>
                    </div>
                    <div className="card">
                        <h3>Follow Me</h3>
                        <p>Some text..</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicProfile
