"use client"
import styles from '@/src/app/page.module.scss'
import useFetchPostList from '@/hooks/post'
import PostList from "@/components/PostList"


import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import User from '@/components/User'
import { useRouter } from 'next/router'

const UserPage: NextPage = () => {

    return (
        <div className={styles.container}>
            <User />
        </div>
    )
}

export default UserPage
