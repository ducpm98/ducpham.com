import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, FileCode, Users, User, BookMarked } from 'lucide-react';
import Link from 'next/link';

const detailsData = (data) => {
    return [
        {
            id: 1,
            icon: <BookMarked size={18} />,
            title: 'Public Repos',
            value: data.repositories ? data.repositories.totalCount : 0,
            color: 'pink',
        },
        {
            id: 2,
            icon: <Users size={18} />,
            title: 'Followers',
            value: data.followers ? data.followers.totalCount : 0,
            color: 'green',
        },
        {
            id: 3,
            icon: <User size={18} />,
            title: 'Following',
            value: data.following ? data.following.totalCount : 0,
            color: 'purple',
        },
        {
            id: 4,
            icon: <FileCode size={18} />,
            title: 'Gists',
            value: data.gists ? data.gists.totalCount : 0,
            color: 'yellow', // color for the icon background
        },
    ];
};

const GHUserCard = ({ ghInfo, username, colorTheme = 'blue' }) => {
    return (
        <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex flex-col items-start gap-3">
                {/* Row, 1 col is name and username, 1 cl is Avatar */}
                <div className="flex flex-row items-center justify-center gap-4">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={ghInfo.user.avatarUrl} />
                        <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold">
                            {ghInfo.user.name}
                        </h1>
                        <Link
                            href={`https://github.com/${username}`}
                            target="_blank"
                            className={`text-sm ${
                                colorTheme === 'blue'
                                    ? 'text-[#0033A0] dark:text-blue-600'
                                    : 'text-green-600'
                            }`}
                        >
                            @{username}
                        </Link>
                    </div>
                </div>
                <p className="">{ghInfo.user.bio}</p>
                <div className="flex flex-col gap-1 items-start">
                    <div className="flex flex-row items-center justify-center gap-2">
                        <MapPin size={18} />
                        <span className="text-sm font-semibold">
                            {ghInfo.user.location}
                        </span>
                    </div>
                    {detailsData(ghInfo.user).map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-row items-center justify-center gap-2"
                        >
                            {item.icon}
                            <span className="text-sm font-semibold">
                                {item.value} {item.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GHUserCard;
