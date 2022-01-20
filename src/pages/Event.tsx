import React, {FC, useEffect} from 'react'
import EventCalendar from "../components/EventCalendar";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Event:FC = () => {
    const {fetchGuests, fetchEvent} = useActions()
    const user = useTypedSelector(state => state.authReducer.user.username)
    const events = useTypedSelector(state => state.eventReducer.events)
    useEffect(()=>{
      fetchGuests()
      fetchEvent(user)
    }, [])

    return (
        <EventCalendar
          events={events}
        />
    )
}

export default Event
