import React, {useEffect} from "react";
import {Box, Container, Grid, Snackbar, Typography} from "@material-ui/core";
import './style.css';
import DropFile from "../DropFile/DropFile";
import {useParams} from "react-router";
import {Alert} from "@material-ui/lab";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {closeAlert} from "../../../redux/actions/alertAction";
import {addProduct, updateProduct} from "../../../redux/actions/cartAction";
import {useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";

function AddProductPage(props) {
    const {register, handleSubmit, watch, formState: {errors}, setValue} = useForm();
    const {id} = useParams();
    const history = useHistory();

    const onSubmit = data => {
        let baseUrl = '/api/product/add';
        if (id) {
            baseUrl = '/api/product/update'
        }
        const form = convertFormData(data);
        axios.post(baseUrl, form)
            .then(response => {
                history.push('/');
                if (id) {
                    store.dispatch(updateProduct(response.data))
                    return;
                }
                store.dispatch(addProduct(response.data));
            });
    }
    useEffect(() => {
        if (id) {
            axios.get(`/api/product/get/${id}`)
                .then(response => {
                    if (response.data) {
                        Object.keys(response.data).forEach(props => {
                            setValue(props, response.data[props]);
                        })
                    }
                });
        }
    }, [])
    const closeAlerHandler = () => {
        store.dispatch(closeAlert());
    }

    return (
        <div>
            <Container>
                <Box mb={2}>
                    <Typography variant={'h4'} align={"center"}>
                        Форма {id ? 'обновления' : 'добавления'} товара
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Для {id ? 'обновления' : 'добавления'} продукта должны быть заполнены поля: название, количество, фото, цена
                    </Typography>
                </Box>
                <Grid container justify='center' alignItems='center' direction='column'>
                    <Box width='50%'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <DropFile picture={watch('image')}
                                      setPicture={setValue}
                                      inputRegister={{...register("image", {required: true})}}>
                            </DropFile>
                            <Typography variant='h6' align='left'>Наименование товара:</Typography>
                            <input autoComplete='off' className='cart-input'
                                   {...register("name", {required: true, minLength: 3, maxLength: 35})}
                            />
                            <Typography variant='h6' align='left'>Описание товара:</Typography>
                            <textarea autoComplete='off' className='cart-input'
                                      {...register("description", {required: false, maxLength: 500})}
                            />
                            <Typography align='left' variant='h6'>Количество:</Typography>
                            <input autoComplete='off' type='number' className='cart-input'
                                   {...register("quantity", {required: true, min: 1, max: 1000})}
                            />
                            <Typography align='left' variant='h6'>Цена:</Typography>
                            <input autoComplete='off' className='cart-input'
                                   {...register("price", {required: true, minLength: 2})}
                            />
                            <button type='submit' className='btn-add-item'>
                                {id ? 'Обновить товар' : 'Добавить товар'}
                            </button>
                        </form>
                    </Box>
                </Grid>
            </Container>
            <Snackbar open={props.state.state} autoHideDuration={1000} onClose={closeAlerHandler}>
                <Alert onClose={closeAlerHandler} severity={props.state.type}>
                    {props.state.text}
                </Alert>
            </Snackbar>
        </div>

    )
}

const mapStateToProps = store => ({
    state: store.alertReducer
})
export default connect(mapStateToProps)(AddProductPage)

const convertFormData = data => {
    let form = new FormData();
    for (const props in data) {
        form.append(props, data[props]);
    }
    return form;
}
