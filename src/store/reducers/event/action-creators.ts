import {IUser} from "../../../models/IUser";
import {EventActionsEnum, eventsActions} from "./types";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import axios from "axios";

export const EventActionCreators = {
  setGuests: (guests: [IUser]): eventsActions => ({type: EventActionsEnum.SET_QUESTS, payload: guests}),
  setEvents: (events: [IEvent]): eventsActions => ({type: EventActionsEnum.SET_EVENTS, payload: events}),
  fetchGuests: ()=> async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("./users.json")
      dispatch(EventActionCreators.setGuests(response.data))
    } catch (e) {

    }
  },

  createEvent: (event:IEvent)=> async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || '[]'
      const json = JSON.parse(events) as [IEvent]
      json.push(event)
      dispatch(EventActionCreators.setEvents(json))
      localStorage.setItem('events', JSON.stringify(json))
    } catch (e) {

    }
  }
}
