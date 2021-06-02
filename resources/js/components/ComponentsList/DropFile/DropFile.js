import React from "react";
import Dropzone from "react-dropzone";
import {Box, Button, Grid, Typography} from "@material-ui/core";
import './style.css';
import ImageDropBox from "./ImageDropBox";

export default function DropFile(props) {

    const fileHandler = (file) => {
        props.setPicture(false, {image: file});
    }

    return (<Dropzone maxFiles={1}
                      onDrop={(fileInfo) => fileHandler(fileInfo[0])}
                      accept='image/jpeg, image/png'
                      name='image'
                      noDrag={true}
    >
        {({getRootProps, getInputProps}) => (
            <section>
                <div className='drop-zone' {...getRootProps()}>
                    {!props.picture && <input {...getInputProps()} />}
                    <Box width='100%'>
                        <Typography variant='h6'
                                    align={"center"}>{!props.picture ? 'Выберите фотографию' : 'Фотография продукта'}</Typography>
                        <Box mt={1}>
                            {
                                !props.picture
                                    ? (<Grid container justify='center'>
                                        <label htmlFor="contained-button-file">
                                            <Button variant="contained" color="primary" component="span">
                                                Загрузить фото
                                            </Button>
                                        </label>
                                    </Grid>)
                                    : <ImageDropBox {...props}/>
                            }
                        </Box>
                    </Box>
                </div>
            </section>
        )}
    </Dropzone>)
}

