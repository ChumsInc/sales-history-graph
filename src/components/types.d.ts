export type DataState = 'idle' | 'loading' | 'loaded' | 'rejected';

export interface DataContextState {
    status: DataState;
    error: string | null;
    data: GraphData[];
    years: string[];
    loadData: () => void;
}


interface GraphData {
    month: string;
    year: string;
    value: number;
}

interface MonthData {
    month: string;
    year0: number;
    year1: number;
    year2: number;
    openTotal: number;
    goal: number;
}

export type Month = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
