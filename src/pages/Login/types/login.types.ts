export interface PortalItem {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    status: "coming-soon" | "live";
    url?: string;
}