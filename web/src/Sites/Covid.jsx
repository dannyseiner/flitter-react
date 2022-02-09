import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Covid = () => {

    const CovidBlock = ({ data }) => {
        const render_int = () => {
            if (data.type === "int") {
                return covidInfo[`${data.index}`].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            } else if (data.type === "date") {
                return "10/3/2022"
            } else {
                return ""
            }
        }
        return <div className="covid-block">
            <p className="covid-header">
                <i className={`${data.icon} covid-icon`}></i>
                {data.header}
            </p>
            <p className="covid-detail">{render_int()}</p>
        </div>
    }

    const [covidInfo, setCovidInfo] = useState({
        date: "",
        dateChecked: "",
        death: "",
        deathIncrease: "",
        hash: "",
        hospitalized: "",
        hospitalizedCumulative: "",
        hospitalizedCurrently: "",
        hospitalizedIncrease: "",
        inIcuCumulative: "",
        inIcuCurrently: "",
        lastModified: "",
        negative: "",
        negativeIncrease: "",
        onVentilatorCumulative: "",
        onVentilatorCurrently: "",
        pending: "",
        posNeg: "",
        positive: "",
        positiveIncrease: "",
        recovered: "",
        states: "",
        total: "",
        totalTestResults: "",
        totalTestResultsIncrease: "",
    }
    )

    useEffect(() => {
        get_covid_data()
    }, []);

    const get_covid_data = () => {
        axios.get('https://api.covidtracking.com/v1/us/current.json')
            .then(response => { setCovidInfo(response.data[0]) })
    }
    return <div className="home-container covid-container">
        <div className="covid-block">
            <p className="covid-header-link">
                For more or specific informations you can use trusted source as <Link to='/googleredirect' target="_blank">Google</Link>
            </p>
        </div>
        <CovidBlock data={{
            header: "Last update",
            index: "dateChecked",
            type: "date",
            icon: "fas fa-virus",
        }} />

        <CovidBlock data={{
            header: "Overall tests",
            index: "totalTestResults",
            type: "int",
            icon: "fas fa-virus",
        }} />
        <CovidBlock data={{
            header: "Positive",
            index: "positive",
            type: "int",
            icon: "fas fa-plus",
        }} />
        <CovidBlock data={{
            header: "Positive increased",
            index: "positiveIncrease",
            type: "int",
            icon: "fas fa-chart-line",
        }} />
        <CovidBlock data={{
            header: "Negative",
            index: "negative",
            type: "int",
            icon: "fas fa-minus",
        }} />
        <CovidBlock data={{
            header: "Death",
            index: "death",
            type: "int",
            icon: "fas fa-skull",
        }} />
        <CovidBlock data={{
            header: "Hospitalized",
            index: "hospitalized",
            type: "int",
            icon: "fas fa-ambulance",
        }} />
    </div>
};

export default Covid





