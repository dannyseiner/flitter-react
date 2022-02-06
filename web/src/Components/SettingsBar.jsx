import React, { useState, useEffect } from 'react';
import axios from 'axios'
import config from '../config'

const SettingsBar = ({ settings }) => {

    const [status, setStatus] = useState(settings.checked)
    const user = JSON.parse(sessionStorage.getItem('user'))

    const update_settings = () => {
        axios.post(`${config.restapi}/updatesettings`, {
            id: settings.id,
            userId: user.account_id,
            newValue: status
        })
    }

    useEffect(() => {
        update_settings()
    }, [status]);

    return <div>
        <div className="settings-block">
            <p className="settings-text">{settings.text}</p>
            {settings.description ? <span className="settings-description">{settings.description}</span> : ""}
            <div className="settings-options">

                <label className="switch">
                    <input type="checkbox" name={settings.metakey} defaultChecked={`${settings.checked ? "checked" : ""}`} onClick={e => setStatus(e.target.checked)} />
                    <span className="slider round"></span>
                </label>
            </div>

        </div>
        <hr />
    </div>

};

export default SettingsBar;
