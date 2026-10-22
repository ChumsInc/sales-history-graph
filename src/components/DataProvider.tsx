import {type ReactNode, startTransition, useCallback, useEffect, useMemo, useRef, useState} from "react";
import DataContext from "@/components/DataContext.ts";
import type {DataContextState, DataState, GraphData, MonthData} from "@/components/types";
import {fetchJSON} from "@chumsinc/ui-utils";
import {getYears} from "@/components/years.ts";

export interface DataProviderProps {
    children: ReactNode;
}

export default function DataProvider({children}: DataProviderProps) {
    const statusRef = useRef<DataState>('idle');
    const [status, setStatus] = useState<DataState>('idle');
    const years: string[] = getYears();
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<GraphData[]>([]);
    const dataUrl = '/api/sales/history-graph.json';

    const dataHandler = useCallback(async () => {
        try {
            const res = await fetchJSON<MonthData[]>(dataUrl, {cache: 'no-cache'});
            if (!res) {
                return Promise.reject(new Error('No data returned from server'));
            }
            setData([
                ...res.map(d => ({month: d.month, year: years[0], value: d.year0 + d.openTotal})),
                ...res.map(d => ({month: d.month, year: years[1], value: d.year1})),
                ...res.map(d => ({month: d.month, year: years[2], value: d.year2})),
            ])
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.debug("()", err.message);
                return Promise.reject(err);
            }
            console.debug("()", err);
            return Promise.reject(new Error('Error in ()'));
        }
    }, [years])

    useEffect(() => {
        if (statusRef.current !== 'idle') {
            return;
        }
        startTransition(() => {
            setStatus('loading');
            dataHandler().catch(err => console.debug("()", err instanceof Error ? err.message : 'unknown error'))
            setStatus('idle');
            statusRef.current = 'loaded';
        })
    }, [dataHandler])

    const loadData = useCallback(async () => {
        if (status === 'loading') {
            return;
        }
        setStatus('loading');
        startTransition(async () => {
            try {
                setStatus('loading')
                await dataHandler();
                setStatus('loaded');
            } catch (err: unknown) {
                console.debug("()", err instanceof Error ? err.message : 'unknown error');
                setError(err instanceof Error ? err.message : 'unknown error');
                setStatus('rejected');
            }
        })
    }, [status, dataHandler])

    const value = useMemo<DataContextState>(() => {
        return {
            status,
            error,
            data,
            years,
            loadData,
        }
    }, [status, error, data, years, loadData]);

    return (
        <DataContext value={value}>
            {children}
        </DataContext>
    )
}
