import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';

import { CloseRounded } from '@mui/icons-material';

import axios from 'axios';
import Files from 'stripe/lib/resources/Files';

const Create = props=> {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [submitClick, setSubmitClick] = useState(false);
    const previewPaneRef = useRef(null);

    const [data, setData] = useState({ caption: '' });

    const handleFiles = inFiles => {
        if (inFiles.length) {
            const curr = [];
            for (var i = 0; i < inFiles.length; i++) {
                if (inFiles[i].type.startsWith('image/')) curr.push(inFiles[i]);
            }
            setFiles([...Files, ...curr]);
        }
    };
    useEffect(() => {
        console.log({ files });
    }, [files]);

    const handleChange = (element, event) => {
        const curr = { ...data };
        curr[element] = event.target.value;
        setData(curr);
    };
    const submitHandler = () => {
        setSubmitClick(true);
        const formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        formData.append('caption', data.caption);

        axios
            .post('/api/posts', formData)
            .then((res) => {
                console.log(res)
                const id = res.data.post._id;
                navigate(`/post/${id}`);
            })
            .catch((err) => {
                console.log(err);
                setSubmitClick(false);
                alert('Something went wrong!');
            })
         
    };

    useEffect(() => {
        document.title = 'Create Post';
        previewPaneRef?.current?.addEventListener('wheel', event => {
            event.preventDefault();
            previewPaneRef.current.scroffLeft += event.deltaY;
        });
    }, []);
    if (submitClick) {
        return (
            <Box style={{
                height: '100%',
                display: 'flex',
                alignItems: 'centre',
                justifyContent: 'centre',
            }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant='h4' sx={{ mb: 5 }}>
                Create Post
            </Typography>

            <label htmlFor='file=resourse' sx={{ cursor: 'ponter' }}>
                <Box
                    sx={{ borderRadius: 2, bgcolor: 'grey.200', py: 5 }}
                    onDrop={event => {
                        event.preventDefault();
                        if (files) handleFiles(event.dataTranfer.files);
                    }}
                    onDragOver={event => {
                        event.preventDefault();
                    }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ fontWeight: 500 }}>
                            Upload Images
                        </Typography>
                        <Typography sx={{ position: 'relative', bottom: -6 }}>
                            or
                        </Typography>

                    </Box>
                </Box>
            </label>

            <Box style={{ textAlign: 'center', position: 'relative', top: -20 }}>
                <Button
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                        document.getElementById('file-resource').click();
                    }}
                >
                    <Typography
                        variant='h6'
                        sx={{
                            fontWeight: 500,
                            cursor: 'pointer', 
                            color: 'white'
                        }}
                    >
                        Select
                    </Typography>
                </Button>
            </Box>
            <input
                id='file-resource'
                type='file'
                accept='image/*'
                multiple
                hidden
                onChange={event => {
                    handleFiles(event.target.files);
                }}
            />
            <Box
        ref={previewPaneRef}
        style={{
          display: "flex",
          overflow: "auto",
          justifyContent: "flex-start",
        }}
      >
        {files.map((file, index) => {
          return (
            <Box
              key={"image-" + index}
              sx={{ margin: "5px 8px", position: "relative" }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{
                  height: "60px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              />
              <IconButton
                style={{
                  backgroundColor: "rgb(240,0,0)",
                  color: "gold",
                  padding: "0px",
                  position: "absolute",
                  top: -5,
                  right: -5,
                }}
                onClick={() => {
                  const curr = [...files];
                  curr.splice(index, 1);
                  setFiles(curr);
                }}
              >
                <CloseRounded style={{ fontSize: "17px" }} />
              </IconButton>
            </Box>
          );
        })}
        </Box>
            <Box style={{
                display: "flex", marginTop: "20px"
            }}>
            <TextField
                multiline
                variant="outlined"
                fullWidth
                rows={3}
                value={data.caption}
                label="Add caption"
                onChange={(event) => handleChange("caption", event)}
            />
            </Box>
            <Box sx={{ textAlign: 'right' }}>
                <Button
                    color='secondary'
                    sx={{ margin: '20px 10px' }}
                    onClick={() => {
                        setData({
                            caption: '',
                        });
                        setFiles([]);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    color='secondary'
                    variant='contained'
                    sx={{
                        margin: '20px 20px',
                        color:'white'
                    }}
                    onClick={submitHandler}
                    disabled={data?.caption?.trim().length()===0||files?.length===0}
                >
                    Submit
                </Button>
            </Box> 
        </Box>
    );
}

export default Create;