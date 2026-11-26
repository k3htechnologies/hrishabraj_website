export type ProjectStatus = "ongoing" | "upcoming" | "completed";

export interface Project {
    id: string;
    name: string;
    status: ProjectStatus;
    location: string;
    typology: "Residential" | "Commercial";
    bhk: string;
    possession: string;
    tagline: string;
    description: string;
    amenities: string[];
    image: string;
    rera: string;
    featured: boolean;
    brochure?: string;
}

export const PROJECTS: Project[] = [
    {
        id: "forest-front",
        name: "Forest Front",
        status: "ongoing",
        location: "Borivali East",
        typology: "Residential",
        bhk: "1, 2 & 3 BHK",
        possession: "December 2028",
        tagline: "1, 2 & 3 BHK Luxury Residences",
        description:
            "Luxury residences in Borivali East with thoughtfully planned amenities and a well-connected address. Replace this text with the official project description.",
        amenities: ["Infinity pool", "Recreation zones", "Community spaces", "Wellness areas"],
        image: "/assets/projects/forest-front.jpg",
        rera: "To be added (MahaRERA number)",
        featured: true,
    },
    {
        id: "gem-residencies",
        name: "GEM Residencies",
        status: "ongoing",
        location: "Dahisar East",
        typology: "Residential",
        bhk: "2 & 3 BHK",
        possession: "To be announced",
        tagline: "2 & 3 BHK residences in Dahisar East",
        description: "SAMPLE: replace with official project description.",
        amenities: [],
        image: "/assets/img/placeholder.svg",
        rera: "To be added (MahaRERA number)",
        featured: true,
    },
    {
        id: "trident-juhu",
        name: "Trident- Juhu",
        status: "upcoming",
        location: "Juhu",
        typology: "Residential",
        bhk: "3 & 4 BHK",
        possession: "To be announced",
        tagline: "3 & 4 BHK homes in Juhu",
        description: "SAMPLE: replace with official project description.",
        amenities: [],
        image: "/assets/projects/trident-juhu.jpg",
        rera: "To be added (MahaRERA number)",
        featured: true,
    },
    {
        id: "khar-residences",
        name: "Khar Residences",
        status: "ongoing",
        location: "Khar West",
        typology: "Residential",
        bhk: "2 & 3 BHK",
        possession: "To be announced",
        tagline: "2 & 3 BHK homes in Khar West",
        description: "SAMPLE: replace with official project description.",
        amenities: [],
        image: "/assets/img/placeholder.svg",
        rera: "To be added (MahaRERA number)",
        featured: false,
    },
    {
        id: "goregaon-office",
        name: "Premium Office Spaces",
        status: "ongoing",
        location: "Goregaon West",
        typology: "Commercial",
        bhk: "Office",
        possession: "To be announced",
        tagline: "Premium office spaces in Goregaon West",
        description: "SAMPLE: replace with official project description.",
        amenities: [],
        image: "/assets/img/placeholder.svg",
        rera: "To be added (MahaRERA number)",
        featured: false,
    },
    {
        id: "borivali-boutique-office",
        name: "Boutique Office Spaces",
        status: "ongoing",
        location: "Borivali East",
        typology: "Commercial",
        bhk: "Office",
        possession: "To be announced",
        tagline: "Boutique office spaces in Borivali East",
        description: "SAMPLE: replace with official project description.",
        amenities: [],
        image: "/assets/img/placeholder.svg",
        rera: "To be added (MahaRERA number)",
        featured: false,
    },
];

export const LOCATIONS = [
    "Borivali East",
    "Dahisar East",
    "Andheri West",
    "Goregaon West",
    "Bandra West",
    "Khar West",
    "Juhu",
];