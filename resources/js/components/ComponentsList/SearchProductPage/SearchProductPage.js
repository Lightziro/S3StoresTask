import React, {useEffect} from "react";
import {Backdrop, Box, CircularProgress, Container, Grid, Paper, Typography} from "@material-ui/core";
import ProductCard from "../ProductCard/ProductCard";
import './style.css';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#ffffff',
    },
}));

export default function SearchProductPage() {
    const [search, setSearch] = React.useState('')
    const [productsList, setProductsList] = React.useState([]);
    const [load, setLoad] = React.useState(false);
    const instance = axios.create();
    instance.defaults.timeout = 2500;
    const classes = useStyles();

    const searchQuery = (event) => {
        setSearch(event.target.value.trim());
        if (!event.target.value.trim().length) {
            setProductsList([]);
            return;
        }
        setLoad(true);
        instance.get(`/api/product/search/${event.target.value.trim()}`, {
            timeout: 5000
        })
            .then(response => {
                setLoad(false);
                setProductsList(response.data);
            })
    }

    const clearSearch = () => {
        setSearch([]);
        setProductsList([]);
    }
    return (
        <div>
            <Container>
                <Grid container alignItems='center' justify='center' direction='column'>
                    <Box width='50%'>
                        <Typography variant='h6' align={"center"}>Строка поиска:</Typography>
                        <input value={search} className='cart-input' onChange={searchQuery}/>
                        <button className='btn-search-item' onClick={clearSearch}>Очистить строку поиска</button>
                    </Box>
                    <Grid container alignItems='center' justify='center' direction='row'>
                        {
                            productsList.map((product, i) => <ProductCard key={i} {...product}/>)
                        }
                    </Grid>
                    <Box mt={3}>
                        <Grid container direction='column' justify='center' alignItems='center'>
                            <Paper elevation={3}>
                                <Box p={2}>
                                    <Typography align='center' variant='h5'>
                                        Количество найденных товаров: {productsList.length}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Box>
                </Grid>
            </Container>
            <Backdrop className={classes.backdrop} open={load}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
}
