// console.log(document.getElementsByTagName("iframe").length)

// iframe_load_counter = 0;
// function iframe_loaded(){
//     iframe_load_counter = iframe_load_counter +1;
//     console.log(iframe_load_counter);
// };

// if (iframe_load_counter >= document.getElementsByTagName("iframe").length){
//     console.log('ALL LOADED');
//     // document.getElementsByTagName("body").display
// }

function load_frame(sn_id, sn_type,plot_type){
    var baseUrl = 'https://megamp15.github.io/Aggienova_Website/plots/';
    document.getElementById(sn_id+'_'+plot_type).src = baseUrl+plot_type+'/'+sn_id+'_'+sn_type+'_series_'+plot_type+'_summaryPlot.html';
}