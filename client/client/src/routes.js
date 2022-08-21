import { Navigate } from 'react-router-dom';
import { Create, HomePage, Layout, Login, Post, Profile } from './components';

const routes = (props) => {
    if (props.user)
        return [
            {
                path: '/',
                element: (
                    <Layout
                        load={props.load}
                        setLoad={props.setLoad}
                        setUser={props.setUser}
                        user={props.user}
                        drawerOpen={props.drawerOpen}
                        toggleDrawer={props.toggleDrawer}
                
                    />
                ),
                children: [
                    { path: '/home', element: <HomePage /> },
                    { path: '/create', element: <Create /> },
                    { path: '/user/:id', element: <Profile user={props.user} /> },
                    { path: '/post/:id', element: <Post user={props.user} /> },
                    { path: '/profile', element: <Profile user={props.user} /> },
                    { path: '/', element: <Navigate to="/home" replace /> },
                    { path: '*', element: <Navigate to='/home' replace /> },
                    
                ],
            },
        ];
    if (props.load)
        return [
            {
                path: '/',
                element: (
                    <Layout
                        load={props.load}
                        setLoad={props.setLoad}
                        setUser={props.setUser}
                        user={props.user}
                        drawerOpen={props.drawerOpen}
                        toggleDrawer={props.toggleDrawer}
                    />
                ),
                children: [
                    {
                        path: '*',
                        element: <Login setUser={props.setUser} load={props.load} setLoad={props.setLoad} />
                    },
                    {
                        path: '/',
                        element: <Login setUser={props.setUser} load={props.load} setLoad={props.setLoad} />
                    },
                ],
            },
        ];
    return [
        {
            path: '/',
            element: (
                <Layout
                    load={props.load}
                    setLoad={props.setLoad}
                    setUser={props.setUser}
                    user={props.user}
                    drawerOpen={props.drawerOpen}
                    toggleDrawer={props.toggleDrawer}
            
                />
            ),
            children: [
                { path: '/home', element: <HomePage /> },
                
                { path: '/user/:id', element: <Profile user={props.user} /> },
                { path: '/post/:id', element: <Post user={props.user} /> },
                { path: '/profile', element: <Profile user={props.user} /> },
                { path: '/login', element: <Login setUser={props.user} setLoad={props.setLoad} /> },
                { path: '/', element: <Navigate to="/home" replace /> },
                { path: '*', element: <Navigate to='/home' replace /> },
                
            ],
        },
    ];
};
export default routes;