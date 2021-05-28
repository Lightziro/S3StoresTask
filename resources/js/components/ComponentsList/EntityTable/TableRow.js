import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import store from "../../../redux/store";
import {Link, NavLink} from "react-router-dom";

function TableRow(props) {
    return (
        <tr>
            <th scope="row">{props.product_id}</th>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.quantity}</td>
            <td>{props.price}</td>
            <td><Link to={'/UpdateProduct/'+props.product_id}><UpdateIcon/></Link></td>
            <td><DeleteIcon onClick={() => props.eventDelete(props.product_id)}/></td>
        </tr>
    )
}
export default TableRow;
