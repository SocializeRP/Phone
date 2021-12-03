window.bank_account_value = 0;

function bank_change_page(id) {
    let pages_list = document.querySelectorAll('.bank_content');
    let btn_list = document.querySelectorAll('.bank_bottom div');
    console.log(pages_list)
    for (let i = 0; i < btn_list.length; i++) {
        if(i === id){
            btn_list[i].classList.add('active');
            pages_list[i].style.display="flex";
        }else{
            btn_list[i].classList.remove('active');
            pages_list[i].style.display="none";
        }
    }
}

function bank_update_pin(pin){
    document.getElementById('bank_pin').innerHTML = pin;
}

function bank_update_amount(amount){
    amount = window.bank_account_value + amount;
    window.bank_account_value = amount;
    document.getElementById('bank_account_amount').innerHTML = formatMoney(amount) + " €";
}

function new_income(name,amount,timestamp = Date.now()){
    let parent = document.querySelector('.bank_history');
    let element = document.createElement('div');
    element.innerHTML="<div><h2>"+ name +"</h2><p>"+ time_to_date(timestamp) +"</p></div><div><h2>"+ formatMoney(amount) +" €</h2><h4 class=\"green\">Income</h4></div>"
    parent.insertBefore(element, parent.firstChild);
    bank_update_amount(amount);
}

function new_payment(name,amount,timestamp = Date.now()){
    let parent = document.querySelector('.bank_history');
    let element = document.createElement('div');
    element.innerHTML="<div><h2>"+ name +"</h2><p>"+ time_to_date(timestamp) +"</p></div><div><h2>- "+ formatMoney(amount) +" €</h2><h4 class=\"red\">Payment</h4></div>"
    parent.insertBefore(element, parent.firstChild);
    bank_update_amount(-amount);
}

function new_payment_refused(name,amount,timestamp = Date.now()){
    let parent = document.querySelector('.bank_history');
    let element = document.createElement('div');
    element.classList.add('refused')
    element.innerHTML="<div><h2>"+ name +"</h2><p>"+ time_to_date(timestamp) +"</p></div><div><h2>- "+ formatMoney(amount) +" €</h2><h4 class=\"red\">Payment refused</h4></div>"
    parent.insertBefore(element, parent.firstChild);
}

function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");

    } catch (e) {
        console.log(e)
    }
}

function time_to_date(timestamp) {
    let date = new Date(timestamp);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    let formattedTime =  day + '/' + month + '/' + year;
    return formattedTime;

}