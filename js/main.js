var mainPageModalSlider;

$(document).on('click','.close', function(){
    $('.modal').modal('hide'); 
});
$(document).on("mouseover", ".menu-item", function(){
    // $(".menuItem_border_letter_gold").removeClass("menuItem_border_width");

    // $(".menuItem_border_letter_gold").addClass("menuItem_border_transition");

    
    $(".menu-img").removeClass('d-none')
    $(".menu-img").attr('src', $(this).attr('data-img'))


    // $(".menuItem_border").html($(this).attr('hover_letter'));

    let letter = $(this).attr('hover_letter');

    console.log(letter,"");
    let text =  `
        <span class="menuItem_border menuItem_border_letter">
            ${letter}
        </span> 
        <span class="menuItem_border menuItem_border_letter_gold">
            ${letter}
        </span> 
    `
    $(".menuItem_border_wrapper").html(text);

    setTimeout(() => {
        $(".menuItem_border_letter_gold").addClass("menuItem_border_width");
    }, 100);
});
$(document).ready(function () {
    $("body").addClass('is-ready');
    $('.navbar').removeClass('delay-for-preloader');
    setTimeout(() => {
        scroll.update();
        console.log("UPDATING"); 
    }, 5000);
});
document.addEventListener('DOMContentLoaded', function () {
    if($('#inner-slider').length){
        var splide = new Splide('#inner-slider', {
            type: 'loop',
            drag: 'free',
            gap: '2rem',
            pagination: false,
            wheel: false,
            autoWidth: true,
            // fixedWidth:"80%",
            padding:'15rem',
            focus: 'center',
            // lazyLoad: 'sequential',
            speed: 2000,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            waitForTransition: boolean = false,
            // cover:true,
            height:"500px",
        });
        splide.mount();
        splide.go(1);
        var current_pull = 0
        splide.on('dragging', function () {
            var new_pull = parseInt($('.splide__list').css("transform").split(",")[4].trim());
            // if (new_pull > current_pull) {
            //     $('.splide__slide img').addClass('skew-left').removeClass('skew-right')
            // } else {
            //     $('.splide__slide img').addClass('skew-right').removeClass('skew-left')
            // }
            current_pull = new_pull
        });
        splide.on('dragged', function () {
            $('.splide__slide img').addClass('skew-left').removeClass('skew-right skew-left')
        });


        splide.on('click', function (item) {
            $('#galleryModalWelcome').modal('show');
            setTimeout(() => {
                console.log("goo");
                mainPageModalSlider.go(item.index);
            }, 200);
        });

        splide.on('move', function (newIndex, prevIndex, destIndex) {
            // console.log(newIndex, prevIndex, destIndex,"------------------");
            // $('.current-slide').html("0" + (newIndex + 1))
            // $('.tab').removeClass('active')
            // $('.tab[data-id=' + newIndex + ']').addClass('active');
        });
        // $('.tab').on('click', function () {
        //     splide2.go(">" + $(this).attr('data-id'));
        // });


    }
    if ($('#scroll-element').length) {
        var splide2 = new Splide('#scroll-element', {
            classes: {
                pagination: 'splide__pagination',
                page: 'splide__pagination__page',
            },
            type: 'loop',
            drag: 'free',
            pagination: false,
            wheel: false,
            start: 0,
            lazyLoad: 'sequential',
            speed: 2000,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        });
        splide2.mount();
        splide2.on('move', function (newIndex, prevIndex, destIndex) {
            $('.current-slide').html("0" + (newIndex + 1))
            $('.tab').removeClass('active')
            $('.tab[data-id=' + newIndex + ']').addClass('active');
        });
        $('.tab').on('click', function () {
            splide2.go(">" + $(this).attr('data-id'));
        });
    }
    
    // var splide3 = new Splide('#inner-slider2', {
    //     perPage: 1,
    //     cover:true,
    //     type: 'loop',
    //     pagination: false,
    //     wheel: false,
    //     focus: 'center',
    //     lazyLoad: 'sequential',
    //     speed: 2000,
    //     easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    // });
    // splide3.mount();
});

