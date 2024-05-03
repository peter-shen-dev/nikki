import { fetchThing } from '@/data/thing';
import { ThingTitle } from '@/ui/text';

export default async function ThingInfo({ id, className }: { id: number, className?: string }) {
    const thing = await fetchThing(id);

    return (
        <section className={`flex flex-col ${className}`}>
            <div className="flex gap-2 items-end mt-3">
                <ThingTitle className="text-2xl leading-none max-w-[400px]" name={thing.name} />
                <span className="text-color-reach text-sm leading-none">{thing.prod_year}</span>
            </div>
        </section>
    );
}
