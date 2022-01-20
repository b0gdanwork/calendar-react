import {EventActionsEnum, eventsActions, EventState} from "./types";

const initialState:EventState = {
  guests: [],
  events: [],
  isLoading: false
}

export function eventReducer (state:EventState = initialState, action:eventsActions):EventState {
  switch (action.type) {
    case EventActionsEnum.SET_EVENTS:
      return {...state, events: action.payload}

    case EventActionsEnum.SET_IS_LOADING:
      return {...state, isLoading: action.payload}
    
    case EventActionsEnum.SET_QUESTS:
      return {...state, guests: action.payload}

    default:
      return state

  }
}
