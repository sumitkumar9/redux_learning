import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { fetchUser } from './userSlice';

export const UserView = () => {
    const user = useAppSelector((state) => state.user);
    console.log(" user",user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUser())
    }, [])
  return (
    <div>
        <h2>List of Users</h2>
        {
            user.loading && <div>Loading...</div>
        }
        {
            !user.loading && user.error ? <div>{user.error}</div>: null
        }
        {
            !user.loading && user.user.length ? (
                <ul>
                    {
                        user.user.map((user) => {
                            return <li key={user.id}>{user.name}</li>
                        })
                    }
                </ul>
            ): null
        }
    </div>
  )
}
