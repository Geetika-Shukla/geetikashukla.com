"use client";

// EXTERNAL DEPS ===============================================================
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// INTERNAL DEPS ===============================================================
import { Mat } from "./materials";
import { phaseForHour, printTexture, skyTexture } from "./textures";

// TYPES =======================================================================
import type { MutableRefObject } from "react";

// Room geometry (units ≈ decimetres): floor at y = -3, back wall face at z = -1.7,
// window opening x -3.6..3.6, y 1.2..5.6. Walls are wide enough never to end on screen.
const WALL = "#F2EEE6";
const SIDE_WALL = "#ECE6DB";
const SKIRTING = "#FBFAF6";
// Walls glow a little in their own colour, so they read lighter under the scene's lighting
const WALL_GLOW = 0.35;
// Must match --floor in desk-3d.css
export const FLOOR = "#E4DCCD";

/*
 * The work section's isometric grid, carried onto the room's floor: lines in
 * the text colour at 6% (as --line in work-floor.css), one CSS pixel wide, with
 * the cell matched on screen to the work grid's (--c), so the two read as one.
 */
const GRID_LINE = [28 / 255, 28 / 255, 30 / 255];
// Lines start from the floor's corner, where the skirting meets it (side wall x, back wall z)
const GRID_ORIGIN = new THREE.Vector2(-8.42, -1.62);
const GRID_OPACITY = 0.06;
const workGridCell = () => Math.min(window.innerWidth / 68, window.innerHeight / 38);   // --c, px

const FloorGrid = () => {
    const material = useMemo(() => new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
            cell    : { value: 0.3 },
            origin  : { value: GRID_ORIGIN },
            width   : { value: 1 },
            color   : { value: new THREE.Vector3(...GRID_LINE) },
            opacity : { value: GRID_OPACITY },
        },
        vertexShader: `
            varying vec2 vFloor;
            void main() {
                vec4 world = modelMatrix * vec4(position, 1.0);
                vFloor = world.xz;
                gl_Position = projectionMatrix * viewMatrix * world;
            }`,
        fragmentShader: `
            uniform float cell;
            uniform vec2 origin;
            uniform float width;
            uniform vec3 color;
            uniform float opacity;
            varying vec2 vFloor;
            void main() {
                vec2 coord = (vFloor - origin) / cell;
                vec2 distance = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
                float line = 1.0 - clamp(min(distance.x, distance.y) - width * 0.5 + 0.5, 0.0, 1.0);
                gl_FragColor = vec4(color, line * opacity);
            }`,
    }), []);
    useEffect(() => () => material.dispose(), [material]);

    const meshRef = useRef<THREE.Mesh>(null);
    useFrame(({ camera, gl }) => {
        const uniforms = (meshRef.current?.material as THREE.ShaderMaterial | undefined)?.uniforms;
        if (!uniforms) return;
        // World units per CSS pixel is 1 / zoom; keep the cell the same size as the work grid's
        uniforms.cell.value = workGridCell() / camera.zoom;
        uniforms.width.value = gl.getPixelRatio();
    });

    return (
        <mesh ref={meshRef} position={[4, -2.997, 8]} rotation={[-Math.PI / 2, 0, 0]} material={material}>
            <planeGeometry args={[40, 20]} />
        </mesh>
    );
};
const WINDOW = { left: -3.6, right: 3.6, bottom: 1.2, top: 5.6 };