function showSucces(id){
    $(document).find('.success[data-id=' + id + ']').removeClass('hide')
    setTimeout(() => {
        $(document).find('.success[data-id=' + id + ']').addClass('hide')
    }, 5000);
}
$(document).on('click', '.callback-btn[data-id=1]',function(){
    let name = $('.name[data-id=1]');
    let phone = $('.phone[data-id=1]');
    let count = 0;
    if(name.val()==""){
        count += 1;
        name.parent().addClass('error');
    }
    if (phone.val() == "") {
        count += 1;
        phone.parent().addClass('error');
    }
    if (!count){
        showSucces(1);
        axios.post('/callback', {
            'name': name.val(),
            'phone': phone.val(),
        }).then(function () {
            name.val("").parent().removeClass('error')
            phone.val("").parent().removeClass('error')
        });
    }
});
///DUPLICATE YESSS
$(document).on('click', '.feedbackFinalBtn',function(){
    let name = $('#messageModal').find(".nameInput");
    let phone = $('#messageModal').find(".phoneInput");
    let count = 0;
    if(name.val()==""){
        count += 1;
        name.parent().addClass('error');
    }
    if (phone.val() == "") {
        count += 1;
        phone.parent().addClass('error');
    }
    if (!count){
        showSucces(1);
        
        axios.post('/callback', {
            'name': name.val(),
            'phone': phone.val(),
        }).then(function () {
            name.val("").parent().removeClass('error');
            phone.val("").parent().removeClass('error');
            setTimeout(() => {
                $('#messageModal').modal('hide');
            }, 6000);
        });
    }
});




const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    lerp: 0.05,
});

$(document).ready(function () {
    setTimeout(() => {
        scroll.update();
        console.log("update 1");
    }, 1000);
})

$(document).ready(function () {
    setTimeout(() => {
        scroll.update();
        console.log("update 8");
    }, 8000);
})

var height = $('.navbar-brand').height();
let updated = 0;
scroll.on('scroll', function (event) {
    if (event.delta) {
        if (event.delta.y >= height - 5) {
            $('.navbar').addClass("bg-white");
        } else {
            $('.navbar').removeClass("bg-white");
        }
        let limit = event.limit.y * 0.9;
        if (limit <= event.delta.y && updated < 2){
            updated += 1;
            scroll.update();
        }
    }
});
$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop >= height - 5) {
        $('.navbar').addClass("bg-white");
    } else {
        $('.navbar').removeClass("bg-white");
    }
});

$(document).on('click', '.room', function(){
    $('.room[data-id=' + $(this).attr('data-id')+']').removeClass('active');
    $(this).addClass('active');
    sortApartments()
});
var slider = document.getElementById('slider-round');
if(slider){
    let start = parseInt(slider.getAttribute('data-start'));
    let end = parseInt(slider.getAttribute('data-end'));

    console.log(start,"=====",end);

    if(start && end){
        noUiSlider.create(slider, {
            start: [start, end],
            connect: true,
            range: {
                'min': start,
                'max': end
            }
        });
        var sliderValues = [
            document.getElementById('slider-start'),
            document.getElementById('slider-end')
        ];

        slider.noUiSlider.on('update', function (values, handle) {
            sliderValues[handle].innerHTML = Math.round(values[handle])
        });
        slider.noUiSlider.on('end', function (values, handle) {
            sortApartments()
        });
    }
}

$('#clear-filter').on('click', function(){
    let slider = document.getElementById('slider-round');
    let start = 0;
    let end   = 9999;
    if(slider){
        start = parseInt(slider.getAttribute('data-start'));
        end = parseInt(slider.getAttribute('data-end'));
    }    

    $('.room').removeClass('active');
    slider.noUiSlider.set([start, end])
    sortApartments()
});
let option = {
    perPage: 1,
    cover: false,
    type: 'loop',
    pagination: false,
    wheel: false,
    focus: 'center',
    lazyLoad: 'sequential',
    speed: 2000,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
}

