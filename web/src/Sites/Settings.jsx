import React, { useState, useEffect } from 'react';
import SettingsBar from '../Components/SettingsBar';
import axios from 'axios'
import config from '../config'

const Settings = () => {

    const [settings, setSettings] = useState([])
    const user = JSON.parse(sessionStorage.getItem('user'))

    useEffect(() => {
        fetch_settings()
    }, []);

    const fetch_settings = () => {
        axios.post(`${config.restapi}/getsettings`, {
            userId: user.account_id
        })
            .then(response => setSettings(response.data))
    }

    const render_settings = settings.map((sett, i) => (
        <SettingsBar settings={{
            text: sett.meta_header,
            metakey: sett.meta_key,
            checked: sett.meta_value,
            id: sett.meta_id,
            index: i
        }} key={sett.meta_id} />
    ))


    return <div className="home-container">
        <div className="settings-container">
            {render_settings}
        </div>
    </div>
};

export default Settings;
