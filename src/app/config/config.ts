
export const CONFIG = {
  siteName: "H. Rishabraj",
  legalName: "Rishabraj Estate Developers Private Limited",
  phone: "+91 89897 24545",
  phoneTel: "+918989724545",
  email: "info@hrishabraj.com",
  whatsapp: "918989724545",
  address:
    "13th Floor, H. Rishabraj Chambers, Road No. 10, Daulat Nagar, Borivali (East), Mumbai 400066",
  mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.052078186249!2d72.85942287499431!3d19.236561982001298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b100770734ef%3A0xdde18f271cb1658c!2sRishabraj%20Chambers!5e0!3m2!1sen!2sin!4v1783937220458!5m2!1sen!2sin",
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? "",
  social: {
    instagram: "https://www.instagram.com/accounts/login/?next=%2Fh.rishabrajdevelopers%2F&source=omni_redirect&hl=en",
    facebook: "https://www.facebook.com/H.RishabrajBuilders",
    linkedin: "https://www.linkedin.com/company/hrishabrajgroup/",
    youtube: "https://www.youtube.com/@h.rishabrajgroup6514",
  },
  stats: [
    { value: 15, suffix: "+", label: "Years of excellence" },
    { value: 75, suffix: "+", label: "Projects delivered" },
    { value: 5000, suffix: "+", label: "Families served" },
  ],
} as const;