const Walls = () => (
    <group>
        {/* Back wall, built around the window opening */}
        <mesh position={[-11.8, 12, -1.8]} receiveShadow><boxGeometry args={[16.4, 30, 0.2]} /><Mat color={WALL} emissive={WALL} emissiveIntensity={WALL_GLOW} /></mesh>
        <mesh position={[11.8, 12, -1.8]} receiveShadow><boxGeometry args={[16.4, 30, 0.2]} /><Mat color={WALL} emissive={WALL} emissiveIntensity={WALL_GLOW} /></mesh>
        <mesh position={[0, -0.9, -1.8]} receiveShadow><boxGeometry args={[7.2, 4.2, 0.2]} /><Mat color={WALL} emissive={WALL} emissiveIntensity={WALL_GLOW} /></mesh>
        <mesh position={[0, 16.3, -1.8]} receiveShadow><boxGeometry args={[7.2, 21.4, 0.2]} /><Mat color={WALL} emissive={WALL} emissiveIntensity={WALL_GLOW} /></mesh>
        {/* Side wall, floor and skirting */}
        <mesh position={[-8.6, 12, 8]} receiveShadow><boxGeometry args={[0.2, 30, 19.6]} /><Mat color={SIDE_WALL} emissive={SIDE_WALL} emissiveIntensity={WALL_GLOW} /></mesh>
        {/* Floor: flat, unlit colour shared with the work section below, so the two meet seamlessly.
            Shadows are drawn on a transparent layer just above it. */}
        <mesh position={[4, -3.1, 8]}><boxGeometry args={[40, 0.2, 20]} /><meshBasicMaterial color={FLOOR} toneMapped={false} /></mesh>
        <FloorGrid />
        <mesh position={[4, -2.995, 8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[40, 20]} /><shadowMaterial opacity={0.18} /></mesh>
        <mesh position={[4, -2.84, -1.66]}><boxGeometry args={[40, 0.32, 0.08]} /><Mat color={SKIRTING} /></mesh>
        <mesh position={[-8.46, -2.84, 8]}><boxGeometry args={[0.08, 0.32, 19.6]} /><Mat color={SKIRTING} /></mesh>
    </group>
);

// Striped dhurrie-style rug under the desk, reaching the same distance past
// both ends of the desk (12.3 wide, centred at x 0.25), back edge at the wall
const RUG_WIDTH = 13.9;
const RUG_DEPTH = 5.4;
const Rug = () => (
    <group position={[0.25, -2.99, RUG_DEPTH / 2 - 1.7]}>
        <RoundedBox args={[RUG_WIDTH, 0.03, RUG_DEPTH]} radius={0.01} receiveShadow><Mat color="#34507F" /></RoundedBox>
        <mesh position={[0, 0.02, 0]} receiveShadow><boxGeometry args={[RUG_WIDTH - 0.8, 0.01, RUG_DEPTH - 0.8]} /><Mat color="#F4ECDD" /></mesh>
        <mesh position={[0, 0.025, 0]} receiveShadow><boxGeometry args={[RUG_WIDTH - 1.4, 0.01, RUG_DEPTH - 1.4]} /><Mat color="#C9683E" /></mesh>
        <mesh position={[0, 0.03, 0]} receiveShadow><boxGeometry args={[RUG_WIDTH - 2, 0.01, RUG_DEPTH - 2]} /><Mat color="#34507F" /></mesh>
        {[-1, 0, 1].map((i) => (
            <mesh key={i} position={[0, 0.035, i * (RUG_DEPTH - 2) / 4]} receiveShadow><boxGeometry args={[RUG_WIDTH - 2.6, 0.01, 0.16]} /><Mat color="#E3B94C" /></mesh>
        ))}
    </group>
);

// Framed print above the shelf
const Print = () => {
    const texture = useMemo(() => printTexture(), []);
    return (
        <group position={[6.1, 4.3, -1.66]}>
            <mesh castShadow><boxGeometry args={[2.3, 2.9, 0.08]} /><Mat color="#2B2D38" /></mesh>
            <mesh position={[0, 0, 0.045]}><planeGeometry args={[2.1, 2.7]} /><Mat color="#FBFAF6" /></mesh>
            <mesh position={[0, 0, 0.05]}><planeGeometry args={[1.7, 2.2]} /><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
        </group>
    );
};

const Window = ({ hoverRef }: { hoverRef: MutableRefObject<boolean> }) => {
    const [phase, setPhase] = useState(() => phaseForHour(new Date().getHours()));
    useEffect(() => {
        const interval = window.setInterval(() => setPhase(phaseForHour(new Date().getHours())), 10 * 60 * 1000);
        return () => window.clearInterval(interval);
    }, []);
    const sky = useMemo(() => skyTexture(phase), [phase]);

    const width = WINDOW.right - WINDOW.left;
    const height = WINDOW.top - WINDOW.bottom;
    const midY = (WINDOW.top + WINDOW.bottom) / 2;
    const frame = "#FBFAF6";

    return (
        <group>
            <mesh
                position={[0, midY, -1.95]}
                onPointerOver={() => { hoverRef.current = true; }}
                onPointerOut={() => { hoverRef.current = false; }}
            >
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial map={sky} toneMapped={false} />
            </mesh>
            {/* Reveal (wall thickness), frame, mullions and sill */}
            <mesh position={[0, WINDOW.top, -1.8]}><boxGeometry args={[width, 0.04, 0.2]} /><Mat color="#E3DBCC" /></mesh>
            <mesh position={[WINDOW.left, midY, -1.8]}><boxGeometry args={[0.04, height, 0.2]} /><Mat color="#E3DBCC" /></mesh>
            <mesh position={[WINDOW.right, midY, -1.8]}><boxGeometry args={[0.04, height, 0.2]} /><Mat color="#E3DBCC" /></mesh>
            {[
                [0, WINDOW.top + 0.05, width + 0.4, 0.18], [-3.7, midY, 0.18, height + 0.2], [3.7, midY, 0.18, height + 0.2],
                [0, midY, 0.12, height], [0, midY + 0.2, width, 0.1],
            ].map(([x, y, w, h], i) => (
                <mesh key={i} position={[x, y, -1.68]} castShadow><boxGeometry args={[w, h, 0.16]} /><Mat color={frame} /></mesh>
            ))}
            <RoundedBox args={[width + 0.8, 0.14, 0.5]} radius={0.03} position={[0, WINDOW.bottom - 0.04, -1.5]} castShadow receiveShadow>
                <Mat color={frame} />
            </RoundedBox>
        </group>
    );
};

// Wooden venetian blind: slats spread down when closed and stack under the rail
// when open. Opens with scroll; hovering the window opens it halfway.
const SLATS = 14;
const SLAT_TOP = 5.35;
const SLAT_PITCH = 0.3;
const SLAT_STACK = 0.06;

const Blind = ({ progressRef, hoverRef }: { progressRef: MutableRefObject<number>; hoverRef: MutableRefObject<boolean> }) => {
    const slats = useRef<THREE.Mesh[]>([]);
    const tapes = useRef<THREE.Mesh[]>([]);
    const cord = useRef<THREE.Group>(null);
    const open = useRef(0);

    useFrame((_, delta) => {
        const scrolled = THREE.MathUtils.clamp(progressRef.current, 0, 1);
        const target = Math.max(scrolled, hoverRef.current ? 0.5 : 0);
        open.current = THREE.MathUtils.damp(open.current, target, 6, delta);
        const pitch = THREE.MathUtils.lerp(SLAT_PITCH, SLAT_STACK, open.current);

        slats.current.forEach((slat, i) => { slat.position.y = SLAT_TOP - i * pitch; });
        // Ladder tapes run from the rail to the bottom slat
        const drop = (SLATS - 1) * pitch + 0.15;
        tapes.current.forEach((tape) => {
            tape.scale.y = drop;
            tape.position.y = SLAT_TOP + 0.15 - drop / 2;
        });
        if (cord.current) cord.current.position.y = open.current * 1.8;
    });

    return (
        <group position={[0, 0, -1.5]}>
            <RoundedBox args={[7.5, 0.24, 0.32]} radius={0.04} position={[0, 5.52, 0]} castShadow><Mat color="#B5844A" /></RoundedBox>
            {Array.from({ length: SLATS }, (_, i) => (
                <mesh key={i} ref={(m) => { if (m) slats.current[i] = m; }} position={[0, SLAT_TOP - i * SLAT_PITCH, 0]} rotation={[0.35, 0, 0]} castShadow>
                    <boxGeometry args={[7.1, 0.03, 0.26]} />
                    <Mat color={i === SLATS - 1 ? "#B98346" : "#DDAE6D"} />
                </mesh>
            ))}
            {[-2.4, 2.4].map((x, i) => (
                <mesh key={x} ref={(m) => { if (m) tapes.current[i] = m; }} position={[x, 3, 0.14]}>
                    <boxGeometry args={[0.06, 1, 0.01]} />
                    <Mat color="#F1E6D2" />
                </mesh>
            ))}
            {/* Pull cord with a wooden acorn */}
            <group ref={cord}>
                <mesh position={[1.2, 3.9, 0.2]}><cylinderGeometry args={[0.012, 0.012, 3.2, 4]} /><Mat color="#F1E6D2" /></mesh>
                <mesh position={[1.2, 2.2, 0.2]} castShadow><capsuleGeometry args={[0.06, 0.14, 4, 8]} /><Mat color="#B5844A" /></mesh>
            </group>
        </group>
    );
};

export const Room = ({ progressRef }: { progressRef: MutableRefObject<number> }) => {
    const hoverRef = useRef(false);
    return (
        <>
            <Walls />
            <Rug />
            <Print />
            <Window hoverRef={hoverRef} />
            <Blind progressRef={progressRef} hoverRef={hoverRef} />
        </>
    );
};
