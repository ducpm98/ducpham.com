import { gql } from '@apollo/client';
import client from './apollo-client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);

        const username = searchParams.get('username') || 'minhtran241';
        const reposNum = parseInt(searchParams.get('reposNum')) || 6;

        const queryResult = await client.query({
            query: gql`
                query GetGitHubUserInfo($username: String!, $reposNum: Int) {
                    user(login: $username) {
                        name
                        bio
                        company
                        location
                        websiteUrl
                        avatarUrl
                        repositories(
                            first: $reposNum
                            privacy: PUBLIC
                            isFork: false
                            orderBy: { field: PUSHED_AT, direction: DESC }
                        ) {
                            totalCount
                            nodes {
                                name
                                url
                            }
                        }
                        followers {
                            totalCount
                        }
                        following {
                            totalCount
                        }
                        gists {
                            totalCount
                        }
                        contributionsCollection {
                            contributionCalendar {
                                totalContributions
                                colors
                                weeks {
                                    contributionDays {
                                        contributionCount
                                        color
                                        date
                                    }
                                    firstDay
                                }
                                months {
                                    name
                                    year
                                    totalWeeks
                                    firstDay
                                }
                            }
                        }
                    }
                    rateLimit {
                        limit
                        cost
                        remaining
                        resetAt
                    }
                }
            `,
            variables: {
                username,
                reposNum: reposNum,
            },
        });

        return NextResponse.json({
            user: queryResult.data.user,
            rateLimit: queryResult.data.rateLimit,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }
};
