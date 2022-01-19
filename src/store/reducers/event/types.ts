import {IUser} from "../../../models/IUser";
import {IEvent} from "../../../models/IEvent";

export interface EventState {
  guests: IUser[],
  events: IEvent[],
  isLoading?: boolean
}

export enum EventActionsEnum  {
  SET_QUESTS = "SET_QUESTS",
  SET_EVENTS = "SET_EVENTS",
}

export interface setGuestsAction  {
  type: EventActionsEnum.SET_QUESTS,
  payload: IUser[],
}

export interface setEventsAction  {
  type: EventActionsEnum.SET_EVENTS,
  payload: IEvent[],
}

export type eventsActions = setGuestsAction | setEventsAction