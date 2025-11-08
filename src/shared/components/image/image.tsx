import styles from './image.module.css'

interface ImageProps {
    className?: string;
    alt?: string;
    src?: string | null;
} 

export const Image: React.FC<ImageProps> = ({className, alt, src}) => {
    const placeholderPath = '/images/placeholder.webp';

    return (
        <div className={`${styles.image} ${className}`}>
            <img
                src={src ?? placeholderPath}
                alt={alt ?? "item image"}
            />
        </div>
    )
}