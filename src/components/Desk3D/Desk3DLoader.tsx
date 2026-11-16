"use client";

// EXTERNAL DEPS ===============================================================
import dynamic from "next/dynamic";

// three.js needs the browser (WebGL), so the scene only loads client-side
const Desk3D = dynamic(() => import("./Desk3D"), {
    ssr     : false,
});

export const Desk3DLoader = () => <Desk3D />;
