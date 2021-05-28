import React, {useEffect} from "react";
import {
    Container, Snackbar,
} from "@material-ui/core";
import {connect} from "react-redux";
import store from "../../../redux/store";
import TableRow from "./TableRow";
import {Alert} from "@material-ui/lab";
import {getProduct, removeProduct} from "../../../redux/actions/cartAction";
import {closeAlert} from "../../../redux/actions/alertAction";


function EntityTable(props) {

    const deleteProductHandler = (id) => {
        axios.delete(`/api/product/delete/${id}`).then(response => {
            store.dispatch(removeProduct(id));
        })
    }
    useEffect(() => {
        if (!props.entityRow.length) {
            axios.get('/api/product/all')
                .then(data => {
                    store.dispatch(getProduct(data.data))
                })
        }
    }, [])

    const closeAlerHandler = () => {
        store.dispatch(closeAlert());
    }
    return (
        <Container>
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
                    props.entityRow.map((row, i) => (<TableRow eventDelete={deleteProductHandler} key={i} {...row}/>
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

    )
}

const mapStateToProps = store => ({
    entityRow: store.cartReducer.products,
    state: store.alertReducer
})
export default connect(mapStateToProps)(EntityTable)

