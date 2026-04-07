import Mdx from '@/app/components/mdx/mdx';
import PageTitle from '@/app/components/page-title';
import { allPages } from 'content-collections'
import { notFound } from 'next/navigation';


const Page = async () => {
    const title = "About";
    const description = "👋 Hi there! I am Nelson Lai, a student who loves web development.";
    const page = allPages.find((p) => p.slug === "about");

    if (!page) {
        return notFound()
    }

    const { code } = page

    return (
        <>
            <PageTitle title={title} description={description} />
            <Mdx code={code} />
        </>
    )
};

export default Page;