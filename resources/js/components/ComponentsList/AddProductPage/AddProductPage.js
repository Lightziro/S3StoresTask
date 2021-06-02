import React, {useEffect} from "react";
import {Box, Container, Grid, Snackbar, Typography} from "@material-ui/core";
import './style.css';
import DropFile from "../DropFile/DropFile";
import {useParams} from "react-router";
import {Alert} from "@material-ui/lab";
import {connect} from "react-redux";
import store from "../../../redux/store";
import {closeAlert, showError} from "../../../redux/actions/alertAction";
import {addProduct, updateProduct} from "../../../redux/actions/cartAction";
import {useHistory} from "react-router-dom";
import {defaultData, getUrl, validateForm} from "./Constants";

function AddProductPage(props) {
    const [dataProduct, setDataProduct] = React.useState(defaultData);
    const {id} = useParams();
    const history = useHistory();

    const onSubmit = () => {
        const checkValid = validateForm(dataProduct)
        if (typeof checkValid !== "boolean") {
            store.dispatch(showError(checkValid));
            return;
        }
        const form = convertFormData(dataProduct);
        axios.post(getUrl(id), form)
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
                            changeData(false, {[props]: response.data[props]});
                        })
                    }
                });
        }
    }, [])
    const closeAlerHandler = () => {
        store.dispatch(closeAlert());
    }
    const changeData = (event, obData) => {
        if (obData) {
            setDataProduct((prevState) => {
                // Object.assign также будет работать
                return { ...prevState, ...obData }
            })
            return;
        }
        setDataProduct({...dataProduct, ...{[event.target.name]: event.target.value}});
    }

    return (
        <div>
            <Container>
                <Box mb={2}>
                    <Typography variant={'h4'} align={"center"}>
                        Форма {id ? 'обновления' : 'добавления'} товара
                    </Typography>
                    <Typography variant='body2' align='center'>
                        Для {id ? 'обновления' : 'добавления'} продукта должны быть заполнены поля: название,
                        количество, фото, цена
                    </Typography>
                </Box>
                <Grid container justify='center' alignItems='center' direction='column'>
                    <Box width='50%'>
                        <DropFile picture={dataProduct.image}
                                  setPicture={changeData}
                        >
                        </DropFile>
                        <Typography variant='h6' align='left'>Наименование товара:</Typography>
                        <input onChange={(event) => changeData(event)}
                               autoComplete='off'
                               className='cart-input'
                               value={dataProduct.name}
                               name='name'
                        />
                        <Typography variant='h6' align='left'>Описание товара:</Typography>
                        <textarea value={dataProduct.description}
                                  autoComplete='off'
                                  className='cart-input'
                                  onChange={(event) => changeData(event)}
                                  name='description'
                        />
                        <Typography align='left' variant='h6'>Количество:</Typography>
                        <input autoComplete='off'
                               min={0}
                               type='number'
                               className='cart-input'
                               onChange={(event) => changeData(event)}
                               value={dataProduct.quantity}
                               name='quantity'
                        />
                        <Typography align='left' variant='h6'>Цена:</Typography>
                        <input autoComplete='off'
                               onChange={(event) => changeData(event)}
                               className='cart-input'
                               value={dataProduct.price}
                               name='price'
                        />
                        <button onClick={onSubmit} type='submit' className='btn-add-item'>
                            {id ? 'Обновить товар' : 'Добавить товар'}
                        </button>
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
