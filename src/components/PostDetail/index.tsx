"use client"
import styles from '@/components/PostDetail/postdetail.module.scss'
import { PostData, useFetchPostComment } from '@/hooks/post'
import { useFetchUser } from "@/hooks/user"
import LoadingBackdrop from '@/components/Backdrop/LoadingBackdrop';
import { useEffect, useRef, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
interface ModalProps {
    open: boolean;
    data: PostData;
    handleClose(): void;
}
const PostDetail = (props: ModalProps) => {
    const { open, data, handleClose } = props;
    const [postId, setPostId] = useState({ postID: data.id, userID: data.userId });
    const { data: userData, error: userError, loaded: userLoaded } = useFetchUser(postId.userID);
    const { data: postDetailData, error: postDetailError, loaded: postDetailLoaded } = useFetchPostComment(postId.postID);


    if (!postDetailLoaded) {
        return (
            <>
                <LoadingBackdrop open={!postDetailLoaded} />
            </>
        )
    }
    if (postDetailData == null) {
        return (
            <h1>No Data</h1>
        )
    }

    if (userData == null) {
        return (
            <h1>No Data</h1>
        )
    }

    console.log(userData)


    return (
        <>
            <Modal
                className={styles.modalContainer}
                open={open}
                onClose={handleClose}
                sx={{ overflowY: 'scroll' }} disableScrollLock={false}
            >
                <Box className={styles.body}>

                    <Typography variant="h4" sx={{ mb: "1.75rem" }}>
                        {data.title}
                    </Typography>
                    <Box>
                        <Link href={`/user?userid=${userData[0].id}`}>
                            {userData[0].name}
                        </Link>
                    </Box>
                    <Typography sx={{ mt: 2,fontSize:"13px" }}>
                        {userData[0].email}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {data.body}
                    </Typography>


                    <Box className={styles.commentContainer}>
                        {postDetailData?.map((data, i) => {
                            return (
                                <Box className={styles.commentBox} key={i} >
                                    <Box >
                                        <AccountCircleIcon className={styles.icon} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h6">
                                            {data.name}
                                        </Typography>
                                        <Typography sx={{ m: "7px 0", fontSize: "13px" }}>
                                            {data.email}
                                        </Typography>
                                        <Typography variant="inherit">
                                            {data.body}
                                        </Typography>
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>

                </Box>
            </Modal>
        </>
    )


}

export default PostDetail;
