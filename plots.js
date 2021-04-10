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

// initialize all cols with their natural order
$('.col-lg-2').each(function(i, ele) {
    let idx = $(ele).index('.col-lg-2')
    $(this).css('order', idx)
})

// set the flexbox order of the details col in each row
var calcOrder = function(perRow) {
    $('.collapse').each(function(i, ele) {
        var idx = $(ele).index('.collapse')
        var modIdx = idx % perRow
        var posi = parseInt((perRow - modIdx) + idx)
        //console.log("posi:" + (parseInt(posi)+1))

        $(this).css('order', posi)
    })
}

// determine number per row based on window width
var breakpoints = function(width) {
    if (width >= 992) {
        //md
        calcOrder(6)
    } else if (width >= 776) {
        //md
        calcOrder(4)
    } else if (width >= 567) {
        //sm
        calcOrder(3)
    } else {
        //xs
        calcOrder(2)
    }
}

// reset order on window resize
$(window).on('resize', function() {
    var win = $(this)
    breakpoints(win.width())
})

// set order on window load
$(window).on('load', function() {
    var win = $(this)
    breakpoints(win.width())
})