if ($('#inner-slider4').length){
    let splide5 = newSplide('#inner-slider4', option);
    splide5.mount();    
}
if ($('#inner-slider5').length) {
    let splide6 = newSplide('#inner-slider5', option);
    splide6.mount();
}


$('.apartment-modal').on('click', function() {
   let el = $(this);
    $('#room-id').val(el.attr('data-id'))
    $('#room-room').html(el.attr('data-room'))
    $('#room-floor').html(el.attr('data-floor'))
    $('#room-area').html(el.attr('data-area') + " м")
    $('#room-block').html("блок " + el.attr('data-block'))
    $('#room-direction').attr("src", el.attr('data-direction'))
    $('#room-genplan').attr("src", el.attr('data-genplan'))
    $('#room-image').html($('.room-images').html());
    let splide4 = new Splide('#inner-slider3', option);
    splide4.mount();
    //
    
    $('#room-imageMobile').html($('.room-images').html());
    let splide4Mobile = new Splide('#inner-slider3Mobile', option);
    splide4Mobile.mount();
});
let option2 = option
option2.cover = true;
$(document).on('click', '.building', function () {
    $('#building-image').html($('#buildingGallery' + $(this).attr('data-id')).html());
    let buildingGallery = new Splide('#inner-slider6', option2);
    buildingGallery.mount();
});

$('.callback-btn[data-id=2]').on('click', function(){
    let floor = $('#room-floor').html();
    let room = $('#room-room').html();
    let area = $('#room-area').html();
    let block = $('#room-block').html();

    let name = $('.name[data-id=2]');
    let phone = $('.phone[data-id=2]');
    let count = 0;
    
    if (name.val() == "") {
        count += 1;
        name.parent().addClass('error');
    }
    if (phone.val() == "") {
        count += 1;
        phone.parent().addClass('error');
    }
    if (!count) {
        showSucces(2);
        axios.post('/reserve', {
            'name': name.val(),
            'phone': phone.val(),
            'floor': floor,
            'room': room,
            'area': area,
            'block': block,
        }).then(function () {
            name.val("")
            phone.val("")
        });
    }
    
});
function sortApartments() {
    let projectId = $("#thisProjectId").attr("projectId");
    let block = $('.room.active[data-id=1] .text').html();
    let room = $('.room.active[data-id=2] .text').html();
    let start = parseInt($('#slider-start').html());
    let end = parseInt($('#slider-end').html());
    axios.post('/sort', {
        "projectId":projectId,
        'start': start,
        'end': end,
        'room': room,
        'block': block,
    }).then(function (result) {
        $("#apartments-container").html(result.data.view);
        $("#quantity").html(result.data.count);
        scroll.update();
    });
}

// 06.06.2022
$('#section1SliderBtnRight').on('click', function(){
    let activeSlide = parseInt($('.activeSlide').attr('order'));
    let numberOfSlides = parseInt($(".projectNamesContainer").length);
    let nextSlide = activeSlide+1;
    if(activeSlide == numberOfSlides){
        nextSlide = 1;
    }
    console.log(activeSlide,nextSlide);

    $('.write-text').addClass('writeBackText');
    
    $('.show-text').addClass('hideSliderText');

    setTimeout(() => {
        $(`.slider_${activeSlide}`).addClass('inactiveSlide');    
        $(`.slider_${activeSlide}`).removeClass('activeSlide');

        $(`.slider_${nextSlide}`).addClass('activeSlide');    
        $(`.slider_${nextSlide}`).removeClass('inactiveSlide');

        $('.show-text').removeClass('hideSliderText'); 

        $('.write-text').removeClass('writeBackText');

        $(`.mainSlider_${activeSlide}`).removeClass('mainSliderActiveImage');
        $(`.mainSlider_${nextSlide}`).addClass('mainSliderActiveImage');  
        
        
    }, 700)
});

