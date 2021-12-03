//var

let messages_are_open = false;
let messages_phone_number_open = "";


function load_messages(){
    let messages = {
        '00001' : {
            'unread': false,
            'name' : 'Liam',
            'messages' : [
                {
                    'type': 'sent',
                    'content' : 'Hello',
                    'time': '1637941224028'
                },
                {
                    'type': 'received',
                    'content' : 'Coucou bg',
                    'time': '1637941324028'
                }
            ]
        },
        '00002' : {
            'unread': true,
            'name' : 'Arthur',
            'messages' : [
                {
                    'type': 'sent',
                    'content' : 'Salut',
                    'time': '1638026123287'
                },
                {
                    'type': 'received',
                    'content' : 'Yo',
                    'time': '1638118857178'
                }
            ]
        },
        '00003' : {
            'unread': false,
            'name' : 'Mamad',
            'messages' : [
                {
                    'type': 'sent',
                    'content' : 'Test',
                    'time': '1638124845694'
                },
                {
                    'type': 'received',
                    'content' : 'Test',
                    'time': '1638124845694'
                }
            ]
        }
    }
    return messages;
}


function load_message_list(){
    let messages = load_messages();
    hide_message_sections()
    document.getElementById('msg_home').style.display = "block";

    let keys = Object.keys(messages);

    let msg_list = [];

    for (let i = 0; i < keys.length; i++) {
        let name = messages[keys[i]].name;
        let unread = messages[keys[i]].unread;
        let msg = messages[keys[i]].messages;
        let last_msg = msg[msg.length - 1].content;
        let time = msg[msg.length - 1].time;
        let icon = name.charAt(0).toUpperCase();

        msg_list.push({
            'unread' : unread,
            'phone' : keys[i],
            'icon' : icon,
            'name' : name,
            'last_msg' : last_msg,
            'time' : time
        });
    }

    msg_list.sort(function(a, b) {
        return b.time - a.time;
    });

    document.querySelector('.msg_list').innerHTML = "";
    for (let i = 0; i < msg_list.length; i++) {
        let element = document.createElement('div');
        element.innerHTML = "<i>"+ msg_list[i].icon +"</i><div><h1>"+ msg_list[i].name +"</h1><p>"+ msg_list[i].last_msg +"</p></div><span></span><h3>"+ format_time(msg_list[i].time) +"</h3>";
        element.onclick = function (){load_conversation(msg_list[i].phone)};
        if(msg_list[i].unread){
            element.classList.add('unread');
        }
        document.querySelector('.msg_list').appendChild(element);
    }

}

function load_conversation(phone_number){
    let messages = load_messages();
    messages = messages[phone_number];

    let name = messages.name;
    let msg = messages.messages;
    let icon = name.charAt(0).toUpperCase();

    document.querySelector('.msg_info i').innerHTML = icon;
    document.querySelector('.msg_info h1').innerHTML = name;
    document.querySelector('.msg_content').innerHTML = "";

    for (let i = 0; i < msg.length; i++) {
        let element = document.createElement('div');
        element.className = msg[i].type;
        element.innerHTML = "<div>"+ msg[i].content +"</div><p>"+ format_time_accurate(msg[i].time) +"</p>";
        document.querySelector('.msg_content').appendChild(element);
    }

    hide_message_sections();
    document.getElementById('msg_show').style.display = "block";
    console.log('put_unread');
    messages_phone_number_open = phone_number;
    messages_are_open = true;
}

function new_conversation(){
    hide_message_sections();
    document.getElementById('msg_new').style.display = "block";

    document.querySelector('#msg_input_name').value = "";
    document.querySelector('#msg_input_phone').value = "";
}

function hide_message_sections(){
    let list = document.querySelectorAll('.msg_section');
    for (let i = 0; i < list.length; i++) {
        list[i].style.display = "none";
    }
}

function message_receive(phone_number,content){
    if(messages_are_open && messages_phone_number_open === phone_number){
        let element = document.createElement('div');
        element.className = 'received';
        element.innerHTML = "<div>"+ content +"</div><p>"+ format_time_accurate(Date.now()) +"</p>";
        document.querySelector('.msg_content').appendChild(element);
    }else if (messages_are_open){
        new_notification('info','You received a new message');
    }
    else{
        load_message_list();
        new_notification('info','You received a new message');
    }
}

function message_sent(){
    let content = document.getElementById('new_message_input');

    let element = document.createElement('div');
    element.className = 'sent';
    element.innerHTML = "<div>"+ content.value +"</div><p>"+ format_time_accurate(Date.now()) +"</p>";
    document.querySelector('.msg_content').appendChild(element);
    document.querySelector('.msg_content').scrollTo(0,document.querySelector('.msg_content').scrollHeight);

    new_message();

    content.value = "";
}

function new_message(){
    console.log('Ue4 gestion');
}

function format_time(timestamp){
    let now = Date.now();
    let dif = now - timestamp;
    if(dif < 60000){
        return 'Now';
    }else if(dif > 60000 && dif < 3600000){
        return Math.floor(dif/60000)+'m';
    }else if(dif >= 3600000 && dif < 86400000){
        return Math.floor(dif/3600000)+'h';
    }else {
        let date = new Date(parseInt(timestamp));
        return date.getDate()+"/"+(date.getMonth()+1);
    }
}

function format_time_accurate(timestamp){
    let now = Date.now();
    let dif = now - timestamp;
    let date = new Date(parseInt(timestamp));

    if(dif < 86400000){
        return accurate_time(date.getHours())+":"+accurate_time(date.getMinutes());
    }else {
        return date.getDate()+"/"+(date.getMonth()+1);
    }
}

function accurate_time(time){
    time = time.toString();
    if(time.length === 1){
        time = "0"+time;
    }
    return time
}