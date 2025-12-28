import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
    showText?: boolean;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function Logo({ showText = true, className = '', size = 'md' }: LogoProps) {
    const sizeMap = {
        sm: { width: 32, height: 32, textSize: 'text-xl' },
        md: { width: 40, height: 40, textSize: 'text-2xl' },
        lg: { width: 48, height: 48, textSize: 'text-3xl' },
    };

    const { width, height, textSize } = sizeMap[size];

    return (
        <Link href="/" className={`flex items-center gap-3 group ${className}`}>
            <div className="relative overflow-hidden transition-transform group-hover:scale-105 duration-300">
                <Image
                    src="/logo.png"
                    alt="Movie Matchmaker Logo"
                    width={width}
                    height={height}
                    className="object-contain"
                />
            </div>
            {showText && (
                <span className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tighter ${textSize}`}>
                    MovieMatcher
                </span>
            )}
        </Link>
    );
}
