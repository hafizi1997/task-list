import { cn } from '@/lib/utils';

export function Badge({ completed }: { completed: boolean }) { return <span className={cn('w-fit rounded-full px-3 py-1.5 text-xs font-semibold', completed ? 'bg-[#eaf8f1] text-[#299766]' : 'bg-[#fff4df] text-[#b77918]')}>{completed ? 'Completed' : 'In progress'}</span>; }
