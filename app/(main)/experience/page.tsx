import { allExperiences } from "@/.content-collections/generated";
import PageTitle from "@/app/components/page-title";
import { Timeline } from "@/app/components/experience-timeline";

const Page = async () => {
    const title = "Experience";
    const description = "A timeline of my hands-on experience, projects, and the technologies I’ve worked with."

    return (
        <>
            <PageTitle title={title} description={description} />
            <Timeline items={allExperiences} />
        </>
    )
};

export default Page;