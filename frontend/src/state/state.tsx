import React, { createContext, useContext, useReducer } from "react";
import { Player, User, StatsDisplay } from "../types";

import { Action } from "./reducer";

export type State = {
    user: User,
    players: Player[],
    statsToShow: StatsDisplay,
    notification: {
        message: string,
        alertType: string
    }
}

const defaultStats = {
    show_ppg: true,
    show_apg: true,
    show_rpg: true,
    show_fg_pct: true,
    show_fg2_pct: true,
    show_fg3_pct: true,
    show_ft_pct: true,
    show_ts_pct: true,
    show_gp: false,
    show_mpg: false,
    show_spg: false,
    show_bpg: false,
    show_tpg: false,
    show_lastppg: true,
    show_lastapg: true,
    show_lastrpg: true,
    show_lastfg_pct: true,
    show_lastfg2_pct: true,
    show_lastfg3_pct: true,
    show_lastft_pct: true,
    show_lastts_pct: true,
    show_lastmpg: false,
    show_lastspg: false,
    show_lastbpg: false,
    show_lasttpg: false
}

export const initialState: State = {
    user: {} as User,
    players: [],
    statsToShow: defaultStats,
    notification: {
        message: '',
        alertType: 'none'
    }
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
    initialState,
    () => initialState
]);

type StateProviderProps = {
    reducer: React.Reducer<State, Action>;
    children: React.ReactElement;
};

export const StateProvider = ({
    reducer,
    children
}: StateProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
};
export const useStateValue = () => useContext(StateContext);