import { allExperiences } from "@/.content-collections/generated";
import PageTitle from "@/app/components/page-title";
import ExperienceCards from "@/app/components/experience-cards";

const Page = async () => {
    const title = "Experience";
    const description = "A timeline of my hands-on experience, projects, and the technologies I’ve worked with."

    return (
        <>
            <PageTitle title={title} description={description} />
            <ExperienceCards experiences={allExperiences}/>
        </>
    )
};

export default Page;