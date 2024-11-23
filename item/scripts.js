let item;
try {
    item = JSON.parse(localStorage.getItem('itemShow')) || {};
} catch {}

$("#item-title").text(item.name);
$("#item-description").text(item.description);