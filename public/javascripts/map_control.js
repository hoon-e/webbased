// 지도 마우스 함수
$(document).ready(function(){

    $svg = $("#map");

    $("path").bind("mouseover", function(event){
        var selected = $(event.target);
        selected.css('fill', 'green');
        selected.css('stroke-width', '2');
    });

    $("path").bind("mousedown", function(event){
        var target = $(event.target);

        location.href = '/map/show/'+ target[0]['attributes'][1].nodeValue;

        // location.href = '/map/' + target[0].id;
    });

    $("path").bind("mouseout", function(event){
        var selected = $(event.target);
        selected.css('fill', '');
    });
});

function map_transition(chart){
    $('#map').css('transform', 'perspective(1000px) translateY(-50px) translateZ(-150px) rotateX(15deg)').css('transition', 'transform 2s ease');
}

