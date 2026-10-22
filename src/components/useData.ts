import type {DataContextState} from "@/components/types";
import {useContext} from "react";
import DataContext from "@/components/DataContext.ts";

export default function useData(): DataContextState {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataContextProvider');
    }
    return context;
}
