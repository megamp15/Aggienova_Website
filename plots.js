console.log("CHECK!")
console.log(document.getElementsByTagName("iframe").length)


iframe_load_counter = 0;
function iframe_loaded(){
    iframe_load_counter = iframe_load_counter +1;
    console.log(iframe_load_counter);
};

if (iframe_load_counter >= document.getElementsByTagName("iframe").length){
    console.log('ALL LOADED');
    // document.getElementsByTagName("body").display
}

