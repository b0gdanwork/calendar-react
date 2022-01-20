import {IUser} from "../../../models/IUser";
import {EventActionsEnum, eventsActions} from "./types";
import {IEvent} from "../../../models/IEvent";
import {AppDispatch} from "../../index";
import axios from "axios";

export const EventActionCreators = {
  setLoading: (isLoading: boolean): eventsActions => ({type: EventActionsEnum.SET_IS_LOADING, payload: isLoading}),
  setGuests: (guests: [IUser]): eventsActions => ({type: EventActionsEnum.SET_QUESTS, payload: guests}),
  setEvents: (events: IEvent[]): eventsActions => ({type: EventActionsEnum.SET_EVENTS, payload: events}),
  fetchGuests: ()=> async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get("./users.json")
      dispatch(EventActionCreators.setGuests(response.data))
    } catch (e) {

    }
  },
  createEvent: (event:IEvent)=> async (dispatch: AppDispatch) => {
    try {
      dispatch(EventActionCreators.setLoading(true))
      setTimeout(()=>{
        const events = localStorage.getItem("events") || '[]'
        const json = JSON.parse(events) as IEvent[]
        json.push(event)
        dispatch(EventActionCreators.setEvents(json))
        localStorage.setItem('events', JSON.stringify(json))
      }, 1500)
      dispatch(EventActionCreators.setLoading(false))
    } catch (e) {
      console.error(e)
    }
  },
  fetchEvent: (username:string)=> async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem("events") || '[]'
      const json = JSON.parse(events) as IEvent[]
      const currentUserEvents = json.filter(ev=> ev.author === username || ev.quest === username)
      dispatch(EventActionCreators.setEvents(currentUserEvents))
    } catch (e) {
      console.error(e)
    }
  },

}
