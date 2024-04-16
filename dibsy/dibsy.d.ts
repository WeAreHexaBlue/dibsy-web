export interface Content {
    id: number,
    type: ContentType,
    signed: string
}

export interface Media extends Content {
    bytes: string,
    format: string,

    alt: string,
    ai: boolean
}

export interface Comment extends Content {
    content: string,

    attachments?: Media[],

    replies: Comment[],

    author: User
}

export interface Repost extends Content {
    origin: Post,
    quote?: string,

    author: User
}

export interface Post extends Content {
    type: PostType,

    title?: string,
    content?: string,

    attachments?: Media[]

    tags?: string[],

    comments: Comment[],

    author: User
}

export interface Profile extends Content {
    name: string,

    avatar: Media,
    banner?: Media,

    bio?: string,
    pronouns?: string[],
    url?: string,

    user: User
}

export interface User extends Content {
    username: string,
    password: string,

    bot: boolean,

    profile: Profile,
    posts: Post[],
    comments: Comment[]
}

export enum ContentType {
    USER,
    PROFILE,
    POST,
    REPOST,
    COMMENT,
    MEDIA
}

export enum PostType {
    TEXT,
    IMAGE,
    VIDEO,
    AUDIO
}