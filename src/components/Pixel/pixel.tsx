// Small toolkit for drawing pixel art as SVG rectangles.

// [x, y, width, height, colour]
export type Rect = [number, number, number, number, string];

// Character-map sprite: one string per row, each character a palette key, "." is transparent.
// Horizontal runs of the same colour are merged into one rect.
export const fromRows = (rows: string[], palette: Record<string, string>, ox = 0, oy = 0): Rect[] => {
    const rects: Rect[] = [];
    rows.forEach((row, y) => {
        let x = 0;
        while (x < row.length) {
            const key = row[x];
            let run = 1;
            while (row[x + run] === key) run++;
            if (key !== "." && palette[key]) rects.push([ox + x, oy + y, run, 1, palette[key]]);
            x += run;
        }
    });
    return rects;
};

// Filled pixel circle, one rect per row
export const disc = (cx: number, cy: number, r: number, colour: string): Rect[] => {
    const rects: Rect[] = [];
    for (let y = -r; y < r; y++) {
        const half = Math.round(Math.sqrt(r * r - (y + 0.5) * (y + 0.5)));
        rects.push([cx - half, cy + y, half * 2, 1, colour]);
    }
    return rects;
};

// Rasterises any shape: tests each pixel centre in the bounding box and merges
// horizontal runs. Used to draw smooth shapes out of small pixels.
export const raster = (
    x0: number, y0: number, x1: number, y1: number,
    inside: (x: number, y: number) => boolean,
    colour: string,
): Rect[] => {
    const rects: Rect[] = [];
    for (let y = Math.floor(y0); y < Math.ceil(y1); y++) {
        let start = -1;
        for (let x = Math.floor(x0); x <= Math.ceil(x1); x++) {
            const hit = x < Math.ceil(x1) && inside(x + 0.5, y + 0.5);
            if (hit && start < 0) start = x;
            if (!hit && start >= 0) {
                rects.push([start, y, x - start, 1, colour]);
                start = -1;
            }
        }
    }
    return rects;
};

export const ellipse = (cx: number, cy: number, rx: number, ry: number, colour: string): Rect[] =>
    raster(cx - rx, cy - ry, cx + rx, cy + ry, (x, y) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1, colour);

export const roundRect = (x: number, y: number, w: number, h: number, radius: number, colour: string): Rect[] =>
    raster(x, y, x + w, y + h, (px, py) => {
        const dx = Math.max(x + radius - px, 0, px - (x + w - radius));
        const dy = Math.max(y + radius - py, 0, py - (y + h - radius));
        return dx * dx + dy * dy <= radius * radius;
    }, colour);

// Distance from a point to a segment, and how far along the segment it falls (0–1)
const segment = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
    return { t, d: Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy)) };
};

// Straight stroke with round ends
export const line = (x1: number, y1: number, x2: number, y2: number, width: number, colour: string): Rect[] =>
    raster(Math.min(x1, x2) - width, Math.min(y1, y2) - width, Math.max(x1, x2) + width, Math.max(y1, y2) + width,
        (x, y) => segment(x, y, x1, y1, x2, y2).d <= width / 2, colour);

// Leaf: widest in the middle, tapering to points at both ends
export const leaf = (x1: number, y1: number, x2: number, y2: number, width: number, colour: string): Rect[] =>
    raster(Math.min(x1, x2) - width, Math.min(y1, y2) - width, Math.max(x1, x2) + width, Math.max(y1, y2) + width,
        (x, y) => {
            const { t, d } = segment(x, y, x1, y1, x2, y2);
            return d <= (width / 2) * Math.sin(Math.PI * t);
        }, colour);

// Checkerboard row, used to dither between two bands of colour
export const checker = (x: number, y: number, width: number, colour: string, offset = 0): Rect[] => {
    const rects: Rect[] = [];
    for (let i = (offset % 2); i < width; i += 2) rects.push([x + i, y, 1, 1, colour]);
    return rects;
};

// Renders rects inside an existing <svg>
export const Pixels = ({ rects, className }: { rects: Rect[]; className?: string }) => (
    <g className={className}>
        {rects.map(([x, y, w, h, fill], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill={fill} />
        ))}
    </g>
);

// A tile as a CSS background-image value, for repeating patterns
export const tileDataUri = (rects: Rect[], width: number, height: number): string => {
    const body = rects.map(([x, y, w, h, fill]) => `<rect x='${x}' y='${y}' width='${w}' height='${h}' fill='${fill}'/>`).join("");
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' shape-rendering='crispEdges'>${body}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};
