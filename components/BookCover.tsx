import BookCoverSvg from './BookCoverSvg';
import Image from 'next/image';
import React from 'react'
import { cn } from '@/lib/utils';

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide" ;

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: "book-cover_extra_small",
    small: "book-cover_small",
    medium: "book-cover_medium",
    regular: "book-cover_regular",
    wide: "book-cover_wide",
    
}

const BookCover = ({
    variant = "regular",
    className,
    coverColor = "#012B4B",
    coverUrl = "https://placehold.co/600x400/000000/FFFFFF/png",
  }: {
    variant?: BookCoverVariant
    className?: string,
    coverColor: string,
    coverUrl: string,
}) => {
  return (
    <div className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className,
    )}>
        <BookCoverSvg coverColor= {coverColor}/>

        <div 
            className='absolute z-10'
            style={{left: "12%", width: "87.5%", height: "88%"}}
        >
            <Image 
                src={coverUrl}
                alt='Book Cover'
                fill
                className='rounded-sm object-fill'
            />
        </div>
    </div>
  )
}

export default BookCover