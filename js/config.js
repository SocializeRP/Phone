let last_section = 'home';

function new_section(section){

    if(last_section !== undefined){
        document.getElementById(last_section).style.display="none";
    }
    document.getElementById(section).style.display="flex";

    last_section = section;
}

function show_tablet(){
    document.querySelector('.tablet').style.display="flex";
}

function hide_tablet(){
    document.querySelector('.tablet').style.display="none";
    messages_are_open = false;
}

function home_background(class_name) {
    document.getElementById('home').className = "content "+class_name;
}

function updateTime(){
    let days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var currentTime = new Date()
    var hours = accurate_time(currentTime.getHours());
    var minutes = accurate_time(currentTime.getMinutes());
    var week_day = currentTime.getDay();
    var month = currentTime.getMonth();
    var day = currentTime.getDate();
    var t_str = hours + ":" + minutes + " " + days[week_day] + " " + months[month] + " " + day;

    let date_containers = document.querySelectorAll('.content_infos h1');
    for (let i = 0; i < date_containers.length; i++) {
        date_containers[i].innerHTML = t_str;
    }
}

function init_phone(){
    fetch('http://localhost:42600/Phone/config/config.json').then(response => response.text()).then(function (data){
        console.log(data);
        data = JSON.parse(data);
        let home_config = data.home;

        document.querySelector('#home .row').innerHTML = "";

        for (let i = 0; i < home_config.length; i++) {
            let element = document.createElement('div');
            if(home_config[i].id === ""){
                element.onclick = ()=>{new_notification('warning','This application will be available soon :)')};
            }else {
                element.onclick = ()=>{new_section(home_config[i].id);home_config[i].custom_functions};
                add_section(home_config[i].id,home_config[i].page_path);
            }
            element.innerHTML = "<div style=\"background: "+ home_config[i].background +"\"><i class=\"material-icons\" style=\"color: "+ home_config[i].color +"\">"+ home_config[i].icon +"</i></div><p>"+ home_config[i].name +"</p>";
            document.querySelector('#home .row').appendChild(element);
        }
    });
}

function add_section(id,path){
    fetch('http://localhost:42600/Phone/app/'+ path).then(response => response.text()).then(function (data){
        let element = document.createElement('section');
        element.innerHTML = data;
        element.classList.add('content');
        element.id = id;
        element.style.display="none"
        document.querySelector('.tablet').insertBefore(element,document.querySelector('.tablet .bottom'));
    });
}

updateTime();
setInterval(updateTime, 1000);

new_section('home');
load_message_list();
home_background('back_default');
init_phone();

ue4('ready', {});