$('#section1SliderBtnLeft').on('click', function(){
    let activeSlide = parseInt($('.activeSlide').attr('order'));
    let numberOfSlides = parseInt($(".projectNamesContainer").length);
    
    let nextSlide = numberOfSlides;
    if(activeSlide == 1){
        nextSlide = numberOfSlides;
    }else{
        nextSlide = activeSlide - 1;
    }

    console.log(activeSlide,nextSlide);

    $('.write-text').addClass('writeBackText');

    $('.show-text').addClass('hideSliderText');
    setTimeout(() => {
        $(`.slider_${activeSlide}`).addClass('inactiveSlide');    
        $(`.slider_${activeSlide}`).removeClass('activeSlide');

        $(`.slider_${nextSlide}`).addClass('activeSlide');    
        $(`.slider_${nextSlide}`).removeClass('inactiveSlide');

        $('.show-text').removeClass('hideSliderText'); 

        $('.write-text').removeClass('writeBackText');

        $(`.mainSlider_${activeSlide}`).removeClass('mainSliderActiveImage');
        $(`.mainSlider_${nextSlide}`).addClass('mainSliderActiveImage');  
    }, 700)
});

$('.splide__slide img').on('click', function(){
    $('.galleryModalWelcomeImageContainer').css("background-image", `url(${$(this).attr("src")})`);  


});

if($('#news-slider').length){
   var splide5 = new Splide('#news-slider', {
    type   : 'loop',
    perPage: 2,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    speed: 1000,
    gap: "30px",
    perMove: 1,
    lazyLoad: 'sequential',
    cover:true,
    wheel: false,
    waitForTransition: boolean = false,
    breakpoints: {
        640 : { perPage: 1 },
      },
    });
    splide5.mount(); 
}

if($('#project-slider_one').length){
    var splide5 = new Splide('#project-slider_one', {
        type   : 'loop',
        perPage: 1,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        speed: 1000,
        // gap: "30px",
        // perMove: 1,
        lazyLoad: 'sequential',
        cover:true,
        wheel: false,
        waitForTransition: boolean = false,
        breakpoints: {
            640 : { perPage: 1 },
        },
    });
    splide5.mount();
}

$(".projectItemCardImage").hover(function(){
    $(this).removeClass("qwerty");
});

$(document).ready(function () {
    setTimeout(() => {
        $(".projectNamesContainer p").removeClass("delay-for-preloader");    
    }, 2000);

    setTimeout(() => {
        // $(".aaaa_bbbb").removeClass("preloader_delay_text");
        console.log("PRRRRRRRRRE");
        $('.aaaa_bbbb').css('opacity', '1');
    }, 250);


});

if($('#construction-slider').length){
    var splide5 = new Splide('#construction-slider', {
     type   : 'loop',
     perPage: 3,
     easing: "cubic-bezier(0.25, 1, 0.5, 1)",
     speed: 1000,
     gap: "20px",
     perMove: 1,
     lazyLoad: 'sequential',
     cover:true,
     wheel: false,
     waitForTransition: boolean = false,
     breakpoints: {
         640 : { perPage: 1 },
       },
     });
     splide5.mount(); 
 }



 if($('#inner-slider_2').length){
    mainPageModalSlider = new Splide('#inner-slider_2', {
        type: 'loop',
        drag: 'free',
        perPage: 1,
        snap   : true,
        autoWidth: true,
        clones: 1,
        cloneStatus:true,
        focus: 'center',
        pagination: false,
        wheel: false,
        lazyLoad: 'nearby',
        preloadPages: 2,
        speed: 2000,
        waitForTransition: boolean = false
    });
    mainPageModalSlider.mount();
    // var current_pull = 0
    // mainPageModalSlider.on('dragging', function () {
    //     var new_pull = parseInt($('.splide__list').css("transform").split(",")[4].trim());
    //     current_pull = new_pull
    // });
    // mainPageModalSlider.on('dragged', function () {
    //     $('.splide__slide img').addClass('skew-left').removeClass('skew-right skew-left')
    // });
}

