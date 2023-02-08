import { State } from "./state"
import { Player, User } from "../types"

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
        default:
            return state
    }
}