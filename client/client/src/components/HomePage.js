import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CircularProgress,
    Box,
    Typography
} from '@mui-material';
import { Masonry } from '@mui-lab';
import DisplayPost from './DisplayPost';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getPosts = () => {
        axios
            .get('/api/posts/all')
            .then(res => {
                setIsLoading(false);
                console.log(res);
                setPosts(res.data.posts);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error);
            });
    };
    useEffect(() => {
        document.title = "Home";
        getPosts();
    }, []);
    return (
        <Box style={{ width: "100%" }}>
            {!isLoading && (
                <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                    {posts.map((post, index) => {
                        return <DisplayPost post={post} key={"post-" + index} />;
                    })}
                </Masonry>
            )}
            {isLoading && (
                <Box>
                    <CircularProgress />
                </Box>
            )}
            {!isLoading && posts.length === 0 && (
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "200" }}>
                        {"You do not have any posts yet !!!"}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default HomePage;