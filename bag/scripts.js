let items;
try {
    items = JSON.parse(localStorage.getItem("bag")) || [];
} catch {}

listBag();

function listBag() {
    $("#items").html("");

    if (items.length == 0) {
        $("#login").remove();
        $("#items").html("Sua sacola está vazia");
        return;
    }

    items.forEach((value, index) => {
        $("#items").append(`
            <div class="item">
                <div class="item-description">
                    <span>${value.name}</span>
                </div>
                <div>
                    <div class="price">
                        R$ ${value.price.toFixed(2).replace('.', ',')}
                    </div>
                    <button class="remove-bag" onclick="removeItem(${index})">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        `);
    });
}

function removeItem(index) {
    items.splice(index, 1);
    localStorage.setItem("bag", JSON.stringify(items));
    listBag();
}