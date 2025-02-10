import "@/styles/image-grid.css";

interface ImageGridProps {
    images: string[];
}

const ImageGrid = ({ images }: ImageGridProps) => {
    return (
        <div className="image-grid">
            {images.map((src, index) => (
                <div key={index} className="image-item">
                    <img src={src} alt={`Inktober ${index + 1}`} />
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;
