import { WebSite, WithContext } from "schema-dts";
import AboutMe from "../components/home/about-me";
import GetInTouch from "../components/home/get-in-touch";
import Hero from "../components/home/hero";
import LatestArticles from "../components/home/latest-articles";
import SelectedProjects from "../components/selected-projects";
import { SITE_GITHUB_URL, SITE_INSTAGRAM_URL, SITE_KEYWORDS, SITE_NAME, SITE_URL, SITE_X_URL, SITE_YOUTUBE_URL } from "../lib/constants";

const Page = () => {

    const jsonLd: WithContext<WebSite> = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: "Muhammed Safwan - A Full Stack Developer",
        description: "Muhammed Safwan • 20 y/o • Student • Full Stack Developer",
        url: SITE_URL,
        author: {
        '@type': 'Person',
        name: SITE_NAME,
        url: SITE_URL,
        sameAs: [SITE_INSTAGRAM_URL, SITE_X_URL, SITE_GITHUB_URL, SITE_YOUTUBE_URL]
        },
        mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': SITE_URL
        },
        inLanguage: 'en',
        copyrightYear: new Date().getFullYear(),
        keywords: SITE_KEYWORDS,
        dateCreated: '2020-12-05',
        dateModified: new Date().toISOString()
    }
  
    return (
        <>
            <script
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero />
            <SelectedProjects />
            <AboutMe />
            <LatestArticles />
            <GetInTouch />
        </>
    )
};

export default Page;