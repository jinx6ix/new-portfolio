import PageClient from "./page.client"

export const metadata = {
  title: "Ian Iraya | Web Developer, Cybersecurity Expert & SEO Manager | Kenya",
  description:
    "Professional portfolio of Ian Iraya - Web Developer, Cybersecurity Expert, and SEO Manager based in Kiambu, Kenya. 10+ projects in web development, cybersecurity, and SEO. Free website hosting services available.",
  keywords:
    "web developer Kenya, cybersecurity expert, SEO manager, website hosting, Kiambu, Githunguri, web development services, security audit, SEO optimization",
  openGraph: {
    title: "Ian Iraya | Web Developer, Cybersecurity Expert & SEO Manager",
    description: "Professional portfolio showcasing expertise in web development, cybersecurity, and SEO.",
    url: "https://ianiraya.com",
  },
}

export default function PageServer() {
  return <PageClient />
}
