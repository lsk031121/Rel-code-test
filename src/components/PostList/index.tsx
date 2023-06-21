"use client"
import styles from '@/components/PostList/postlist.module.scss'
import { useFetchPostList, PostData } from '@/hooks/post'
import LoadingBackdrop from '@/components/Backdrop/LoadingBackdrop';
import { useEffect, useRef, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PostDetail from "@/components/PostDetail"
interface ModalState{
    open:boolean;
    postID:number;
}
const PostList = () => {
    const { data: postData, error: postError, loaded: postLoaded, cancel: cancelpost } = useFetchPostList();
    const [visiblePosts, setVisiblePosts] = useState<number>(5);
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });
    const [open, setOpen] = useState<ModalState>({open:true,postID:-1});
    const handleOpen = (number:number) => setOpen({open:true,postID:number});
    const handleClose = () => setOpen({ open: false, postID: -1 });
    useEffect(() => {
        console.log(visiblePosts, postData?.length);
        loadMorePosts();
    }, [inView]);
    const loadMorePosts = () => {
        console.log("set loading")
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 5);
    };
    if (!postLoaded) {
        return (
            <>
                <LoadingBackdrop open={!postLoaded} />
            </>
        )
    }
    if (postData?.length == 0) {
        return (
            <h1>No Data</h1>
        )
    }


    return (
        <>
            {postData?.map((post, i) => {
                while (i <= visiblePosts - 1) {
                    return (
                        <Box className={styles.card} key={i} onClick={() => { handleOpen(i) }}>
                            <Typography variant="h5">
                                {post.title}
                            </Typography>
                            <p className={styles.body}>{post.body.slice(0, 100)}...</p>
                            {/* <p>Author: {post.userId}</p> */}
                        </Box>
                    )
                }

            })}

            <div ref={ref} >
                {postData!.length > visiblePosts && <CircularProgress size={100} thickness={2.4} />}
            </div>
            {open.postID>=0 &&   <PostDetail open={open.open} data={postData![open.postID]} handleClose={handleClose}/>}
          
        </>
    )


}

export default PostList;
