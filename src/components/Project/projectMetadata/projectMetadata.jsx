import Image from 'next/image';
import Link from 'next/link';
import { Github, Radio } from 'lucide-react';

const ProjectMetadata = ({ project }) => {
    return (
        <>
            <div className="flex flex-wrap gap-2 mb-5">
                {project.tech_stack.map((badge, index) => (
                    <Image
                        key={index}
                        src={badge}
                        alt="skill"
                        width={0}
                        height={0}
                        style={{
                            width: 'auto',
                            height: 'auto',
                        }}
                    />
                ))}
            </div>
            <div className="flex flex-col gap-2 mb-5">
                {project.repo_link && (
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#0033A0] dark:hover:text-blue-600">
                        <Github className="h-[1.2rem] w-[1.2rem]" />
                        <Link href={project.repo_link}>Repository</Link>
                    </div>
                )}
                {project.link && (
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#0033A0] dark:hover:text-blue-600">
                        <Radio className="h-[1.2rem] w-[1.2rem]" />
                        <Link href={project.link}>
                            Live Product or Documentation
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProjectMetadata;
