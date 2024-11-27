let listProducts = [];

$(document).ready(async () => {
    listProducts = await list();

    showProducts();
    
    $("#slc-order").on('change', function() {
        showProducts();
    });
    $("#search-ipt").on('keyup', function() {
        showProducts();

    })
});

function showProducts() {
    const ipt = $("#search-ipt").val().toLowerCase();
    let arraySorted = listProducts.filter(item => item.name.toLowerCase().indexOf(ipt) != -1);

    switch (Number($("#slc-order").val())) {
        case 1:
            arraySorted = arraySorted.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
            break;
        case 2:
            arraySorted = arraySorted.sort((a, b) => {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            });
            break;
        case 3:
            arraySorted = arraySorted.sort((a, b) => {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            });
            break;
        case 4:
            arraySorted = arraySorted.sort((a, b) => {
                if (a.price < b.price) return 1;
                if (a.price > b.price) return -1;
                return 0;
            });
            break;
    }

    $("#products").html("");

    arraySorted.forEach((value, index) => {
        $("#products").append(`
            <div class="product">
                <div class="product-description" onclick=showProduct(${index})>
                    <span>${value.name}</span>
                </div>
                <div>
                    <div class="price">
                        R$ ${parseFloat(value.price).toFixed(2).replace('.', ',')}
                    </div>
                    <button class="add-bag" onclick="addBagProduct(${index})">
                        <i class="fa fa-bag-shopping"></i>
                    </button>
                </div>
            </div>
        `);
    });

    $(".product-description").on('click', () => window.location.href = "../item/index.html");
}

function addBagProduct(index) {
    let bag = [];
    try {
        bag = JSON.parse(localStorage.getItem("bag")) || [];
    } catch {}

    bag.push(listProducts[index]);
    
    localStorage.setItem('bag', JSON.stringify(bag));

    $("#notifications").append(`<div>Produto adicionado a sacola!</div>`);
    setTimeout(() => $("#notifications div").eq(0).remove(), 1500);
}

function showProduct(index) {
    localStorage.setItem('itemShow', JSON.stringify(listProducts[index]));
}