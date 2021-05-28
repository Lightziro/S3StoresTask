import {Button, Grid, Paper} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

export default function ImageDropBox(props) {
    const getPhoto = (photo) => {
        if (!photo) return null;
        return (typeof photo === 'string') ? `http://s3stores.ru/storage/${photo}` : URL.createObjectURL(photo);
    }
    return (
        <div>
            <Paper className='image-box-block' elevation={3} variant='outlined'>
                <Grid alignItems='center' direction='column' container justify='center'>
                    <div className='picture-block'>
                        <img src={getPhoto(props.picture)} className={'image-zone'}></img>
                    </div>
                    <Button fullWidth variant="contained" color="secondary"
                            onClick={() => props.setPicture('image', '')}
                            startIcon={<DeleteIcon/>}
                    >
                        Удалить фото
                    </Button>
                </Grid>
            </Paper>
        </div>
    )
}
