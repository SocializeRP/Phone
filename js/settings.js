let last_setting_menu = "settings_home";

function new_setting_menu(section){
    if(last_setting_menu !== undefined){
        document.getElementById(last_setting_menu).style.display="none";
    }
    document.getElementById(section).style.display="flex";

    last_setting_menu = section;
}