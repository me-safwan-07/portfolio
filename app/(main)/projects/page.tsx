import { allProjects } from "@/.content-collections/generated";
import PageTitle from "@/app/components/page-title";
import ProjectCards from "@/app/components/project-cards";

const Page = async () => {
    const title = "Projects";
    const description = "The list of my projects. Everything was made with ❤️."

    return (
        <>
            <PageTitle title={title} description={description} />
            <ProjectCards projects={allProjects}/>
        </>
    )
};

export default Page;