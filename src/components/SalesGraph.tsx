import {type HTMLAttributes, useEffect, useRef} from "react";
import classNames from "classnames";
import useData from "@/components/useData.ts";
import * as Plot from "@observablehq/plot";
import type {Month} from "@/components/types";

const months: Month[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const monthNames: Record<Month, string> = {
    ['01']: 'Jan',
    ['02']: 'Feb',
    ['03']: 'Mar',
    ['04']: 'Apr',
    ['05']: 'May',
    ['06']: 'Jun',
    ['07']: 'Jul',
    ['08']: 'Aug',
    ['09']: 'Sep',
    ['10']: 'Oct',
    ['11']: 'Nov',
    ['12']: 'Dec',
};

export type SalesGraphProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export default function SalesGraph({className, ...rest}: SalesGraphProps) {
    const {data, years} = useData();
    const plotContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!plotContainer.current) {
            return;
        }
        const maxHeight = (document.querySelector('main')?.clientHeight ?? 300) - 160;
        const inComponent = document.querySelector('body')?.classList.contains('chums-module') ?? false;
        const plotElement = Plot.plot({
            marginTop: 20,
            marginLeft: inComponent ? 50 : 100,
            marginRight: 20,
            marginBottom: 30,
            width: plotContainer.current.clientWidth,
            height: inComponent ? 300 : maxHeight,
            fx: {
                domain: months,
                tickFormat: (month: Month) => monthNames[month],
                axis: 'bottom',
                label: 'Sales by Month'
            },
            x: {domain: years, tickFormat: null, label: null},
            color: {
                scheme: "Blues",
                legend: true,
                tickFormat: (d) => {
                    return d
                },
                type: 'ordinal',
            },
            y: {tickFormat: 's'},
            // x: {type: 'point', domain: data.map(d => d.month), grid: true, tickFormat: month => monthNames[month]},
            marks: [
                Plot.barY(
                    data,
                    {
                        x: 'year',
                        y: 'value',
                        fill: 'year',
                        fx: 'month',
                        tip: {
                            y: 'Sales',
                            x: 'Month',
                        }
                    }
                ),
            ]
        });
        plotContainer.current.appendChild(plotElement);
        return () => {
            if (plotElement) {
                plotElement.remove();
            }
        }
    }, [data, years])

    return (
        <div className={classNames("border rounded-1 h-full p-3", className)} {...rest}>
            <div ref={plotContainer} className="w-full h-full"></div>
        </div>
    )
}
