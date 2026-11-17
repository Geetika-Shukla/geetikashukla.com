"use client";

// EXTERNAL DEPS ===============================================================
import React, { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// INTERNAL DEPS ===============================================================
import { Room } from "./Room";
import { AlexDrawers, Desk, Echo, Journals, Keyboard, Monitor, Mouse, Mug, Phone, Plant, Shelf } from "./objects";

// TYPES =======================================================================
import type { MutableRefObject } from "react";
import type { DeskObjectId, ObjectHandlers } from "./objects";

// The fixed view of the room: what the camera looks at, and how close
const LOOK_AT = new THREE.Vector3(0.5, 2.3, 0);
const ZOOM = 0.8;
// Straight on, like a 2D pixel-art scene, tilted down just enough to show the
// desk top, the floor and the rug as thin bands
const CAMERA_OFFSET = new THREE.Vector3(0, 3, 20);
// On wide screens the room sits right of centre, leaving room for the headline
const SHIFT_RIGHT = 0.12;

/*
 * Holds the camera on the room. The canvas is taller than the screen (so the
 * rug shows in full below), but the room is fitted to, and framed within, the
 * first screen. It doesn't move on hover; hovering only shows titles.
 */
const CameraRig = () => {
    useFrame(({ camera, size }) => {
        camera.position.copy(LOOK_AT).add(CAMERA_OFFSET);
        camera.lookAt(LOOK_AT);

        const screenHeight = Math.min(size.height, window.innerHeight);
        const landscape = size.width >= screenHeight;
        // Fit the room to the first screen; on portrait screens fill the width and
        // let the plain ends of the desk crop
        const fit = landscape ? Math.min(size.width / 16, screenHeight / 9) : size.width / 10.5;
        const ortho = camera as THREE.OrthographicCamera;
        ortho.zoom = ZOOM * fit;
        // Shift the view so the room sits right of centre (wide screens) and in
        // the first screen rather than the middle of the taller canvas
        const shiftX = landscape ? -size.width * SHIFT_RIGHT : 0;
        const shiftY = (size.height - screenHeight) / 2;
        ortho.setViewOffset(size.width, size.height, shiftX, shiftY, size.width, size.height);
        ortho.updateProjectionMatrix();
    });
    return null;
};

// ISOMETRIC OVERLAYS ==========================================================
/*
 * Object titles laid onto each object's front face. Each frame the face's
 * x axis and down direction are projected to the screen and the title gets the
 * matching CSS matrix: sheared to the isometric angle, at a constant on-screen
 * size, staying with the object as the camera moves.
 */
export interface LabelAnchor {
    id       : DeskObjectId;
    position : [number, number, number];   // top-left edge of the object's front face
}

const IsoLabels = ({ labels, labelRefs, hoveredRef }: {
    labels     : LabelAnchor[];
    labelRefs  : MutableRefObject<Record<string, HTMLElement | null>>;
    hoveredRef : MutableRefObject<DeskObjectId | null>;
}) => {
    const [origin, alongX, alongY] = useMemo(() => [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], []);

    useFrame(({ camera, size }) => {
        // Screen position (CSS px) of a world point
        const toScreen = (v: THREE.Vector3) => {
            v.project(camera);
            return { x: ((v.x + 1) / 2) * size.width, y: ((1 - v.y) / 2) * size.height };
        };

        labels.forEach(({ id, position }) => {
            const element = labelRefs.current[id];
            if (!element) return;
            const o = toScreen(origin.set(...position));
            const x = toScreen(alongX.set(position[0] + 1, position[1], position[2]));
            const down = toScreen(alongY.set(position[0], position[1] - 1, position[2]));
            const unit = Math.hypot(down.x - o.x, down.y - o.y);
            const a = (x.x - o.x) / unit;
            const b = (x.y - o.y) / unit;
            element.style.transform = `translate(${o.x}px, ${o.y}px) matrix(${a}, ${b}, 0, 1, 0, 0) translateY(-100%)`;
            element.dataset.visible = String(hoveredRef.current === id);
        });

    });
    return null;
};

// SCENE =======================================================================
interface DeskScene3DProps {
    progressRef : MutableRefObject<number>;
    hoveredRef  : MutableRefObject<DeskObjectId | null>;
    handlers    : ObjectHandlers;
    labels      : LabelAnchor[];
    labelRefs   : MutableRefObject<Record<string, HTMLElement | null>>;
}

export const DeskScene3D = ({ progressRef, hoveredRef, handlers, labels, labelRefs }: DeskScene3DProps) => (
    <>
        <CameraRig />
        <IsoLabels labels={labels} labelRefs={labelRefs} hoveredRef={hoveredRef} />

        <ambientLight intensity={0.8} />
        <hemisphereLight args={["#FFF6E8", "#C9BBA6", 0.55]} />
        <directionalLight
            position={[3, 10, 16]}
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
        <AlexDrawers />
        <Mug />
        <Echo handlers={handlers} />
        <Monitor handlers={handlers} />
        <Keyboard />
        <Mouse />
        <Journals handlers={handlers} />
        <Phone handlers={handlers} />
        <Shelf handlers={handlers} />
        <Plant />
        <ContactShadows position={[0.25, 0.01, 0]} scale={13.5} blur={2.4} opacity={0.35} far={3} />
    </>
);
