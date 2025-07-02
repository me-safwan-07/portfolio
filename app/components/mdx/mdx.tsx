import { useMDXComponent } from '@content-collections/mdx/react'
import Link from 'next/link';

import { CodeBlock, Kbd } from '@/packages/ui';
import { BlurImage } from '../ui/blur-image';
import ImageZoom from '../image-zoom';

import Heading from './heading';
import Table from './table';
import ItemGrid from './item-grid';
import Video from './video';
import LinkCard from './link-card';
import Logo from './logo';
import TreeView from './tree-view';

type MdxProps = {
    code: string;
}

const components = {
    h2: (props: React.ComponentProps<'h2'>) => <Heading as='h2' {...props} />,
    h3: (props: React.ComponentProps<'h3'>) => <Heading as='h3' {...props} />,
    h4: (props: React.ComponentProps<'h4'>) => <Heading as='h4' {...props} />,
    h5: (props: React.ComponentProps<'h5'>) => <Heading as='h5' {...props} />,
    h6: (props: React.ComponentProps<'h6'>) => <Heading as='h6' {...props} />,
    a: (props: React.ComponentProps<'a'>) => {
        const { children, href, ...rest } = props;

        // Only render Link if href exists, otherwise fallback to <a>
        if (href) {
            return (
                <Link
                    href={href}
                    className='hover:text-foreground text-anchor no-underline transition-colors'
                    {...rest}
                >
                    {children}
                </Link>
            );
        }

        return (
            <a
                className='hover:text-foreground text-anchor no-underline transition-colors'
                {...rest}
            >
                {children}
            </a>
        );
    },
    Image: (props: React.ComponentProps<typeof BlurImage>) =>{
        const {alt, ...rest} = props;

        return (
            <>
                <ImageZoom>
                    <BlurImage className='rounded-lg border' alt={alt} {...rest} />
                </ImageZoom>
                <figcaption className='mt-4 text-center'>{alt}</figcaption>
            </>
        )
    },
    pre: CodeBlock,

    // Custom components
    Table,
    ItemGrid,
    Video,
    LinkCard,
    Logo,
    TreeView,
    Kbd,
}

const Mdx = (props: MdxProps) => {
    const { code } = props;
    const MDXContent = useMDXComponent(code);

    return (
        <div className="prose w-full">
            <MDXContent components={components} />
        </div>
    );
};

export default Mdx;