// COMPONENTS ==================================================================
import { Desk3DLoader } from "@/components/Desk3D/Desk3DLoader";

// TYPES =======================================================================
import type { Metadata } from "next";

// Experimental 3D version of the home page
export const metadata: Metadata = {
    title  : "Geetika Shukla — 3D desk",
    robots : { index: false },
};

export default function Desk3DPage() {
    return (
        <article>
            <Desk3DLoader />
        </article>
    );
}
