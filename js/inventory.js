function change_selected_item(element){
    let list = document.querySelectorAll('.inventory_content div');
    for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('active');
    }
    element.classList.add('active');
}

function init_items(object){
    let items = object.items
    for (let i = 0; i < items.length; i++) {
        add_item(items[i]);
    }
}

function add_item(object){
    let name = object.name
    let apparel = object.apparel;
    let material_id = object.material_id;
    let container = document.querySelector('.inventory_content');
    let element = document.createElement('div');
    element.innerHTML = name;
    element.dataset.apparel = apparel;
    element.dataset.material_id = material_id;
    element.onclick = function (){change_selected_item(this);}
    container.appendChild(element);
}

function delete_item(){
    document.querySelector('.inventory_content div.active').remove();
}

function send_item_2_equip(){
    let item = document.querySelector('.inventory_content .active');
    ue4('equip', {
        'name' : item.textContent,
        'apparel' : item.dataset.apparel,
        'material_id' : parseInt(item.dataset.material_id)
    });
}
