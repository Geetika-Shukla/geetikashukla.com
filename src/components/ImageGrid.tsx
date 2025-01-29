// ImageGrid Component
const ImageGrid = ({ images }) => {
    return (
        <div className="image-grid">
            {images.map((src, index) => (
                <div key={index} className="image-item">
                    <img src={src} alt={`SVG ${index + 1}`} className="image" />
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;
