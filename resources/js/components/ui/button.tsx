import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Button({ className, variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }) {
    return <button className={cn('rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b5ce2]', variant === 'primary' ? 'bg-[#5b5ce2] text-white shadow-lg shadow-[#5b5ce2]/20 hover:bg-[#4748c9]' : 'border border-[#e1e4eb] bg-white text-[#667085] hover:bg-[#f7f8fa]', className)} {...props} />;
}
