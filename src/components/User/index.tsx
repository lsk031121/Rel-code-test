
import styles from '@/components/User/user.module.scss'
import { useFetchPostList, PostData } from '@/hooks/post'
import LoadingBackdrop from '@/components/Backdrop/LoadingBackdrop';
import { useEffect, useMemo, useRef, useState } from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import { useInView } from 'react-intersection-observer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PostDetail from "@/components/PostDetail"
import { useFetchUser } from '@/hooks/user'
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router'
import { queryFilter } from '@/hooks/utils/QueryString';
import useAxios from '@/hooks/fetch';
import axios, { AxiosRequestConfig } from 'axios';
export interface UserDetail {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string
        }
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

const User = () => {
    const { query } = useRouter();
    const id = query.userid as string;
    const [userData, setUserData] = useState<UserDetail>();
    useEffect(() => {
        if (!id) return;
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) => {
            setUserData(response.data);
        });
    }, [id]);
    return (
        <>
            <div className={styles.userCard}>
                <h3 className={styles.center} >
                    User Profile
                </h3>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <h4>{userData?.name}</h4>
                        <p> {userData?.email}</p>
                        <p>{userData?.phone}</p>
                        <p>{userData?.website}</p>
                        <div>
                            <h4>{userData?.company.name}</h4>
                            <p>{userData?.company.catchPhrase}</p>
                            <p>{userData?.company.bs}</p>

                        </div>
                    </div>

                    <div className={styles.address}>
                        <h4>Address:</h4>
                        <p><strong>Street:</strong> {userData?.address.street}</p>
                        <p><strong>Suite:</strong> {userData?.address.suite}</p>
                        <p><strong>City:</strong> {userData?.address.city}</p>
                        <p><strong>Zipcode:</strong> {userData?.address.zipcode}</p>
                        <div className={styles.geo}>
                            <h4>Geo Coordinates:</h4>
                            <p><strong>Latitude:</strong> {userData?.address.geo.lat}</p>
                            <p><strong>Longitude:</strong> {userData?.address.geo.lng}</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )


}

export default User;
