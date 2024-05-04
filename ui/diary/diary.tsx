import { fetchEntries } from '../../data/entry';
import './diary.css';
import { StylizedRating, ThingTitleLink } from '../text';
import { Suspense } from 'react';

function DiaryHeader({ children }: { children: React.ReactNode }) {
    return <table className="diary_table">
        <thead>
            <tr>
                <td className="text-center">month</td>
                <td className="text-center">date</td>
                <td>name</td>
                <td className="text-center">released</td>
                <td className="text-center">rating</td>
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>;
}

async function DiaryInner() {
    await new Promise(r => setTimeout(r, 2000));
    const entries = await fetchEntries();
    let prevMonth: number;
    return (
        <DiaryHeader>
            {entries?.map((fullEntry) => {
                const entry = fullEntry.entries;
                const thing = fullEntry.things;
                const currentMonth = entry.watch_date.getMonth();
                let monthYear;
                if (currentMonth != prevMonth) {
                    monthYear = entry.watch_date.toLocaleString('default', { month: 'short' });
                    prevMonth = currentMonth;
                }
                return (
                    <tr key={entry.id}>
                        <td className="text-center text-sm font-extralight">{monthYear}</td>
                        <td className="text-center text-sm font-extralight">{entry.watch_date.getDate()}</td>
                        <td className="max-w-80"><ThingTitleLink name={thing.name} thingId={entry.thing_id} className="action-link" /></td>
                        <td className="text-center text-sm font-extralight">{thing.prod_year}</td>
                        <td className="text-center font-light text-sm">
                            <StylizedRating rating={entry.rating} />
                        </td>
                    </tr>
                );
            })
            }
        </DiaryHeader>
    );
}

function DiarySkeleton() {
    function Bit({ className }: { className?: string }) {
        return <td><div className={`bg-color-noise rounded-full h-4 m-1 ${className}`}></div></td>;
    }
    function Row() {
        return <tr>
            <Bit className="w-full" />
            <Bit className="w-full" />
            <Bit className="w-40" />
            <Bit className="w-full" />
            <Bit className="w-full" />
        </tr>;
    }
    return <DiaryHeader>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
    </DiaryHeader>
}

export default function Diary() {
    return <Suspense fallback={<DiarySkeleton />}>
        <DiaryInner />
    </Suspense>
}
