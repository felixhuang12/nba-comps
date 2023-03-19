import { State } from "./state"
import { Player, User, StatsDisplay } from "../types"

export type Action =
    {
        type: "SET_NOTIFICATION_MESSAGE",
        payload: { message: string, alertType: string }
    } |
    {
        type: "SET_LOGGED_IN_USER",
        payload: User
    } |
    {
        type: "SET_PLAYERS",
        payload: { players: Player[] }
    } |
    {
        type: "SET_STATS_TO_DISPLAY",
        payload: StatsDisplay
    } |
    {
        type: "RESET_STATE",
        payload: State
    }

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_NOTIFICATION_MESSAGE":
            return {
                ...state,
                notification: {
                    message: action.payload.message,
                    alertType: action.payload.alertType
                }
            }
        case "SET_LOGGED_IN_USER":
            return {
                ...state,
                user: action.payload
            }
        case "SET_PLAYERS":
            return {
                ...state,
                players: action.payload.players
            }
        case "SET_STATS_TO_DISPLAY":
            return {
                ...state,
                statsToShow: action.payload
            }
        case "RESET_STATE":
            return action.payload
        default:
            return state
    }
}