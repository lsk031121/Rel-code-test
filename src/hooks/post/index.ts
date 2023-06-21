import useAxios, { Props } from '@/hooks/fetch';

export interface PostData {
    userId: number
    id: number;
    title: string;
    body: string;
}

export interface PostDetail {
    postId: number
    id: number;
    name: string;
    email: string;
    body: string;
}


export const useFetchPostList = () => {
    const axiosConfig: Props = {
        method: 'GET',
        url: 'https://jsonplaceholder.typicode.com/posts',
    };

    return useAxios<PostData[]>(axiosConfig);
};

export const useFetchPostComment = (id:number) => {
    const axiosConfig: Props = {
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/comments?postId=${id}`,
    };

    return useAxios<PostDetail[]>(axiosConfig);
};



export default useFetchPostList;