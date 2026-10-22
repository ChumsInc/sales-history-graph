import dayjs from "dayjs";

export function getYears():string[] {
    const d = dayjs();
    return [
        d.format('YYYY'),
        d.subtract(1, 'year').format('YYYY'),
        d.subtract(2, 'year').format('YYYY')
    ];
}
