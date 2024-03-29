import { useState } from 'react';
import {
    Avatar,
    Box,
    Card,
    Divider,
    Grid,
    Skeleton,
    Stack,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';

const styles = {
    boxShadow: "0px 0px 15px 5px rgb(160,160,160,0.3)",
    margin: '2%',
    paddingBottom: '0px',
    height: 'auto',
}

const DisplayPost = post => {
    const [loaded, setLoaded] = useState(false);
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                style={styles}
                sx={{ height: '100%', ...styles }}
            >
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 20px',
                        textDecoration: 'none',
                        color: 'black',
                    }}
                    component={Link} to={'/user/' + post.createdBy?._id}
                >
                    <Avatar
                        src={post.createdBy?.img}
                        alt={post.createdBy?.firstName}
                    />
                    <Stack direction='column'>
                        <Typography
                            style={{
                                paddingLeft: '10px',
                                fontWeight: 700,
                                textAlign: 'left',
                            }}
                        >
                            {post.createdBy?.firstname}
                        </Typography>
                        <Typography
                            style={{
                                paddingLeft: '10px',
                                fontWeight: 400,
                                fontSize: '14px'
                            }}
                        >
                            {moment(post?.createdAt).fromNow()}
                        </Typography>
                    </Stack>
                </Box>
                <Divider />
                <Box
                    style={{
                        width: '100%',
                        lineHeight: 0,
                        display: 'block',
                    }}
                    component={Link} to={`post/${post._id}`}
                >
                    <img
                        src={'/api/files/' + post.image[0]}
                        alt={'post'}
                        style={{
                            width: '100%',
                            objectfit: 'contain',
                            display: loaded ? 'block' : 'none',
                        }}
                        onLoad={() => setLoaded(true)}
                    />
                        
                    {!loaded && <Skeleton variant='rectangular' height={100} />}

                </Box>
            </Card>
        
        </Grid>
    );
};
export default DisplayPost;