import { WebSite, WithContext } from "schema-dts";
import AboutMe from "../components/home/about-me";
import GetInTouch from "../components/home/get-in-touch";
import Hero from "../components/home/hero";
import LatestArticles from "../components/home/latest-articles";
import SelectedProjects from "../components/selected-projects";
import { SITE_KEYWORDS, SITE_NAME, SITE_URL, SITE_DESCRIPTION, SITE_TITLE } from "../lib/constants";
import { SelectedExperience } from "../components/selected-experience";
import Services from "../components/home/services";
import FAQ from "../components/home/faq";
import { 
    generatePersonSchema, 
    generateProfessionalServiceSchema, 
    generateBreadcrumbSchema, 
    generateWebSiteSchema,
    generateFAQSchema
} from "@/app/lib/seo";

export const generateMetadata = async () => {
    return {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        alternates: {
            canonical: SITE_URL
        },
        openGraph: {
            url: SITE_URL,
            title: SITE_TITLE,
            description: SITE_DESCRIPTION,
            type: 'website'
        },
        twitter: {
            title: SITE_TITLE,
            description: SITE_DESCRIPTION
        }
    }
}

const faqs = [
    {
        question: 'What services does Muhammed Safwan offer?',
        answer: 'I offer comprehensive web development services including Full Stack Development, Frontend & Backend Development, SaaS Development, API Development, Business Websites, Landing Pages, Portfolio Websites, E-commerce Development, and Website Maintenance. I specialize in React, Next.js, TypeScript, and the MERN stack.'
    },
    {
        question: 'What technologies does Muhammed Safwan use?',
        answer: 'I primarily work with modern web technologies including React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, Prisma, Tailwind CSS, and various other tools in the JavaScript ecosystem. I stay updated with the latest industry best practices and frameworks.'
    },
    {
        question: 'How can I hire Muhammed Safwan for a project?',
        answer: 'You can reach out to me via email at mesafwan07@gmail.com or connect with me through my social profiles on GitHub, LinkedIn, or X (Twitter). I am available for freelance projects, contract work, and full-time opportunities.'
    },
    {
        question: 'Where is Muhammed Safwan based?',
        answer: 'I am based in Bengaluru (Bangalore), Karnataka, India. I work with clients globally and am comfortable collaborating across different time zones through remote communication tools.'
    },
    {
        question: 'What is Muhammed Safwan\'s experience in web development?',
        answer: 'I started my web development journey in early 2024 and have since built multiple projects using modern technologies. I have hands-on experience building full-stack applications, SaaS platforms, and professional business websites. My portfolio showcases my best work and technical capabilities.'
    },
    {
        question: 'Does Muhammed Safwan take freelance projects?',
        answer: 'Yes, I am available for freelance web development projects. Whether you need a new website, a web application, SaaS platform, or improvements to an existing project, I can help. Feel free to reach out to discuss your requirements and get a quote.'
    }
]

const Page = () => {
    const webSiteSchema = generateWebSiteSchema();
    const personSchema = generatePersonSchema();
    const professionalServiceSchema = generateProfessionalServiceSchema();
    const breadcrumbSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }]);
    const faqSchema = generateFAQSchema(faqs);
  
    return (
        <div className="flex flex-col">
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
            />
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
            />
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            
            <Hero />
            <SelectedExperience />
            <AboutMe />
            <Services />
            <SelectedProjects />
            <LatestArticles />
            <FAQ />
            <GetInTouch />
        </div>
    )
};

export default Page;