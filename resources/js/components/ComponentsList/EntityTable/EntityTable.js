import React, {useEffect} from "react";
import {
    Backdrop, CircularProgress,
    Container, Snackbar,
} from "@material-ui/core";
import store from "../../../redux/store";
import TableRow from "./TableRow";
import {removeProduct} from "../../../redux/actions/cartAction";
import {closeAlert} from "../../../redux/actions/alertAction";
import {useStyles} from "./Constants";
import {Alert} from "@material-ui/lab";
import {connect} from "react-redux";
import './style.css';


function EntityTable(props) {
    const [searchProduct, setSearchProduct] = React.useState([]);
    const classes = useStyles();
    const [load, setLoad] = React.useState(false);

    const deleteProductHandler = (id) => {
        axios.delete(`/api/product/delete/${id}`).then(response => {
            store.dispatch(removeProduct(id));
            setSearchProduct(searchProduct.filter(item => item.product_id !== id));
        })
    }
    useEffect(() => {
        getAllProduct();
    }, [])

    const searchQuery = (event) => {
        if (!event.target.value.trim().length) {
            getAllProduct();
            return;
        }
        axios.get(`/api/product/search/${event.target.value.trim()}`)
            .then(response => {
                setLoad(false);
                setSearchProduct(response.data);
            })
    }

    const getAllProduct = () => {
        axios.get('/api/product/all')
            .then(response => {
                setSearchProduct(response.data);
            })
    }

    const closeAlerHandler = () => {
        store.dispatch(closeAlert());
    }
    return (
        <>
            <Container>
                <div className='search-input-block'>
                    <input placeholder='Укажите наименование продукта' className='cart-input' onChange={searchQuery}/>
                </div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Количество</th>
                        <th scope="col">Цена</th>
                        <th scope="col">Обновить</th>
                        <th scope="col">Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        searchProduct.map((row, i) => (<TableRow eventDelete={deleteProductHandler} key={i} {...row}/>
                        ))
                    }
                    </tbody>
                </table>
                <Snackbar open={props.state.state} autoHideDuration={6000} onClose={closeAlerHandler}>
                    <Alert onClose={closeAlerHandler} severity={props.state.type}>
                        {props.state.text}
                    </Alert>
                </Snackbar>
            </Container>
            <Backdrop className={classes.backdrop} open={load}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>

    )
}

const mapStateToProps = store => ({
    state: store.alertReducer
})
export default connect(mapStateToProps)(EntityTable)

