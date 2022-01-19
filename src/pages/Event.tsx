import React, {FC, useEffect} from 'react'
import EventCalendar from "../components/EventCalendar";
import {useActions} from "../hooks/useActions";

const Event:FC = () => {
    const {fetchGuests} = useActions()
    useEffect(()=>{
      fetchGuests()
    }, [])

    return (
      <div>
        <EventCalendar
          events={[]}
        />
      </div>
    )
}

export default Event
