import {createContext} from "react";
import type {DataContextState} from "@/components/types";

const context = createContext<DataContextState | null>(null);

export default context;
