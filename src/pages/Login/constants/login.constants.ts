import { isDevelopment } from "@/app/config";
import type { PortalItem } from "../types/login.types";

const DEV_ERP_URL = 'http://10.8.2.7:411';
const PROD_ERP_URL = 'https://erp.k3htechnologies.com';
const DEV_LOGIN_BASE_ROUTE = 'http://10.8.2.9:480/login';
const PROD_LOGIN_BASE_ROUTE = 'https://portal.k3htechnologies.com/login';

export const PORTALS: PortalItem[] = [
    {
        id: "employee",
        eyebrow: "WORKSPACE",
        title: "Employee Login",
        description: "Access employee workspace and internal resources.",
        buttonLabel: "OPEN EMPLOYEE PORTAL",
        status: "live",
        url: isDevelopment() ? DEV_ERP_URL : PROD_ERP_URL,
    },
    {
        id: "customer",
        eyebrow: "CUSTOMER CORNER",
        title: "Customer Portal",
        description: "View property details, payment schedules, and project updates.",
        buttonLabel: "OPEN CUSTOMER PORTAL",
        status: "coming-soon",
        url: isDevelopment()
            ? `${DEV_LOGIN_BASE_ROUTE}?role=CUSTOMER`
            : `${PROD_LOGIN_BASE_ROUTE}?role=CUSTOMER`,
    },
    {
        id: "vendor",
        eyebrow: "VENDOR'S CONNECT",
        title: "Vendor Portal",
        description: "Manage vendor onboarding, tenders, invoices, and documentation.",
        buttonLabel: "OPEN VENDOR PORTAL",
        status: "coming-soon",
        url: isDevelopment()
            ? `${DEV_LOGIN_BASE_ROUTE}?role=VENDOR`
            : `${PROD_LOGIN_BASE_ROUTE}?role=VENDOR`,
    },
    {
        id: "cp",
        eyebrow: "C.P PORTAL",
        title: "Channel Partner Login",
        description: "Track leads, site visits, bookings, and channel partner commissions.",
        buttonLabel: "OPEN C.P PORTAL",
        status: "coming-soon",
        url: isDevelopment()
            ? `${DEV_LOGIN_BASE_ROUTE}?role=CP`
            : `${PROD_LOGIN_BASE_ROUTE}?role=CP`,
    },
    {
        id: "consultant",
        eyebrow: "CONSULTANT HUB",
        title: "Consultant Login",
        description: "Collaborate on architectural drawings, approvals, and project workflows.",
        buttonLabel: "OPEN CONSULTANT PORTAL",
        status: "coming-soon",
        url: isDevelopment()
            ? `${DEV_LOGIN_BASE_ROUTE}?role=ARCHITECT`
            : `${PROD_LOGIN_BASE_ROUTE}?role=ARCHITECT`,
    },
];