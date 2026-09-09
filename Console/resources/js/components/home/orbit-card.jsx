import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Five evenly spaced nodes, centered on the middle orbital ring.
const orbitPositions = [
    'left-1/2 top-[17%]',
    'left-[81.4%] top-[39.8%]',
    'left-[69.4%] top-[76.7%]',
    'left-[30.6%] top-[76.7%]',
    'left-[18.6%] top-[39.8%]',
];

/**
 * A circular homepage selector that updates the adjacent detail card.
 *
 * @param {object} props
 * @param {number} props.index Position in the five-node orbit.
 * @param {import('react').ElementType} props.icon Node icon.
 * @param {string} props.title Full node title, allowed to wrap.
 * @param {string} props.caption Short technology or skill scope.
 * @param {string} [props.number] Optional solution number.
 * @param {boolean} [props.monospace] Use code typography for skill names.
 * @param {boolean} props.isActive Whether the node is selected.
 * @param {(index: number) => void} props.onSelect Selection callback.
 * @returns {import('react').ReactElement}
 */
export function OrbitCard({ index, icon: Icon, title, caption, number, monospace = false, isActive, onSelect }) {
    return (
        <div className={cn('absolute size-[32%] -translate-x-1/2 -translate-y-1/2', orbitPositions[index])}>
            <Button
                type="button"
                variant="outline"
                aria-pressed={isActive}
                onClick={() => onSelect(index)}
                onMouseEnter={() => onSelect(index)}
                onFocus={() => onSelect(index)}
                className={cn(
                    'relative size-full flex-col gap-2 whitespace-normal rounded-full p-4 text-center backdrop-blur-xl transition-[transform,box-shadow,border-color,background-color] duration-300 motion-safe:hover:-translate-y-1 motion-reduce:transition-none',
                    isActive
                        ? 'border-primary/60 bg-card/85 shadow-xl shadow-primary/15 ring-2 ring-primary/25 hover:bg-card/85'
                        : 'border-border/60 bg-card/50 shadow-md hover:border-primary/40 hover:bg-card/70',
                )}
            >
                {number && (
                    <span className="absolute right-[14%] top-[14%] font-mono text-xs font-semibold text-primary/70" aria-hidden="true">
                        {number}
                    </span>
                )}
                <span className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-full transition-colors motion-reduce:transition-none',
                    isActive ? 'bg-primary text-primary-foreground shadow-xs' : 'bg-secondary/80 text-primary',
                )}>
                    <Icon aria-hidden="true" />
                </span>
                <span className={cn('w-full text-balance text-xs font-semibold leading-4 wrap-break-word text-foreground', monospace && 'font-mono')}>
                    {title}
                </span>
                <span className="w-full text-balance text-xs leading-4 text-muted-foreground">{caption}</span>
            </Button>
        </div>
    );
}
