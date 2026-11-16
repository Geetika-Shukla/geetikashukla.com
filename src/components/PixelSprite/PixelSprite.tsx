// TYPES =======================================================================
import type { SVGProps } from "react";

export interface Sprite {
    // One string per row; each character is a palette key, "." is transparent
    rows    : string[];
    palette : Record<string, string>;
}

interface PixelSpriteProps extends SVGProps<SVGSVGElement> {
    sprite : Sprite;
}

// Renders a character-map sprite as an SVG, merging horizontal runs of the same colour
export const PixelSprite = ({ sprite, ...props }: PixelSpriteProps) => {
    const { rows, palette } = sprite;
    const width = Math.max(...rows.map((row) => row.length));
    const rects: JSX.Element[] = [];

    rows.forEach((row, y) => {
        let x = 0;
        while (x < row.length) {
            const key = row[x];
            let run = 1;
            while (row[x + run] === key) run++;
            if (key !== "." && palette[key]) {
                rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={palette[key]} />);
            }
            x += run;
        }
    });

    return (
        <svg
            viewBox={`0 0 ${width} ${rows.length}`}
            shapeRendering="crispEdges"
            aria-hidden="true"
            {...props}
        >
            {rects}
        </svg>
    );
};
