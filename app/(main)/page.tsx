import AboutMe from "../components/home/about-me";
import GetInTouch from "../components/home/get-in-touch";
import Hero from "../components/home/hero";
import SelectedProjects from "../components/selected-projects";

const Page = () => {

    return (
        <>
            <Hero />
            <SelectedProjects />
            <AboutMe />
            <GetInTouch />
        </>
    )
};

export default Page;