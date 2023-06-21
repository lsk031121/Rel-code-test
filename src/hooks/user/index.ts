
import useAxios, { Props } from '@/hooks/fetch';

export interface UserDetail {
  id: number;
  name: string;
  username: string;
  email: string;
  address:{
    street:string;
    suite:string;
    city:string;
    zipcode:string;
    geo:{
      lat:string;
      lng:string
    }
  }
  phone:string;
  website:string;
  company:{
    name:string;
    catchPhrase:string;
    bs:string;
  }
}
export const useFetchUser = (id:number) => {
  const axiosConfig: Props = {
      method: 'GET',
      url: `https://jsonplaceholder.typicode.com/users?id=${id}`,
  };

  return useAxios<UserDetail[]>(axiosConfig);
};