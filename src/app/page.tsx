"use client"
import styles from './page.module.scss'
import useFetchPostList from '@/hooks/post'
import PostList from "@/components/PostList"
import { NextPage } from 'next'

 
const HomerPage: NextPage = ()=> {
  
  return (
    <div className={styles.container}>
         <PostList/>
    </div>
  )
}

export default HomerPage
