$(document).ready(function(){
    // Variables
    var $popoverLink = $('[data-popover]')

    function init(){
        $popoverLink.on('click',openPopover)
        reflectEmails()
        doLogoAnimation()
    }

    function reflectEmails(){
        $.each($('.reflectable'),function(i,elem){
            array = elem.href.split(/[:,*,?]+/)
            temp = array[1]
            array[1]=array[2]
            array[2]=temp
            array.splice(1,0,":")
            array.splice(3,0,"@")
            array.splice(5,0,"?")
            newHref=array.join("")
            $(elem).attr("href",newHref)
            newName=newHref.split(/[:,?]+/)[1]
            $(elem).text(newName)
        });
    }

    function openPopover(e){
        e.preventDefault()
        closePopover()
        var popover = $(this).data('popover');
        $(popover).toggleClass('open')
        e.stopImmediatePropagation()
    }

    function closePopover(e){
        if($('.popover.open').length > 0) {
          $('.popover').removeClass('open')
        }
    }

    //sidebar dropdown menu
    $.expr[':'].hiddenByParent = function(a) { 
       return jQuery(a).is(':hidden') && jQuery(a).css('display') != 'none'; 
    };
    hiddenChild=$("ul.sub:hiddenByParent");
    hiddenChild.parents(".sub").addClass("open")
    $('#sidebar .sub-menu').click(function () {
        // Close previous open submenu
        // var last = $('.sub.open', $('#sidebar'));
        // console.log(last.selector)
        // if($.contains(last,this)){
        //     console.log("trueee!")
        // }
        // $(last).slideUp(200);
        // $(last).removeClass("open");
        // $('.menu-arrow', $(last).parent()).addClass('fa-angle-right');
        // $('.menu-arrow', $(last).parent()).removeClass('fa-angle-down');

        // Toggle current submenu
        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
            $('.menu-arrow', this).addClass('fa-angle-right');
            $('.menu-arrow', this).removeClass('fa-angle-down');
            sub.slideUp(200);
            $(sub).removeClass("open")
        } else {
            $('.menu-arrow', this).addClass('fa-angle-down');
            $('.menu-arrow', this).removeClass('fa-angle-right');
            sub.slideDown(200);
            $(sub).addClass("open")
        }

    });
    init()
});



function doLogoAnimation(){
    var path = $('.svgpath2');
    // if path.length == 0{
    //     return
    // }
    $.each(path,function(i,elem){
        path = elem
        var length = path.getTotalLength();
        // Clear any previous transition
        path.style.transition = path.style.WebkitTransition =
        'none';
        // Set up the starting positions
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        console.log(length)
        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        path.getBoundingClientRect();
        // Define our transition
        path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset 2s ease-in-out';
        // Go!
        path.style.strokeDashoffset = '0';
    })
}