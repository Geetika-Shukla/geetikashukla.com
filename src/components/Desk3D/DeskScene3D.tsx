"use client";

// EXTERNAL DEPS ===============================================================
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// INTERNAL DEPS ===============================================================
import { Room } from "./Room";
import { Desk, Echo, Journals, Keyboard, Monitor, Mouse, Mug, Phone, Plant, Shelf } from "./objects";

// TYPES =======================================================================
import type { MutableRefObject } from "react";
import type { DeskObjectId, ObjectHandlers } from "./objects";

interface Focus {
    target : [number, number, number];
    zoom   : number;
}

// Resting view of the whole room, with space above the desk for the headline
const BASE: Focus = { target: [0.5, 3.4, 0], zoom: 0.78 };

// Where the camera leans when an object is hovered
const HOVER_FOCUS: Record<DeskObjectId, Focus> = {
    monitor  : { target: [-1.8, 2, -0.5], zoom: 1.15 },
    echo     : { target: [-4.4, 1, 0], zoom: 1.2 },
    shelf    : { target: [4.6, 1.9, -0.8], zoom: 1.15 },
    journals : { target: [1.8, 0.8, 0.3], zoom: 1.2 },
    phone    : { target: [3, 1.1, -0.2], zoom: 1.2 },
};

// How far towards a hovered object the camera moves (0 = stay, 1 = centre on it)
const LEAN = 0.55;
const CAMERA_OFFSET = new THREE.Vector3(12, 10, 14);

// Holds the room view and leans towards whatever is hovered
const CameraRig = ({ hoveredRef }: { hoveredRef: MutableRefObject<DeskObjectId | null> }) => {
    const look = useRef(new THREE.Vector3(...BASE.target));
    const goal = useMemo(() => new THREE.Vector3(), []);

    useFrame(({ camera, size }, delta) => {
        const hovered = hoveredRef.current ? HOVER_FOCUS[hoveredRef.current] : null;
        goal.set(...BASE.target);
        if (hovered) goal.lerp(new THREE.Vector3(...hovered.target), LEAN);
        const zoomFactor = hovered ? THREE.MathUtils.lerp(BASE.zoom, hovered.zoom, LEAN) : BASE.zoom;
        // Fit the room to the viewport; on portrait screens fill the width and let
        // the plain ends of the desk crop
        const fit = size.width < size.height ? size.width / 10.5 : Math.min(size.width / 16, size.height / 9);
        const zoom = zoomFactor * fit;

        look.current.x = THREE.MathUtils.damp(look.current.x, goal.x, 3, delta);
        look.current.y = THREE.MathUtils.damp(look.current.y, goal.y, 3, delta);
        look.current.z = THREE.MathUtils.damp(look.current.z, goal.z, 3, delta);
        camera.position.copy(look.current).add(CAMERA_OFFSET);
        camera.lookAt(look.current);
        const ortho = camera as THREE.OrthographicCamera;
        ortho.zoom = THREE.MathUtils.damp(ortho.zoom, zoom, 3, delta);
        ortho.updateProjectionMatrix();
    });
    return null;
};

export interface PillAnchor {
    id       : DeskObjectId;
    position : [number, number, number];
}

// Moves HTML pill labels (rendered outside the canvas) to their objects' screen positions
const PillTracker = ({ anchors, elements }: { anchors: PillAnchor[]; elements: MutableRefObject<Record<string, HTMLElement | null>> }) => {
    const point = useMemo(() => new THREE.Vector3(), []);
    useFrame(({ camera, size }) => {
        anchors.forEach(({ id, position }) => {
            const element = elements.current[id];
            if (!element) return;
            point.set(...position).project(camera);
            const x = ((point.x + 1) / 2) * size.width;
            const y = ((1 - point.y) / 2) * size.height;
            element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
    });
    return null;
};

interface DeskScene3DProps {
    progressRef : MutableRefObject<number>;
    hoveredRef  : MutableRefObject<DeskObjectId | null>;
    handlers    : ObjectHandlers;
    pills       : PillAnchor[];
    pillRefs    : MutableRefObject<Record<string, HTMLElement | null>>;
    onMeow      : () => void;
}

export const DeskScene3D = ({ progressRef, hoveredRef, handlers, pills, pillRefs, onMeow }: DeskScene3DProps) => (
    <>
        <CameraRig hoveredRef={hoveredRef} />
        <PillTracker anchors={pills} elements={pillRefs} />

        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#FFF6E8", "#C9BBA6", 0.55]} />
        <directionalLight
            position={[6, 12, 8]}
            intensity={1.5}
            color="#FFF4E2"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-14}
            shadow-camera-right={14}
            shadow-camera-top={14}
            shadow-camera-bottom={-14}
            shadow-bias={-0.0005}
        />
        {/* Cool daylight from the window */}
        <pointLight position={[0, 3.4, 0.5]} intensity={1.5} distance={8} color="#D9E8FF" />

        <Room progressRef={progressRef} />
        <Desk />
        <Mug />
        <Echo handlers={handlers} />
        <Monitor handlers={handlers} />
        <Keyboard />
        <Mouse />
        <Journals handlers={handlers} />
        <Phone handlers={handlers} />
        <Shelf handlers={handlers} onMeow={onMeow} />
        <Plant />
        <ContactShadows position={[0.4, 0.01, 0]} scale={15} blur={2.4} opacity={0.35} far={3} />
    </>
);
