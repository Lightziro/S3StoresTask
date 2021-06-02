export const validateForm = (data) => {
    const valid = {
        quantity: new RegExp(/^\d+$/),
        price: new RegExp(/^\d{1,10}\.?\d{0,2}$/),
    }
    let messageError = '';
    for (let props in data) {
        switch (props) {
            case 'image':
                if (!data[props]) {
                    messageError = "Выберите изображение продукта";
                }
                break;
            case 'name':
                if (data[props].trim().length < 3) {
                    messageError = "Наименование продукта должно содержать более 3-х символов";
                }
                break;
            case 'quantity':
                if (!(valid.quantity.test(data[props]) && data[props] >= 1)) {
                    console.log('TEST');
                    messageError = "Поле 'Количество' не корректно заполнено";
                }
                break;
            case 'price':
                if (!(valid.price.test(data[props]) && data[props] > 0)) {
                    messageError = "Поле 'Цена' не корректно заполнено";
                }
                break;
        }
        if (messageError) return messageError;
    }
    return true;
}

export const defaultData = {
    image: '',
    name: '',
    description: '',
    quantity: 1,
    price: 0,
}

export const getUrl = id => {
    return (id) ? '/api/product/update' : '/api/product/add'
}
