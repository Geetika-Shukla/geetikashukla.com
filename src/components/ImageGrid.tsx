const ImageGrid = ({ images }) => {
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",  // 3 columns
            gap: "64px",  // Adjust spacing between images
            justifyItems: "center" // Centers images within grid cells
        }}>
            {images.map((src, index) => (
                <div key={index} style={{ width: "260px", height: "260px" }}>
                    <img src={src} alt={`Inktober ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;