import Image from 'next/image';
import Link from 'next/link';
import { Github, Radio, Loader2, ArrowRight, CalendarDays } from 'lucide-react';
import { Suspense } from 'react';
import path from 'path';
import fs from 'fs/promises';
import ProjectCard from '../projectCard/projectCard';

const PROJECT_FETCH_LIMIT = 100;
const DATA_ATTRS_DIR = path.join(process.cwd(), 'data', 'project');
const DATA_ATTRS_FILE = path.join(DATA_ATTRS_DIR, 'projects.json');

// * Fetch projects from file system
const getProjects = async (limit) => {
    try {
        // Read project data from JSON file
        const projectsData = await fs.readFile(
            path.join(DATA_ATTRS_FILE),
            'utf-8'
        );
        const projects = JSON.parse(projectsData);
        return projects.slice(0, limit);
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw new Error('Failed to fetch projects');
    }
};

const Projects = async ({ limit }) => {
    const projects = await getProjects(limit || PROJECT_FETCH_LIMIT);
    return (
        <div className="items-center justify-center mt-20">
            <div className="max-w-xl mx-auto">
                <div className="text-center ">
                    <div className="flex flex-col items-center ">
                        <h1 className="text-5xl font-semibold leading-tight dark:text-white">
                            {' '}
                            Personal{' '}
                            <span className="text-[#0033A0]">
                                Projects
                            </span>{' '}
                        </h1>
                        <div className="flex w-24 mt-1 mb-6 overflow-hidden rounded">
                            <div className="flex-1 h-2 bg-blue-200"></div>
                            <div className="flex-1 h-2 bg-blue-400"></div>
                            <div className="flex-1 h-2 bg-[#0033A0]"></div>
                        </div>
                    </div>
                    <p className="mb-16 text-base text-center text-gray-600">
                        I have worked on these projects in my free time. I have
                        used these projects to learn new technologies and
                        implement new features.
                    </p>
                </div>
            </div>
            <Suspense
                fallback={
                    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                        <Loader2 className="mr-2 h-12 w-12 animate-spin text-[#0033A0]" />
                    </div>
                }
            >
                {/* // same height for all cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {projects.map((project, index) => (
                        // same height for all cards
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </Suspense>
            {/* See More */}
            <div className="flex justify-center mt-8">
                <Link href="/project">
                    <div className="flex flex-row items-center gap-2 text-lg font-semibold hover:text-[#0033A0] dark:hover:text-blue-600 cursor-pointer">
                        See More
                        <ArrowRight className="h-6 w-6" />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Projects;