if($('#partners-slider').length){
    let splide55 = new Splide('#partners-slider', {
     type   : 'loop',
     perPage: 4,
     easing: "cubic-bezier(0.25, 1, 0.5, 1)",
     speed: 1000,
     gap: "20px",
     perMove: 1,
     lazyLoad: 'sequential',
     cover:true,
     wheel: false,
     waitForTransition: boolean = false,
     breakpoints: {
        1200: { perPage: 4, gap: '20px' },
        900: { perPage: 3, gap: '20px' },
        700: { perPage: 2, gap: '10px' },
        640 : { perPage: 2, gap: '1px' },
       },
     });
     splide55.mount(); 
 }

 if($('#license-slider').length){
    let splide55 = new Splide('#license-slider', {
     type   : 'loop',
     perPage: 4,
     easing: "cubic-bezier(0.25, 1, 0.5, 1)",
     speed: 1000,
     gap: "20px",
     perMove: 1,
     lazyLoad: 'sequential',
     cover:true,
     wheel: false,
     waitForTransition: boolean = false,
     breakpoints: {
        1200: { perPage: 4, gap: '20px' },
        900: { perPage: 3, gap: '20px' },
        700: { perPage: 2, gap: '10px' },
        640 : { perPage: 2, gap: '1px' },
       },
     });
     splide55.mount(); 
 }
 if($('#project_item_slider').length){
    let splideProject = new Splide('#project_item_slider', {
        type: 'loop',
        drag: 'free',
        gap: '2rem',
        pagination: false,
        wheel: false,
        // autoWidth: true,
        padding: '15rem',
        fixedWidth:"90%",
        focus: 'center',
        lazyLoad: 'sequential',
        speed: 2000,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        waitForTransition: boolean = false,
        // cover:true,
        height:"500px",
    });
    splideProject.mount();
}

// $(".callBackButton").hover(function(){
//     console.log("hover");
//     $(".socialBtn").addClass("activeSocialIcons");

// });

// $(".callBackButton").hover(function(){
//     $(".socialBtn").addClass("activeSocialIcons");
//     }, function(){
//     $(".socialBtn").removeClass("activeSocialIcons");
// });

$(".callBackButton").click(function(){
    if($(".socialBtn").hasClass("activeSocialIcons")){
        $(".socialBtn").removeClass("activeSocialIcons");

        $(".callBackButtonWrapper").removeClass("overflow_visible");
        // $(".callBackButtonWrapperInner").removeClass("callBackButtonWrapperInnerActive");
    }else{
        $(".socialBtn").addClass("activeSocialIcons")

        $(".callBackButtonWrapper").addClass("overflow_visible");
        // $(".callBackButtonWrapperInner").addClass("callBackButtonWrapperInnerActive")
    }
});

$(".menuItemProjects").click(function() {
    if(location.pathname !== "/"){
        window.location.href = "/";
        //set session
        sessionStorage.setItem('page', 'project');
    }else{
        let target = document.querySelector('#projectsRowContainer');
        scroll.scrollTo(target);
    }
});

$(document).ready(function(){
    //check session
    if(location.pathname === "/"){
        let page = sessionStorage.getItem('page');
        if(page === "project"){
            let target = document.querySelector('#projectsRowContainer');
            scroll.scrollTo(target);
            sessionStorage.removeItem('page');
        }
        if(page === "news"){
            let target = document.querySelector('#newsRowContainer');
            scroll.scrollTo(target);
            sessionStorage.removeItem('page');
        }
    }
});

$(".menuItemNews").click(function() {
    if(location.pathname !== "/"){
        window.location.href = "/";
        //set session
        sessionStorage.setItem('page', 'news');
    }else{
        let target = document.querySelector('#newsRowContainer');
        scroll.scrollTo(target);
    }
});

$("#closeMainPageModalVideo").click(function() {
    document.getElementById("mainPageModalVideo").pause();
});
