import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import config from "../config"
import axios from "axios"
import { CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

const Calendar = ({ navigation }) => {
    const [currentDate, setCurrentDate] = useState("")
    const [plainEvents, setPlainEvents] = useState([])
    const [markedDays, setMarkedDays] = useState({})
    const [events, setEvents] = useState({})
    const [calendar, setCalendar] = useState(<></>)
    const [getDate, setGetDate] = useState("")
    useEffect(() => {
        loadEventsFromDB()
    }, [])

    const loadEventsFromDB = () => {
        axios.get(`${config.restapi}/events`)
            .then(response => {
                setPlainEvents(response.data)
                getMarkedDays()
                getEventByMarkedDays()
                setTimeout(() => setCalendar(<CalendarList
                    pastScrollRange={0}
                    futureScrollRange={3}
                    markedDates={{ ...markedDays }}
                    scrollEnabled={true}
                    showScrollIndicator={true}
                />), 1000)
            })
    }

    const getMarkedDays = () => {
        let days = {}
        for (let s of plainEvents) {
            if (!days[s.event_date.split("T")[0]]) {
                days[s.event_date.split("T")[0]] = { marked: true }
            }
        }
        setMarkedDays(days)
    }

    const getEventByMarkedDays = () => {
        let days = {}
        for (let s of plainEvents) {
            if (!days[s.event_date.split("T")[0]]) {
                days[s.event_date.split("T")[0]] = []
            }
            days[s.event_date.split("T")[0]].push({
                event_id: s.event_id,
                name: s.event_title,
                data: s,
                username: s.account_name,
                date: s.event_date.split("T")[0]
            })
        }
        setEvents(days)
    }


    return (
        <Agenda
            // The list of items that have to be displayed in agenda. If you want to render item as empty date
            // the value of date key has to be an empty array []. If there exists no value for date key it is
            // considered that the date in question is not yet loaded
            items={events}
            // Callback that gets called when items for a certain month should be loaded (month became visible)
            loadItemsForMonth={month => {
                console.log('trigger items loading');
            }}
            // Callback that fires when the calendar is opened or closed
            onCalendarToggled={calendarOpened => {
                getEventByMarkedDays()
                getMarkedDays()
            }}
            // Callback that gets called on day press
            onDayPress={day => {
                setGetDate(day.dateString);
                console.log(day.dateString);
            }}
            selected={new Date().toISOString().split("T")[0]}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            pastScrollRange={1}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={3}
            // Specify how each item should be rendered in agenda
            renderItem={(item, firstItemInDay) => {
                return <View />
            }}
            // Specify how each date should be rendered. day can be undefined if the item is not first in that day
            renderDay={(day, item) => {
                return <>
                    {getDate === item.date ?
                        <TouchableOpacity onPress={() => navigation.navigate("Event", item)} style={styles.eventContainer}>
                            <Text style={styles.eventTitle}>{item.name}</Text>
                            <Text style={styles.eventAuthor}>{item.username}</Text>
                        </TouchableOpacity> : <></>}
                </>
            }}
            // Specify how empty date content with no items should be rendered
            renderEmptyDate={() => {
                return <View />;
            }}
            // Specify how agenda knob should look like
            renderKnob={() => {
                return <View style={{ width: 20, height: 20, backgroundColor: "#242445", borderRadius: 100 }}></View>
            }}
            // Specify what should be rendered instead of ActivityIndicator
            renderEmptyData={() => {
                return <View style={styles.eventContainer}>
                    <Text style={styles.eventTitle}>No events</Text>
                </View>
            }}
            // Specify your item comparison function for increased performance
            rowHasChanged={(r1, r2) => {
                return r1.text !== r2.text;
            }}
            // Hide knob button. Default = false
            hideKnob={false}
            // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
            showClosingKnob={false}
            // By default, agenda dates are marked if they have at least one item, but you can override this if needed
            markedDates={markedDays}
            // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
            disabledByDefault={false}
            // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
            onRefresh={() => {
                getEventByMarkedDays()
                getMarkedDays()
            }}
            // Set this true while waiting for new data from a refresh
            refreshing={false}
            // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
            refreshControl={null}
            // Agenda theme
            theme={{
                agendaDayTextColor: 'yellow',
                agendaDayNumColor: 'green',
                agendaTodayColor: 'red',
                agendaKnobColor: '#242445'
            }}
            // Agenda container style
            style={{}}
        />
    );
}

const styles = StyleSheet.create({
    eventContainer: {
        width: "100%",
        padding: 12,
        backgroundColor: "white",
        marginBottom: 1,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: "500"
    },
    eventAuthor: {
        textAlign: "right",
        fontSize: 18,
        color: "lightgrey"
    }
})

export default Calendar;
