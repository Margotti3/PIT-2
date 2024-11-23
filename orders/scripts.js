$(document).ready(async () => {
    listProducts = await listOrders();

    listProducts.forEach((value, index) => {
        let price = 0;
        console.log(value);
        value.bag.forEach(item => price += item.price);

        $("#table-orders tbody").append(`
            <tr>
                <td>#${(index + 1).toString().padStart(3, '0')}</td>
                <td>R$ ${price.toFixed(2).replace('.', ',')}</td>
                <td>Finalizado</td>
            </tr>
        `)
    });
});