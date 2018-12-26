$(function () {
  jQuery('#datetimepicker').datetimepicker({
      dateFormat: 'dd-mm-yy',
      timepicker:false,
      format:'d/m/Y'
  });
  // jQuery('#datetimepicker2').datetimepicker({
  //     dateFormat: 'dd-mm-yy',
  //     timepicker:false,
  //     format:'d/m/Y'
  // });

});


$(document).ready(function(){
	$('.slider').slick({
	    slidestoshow:1,
	    dots: false,
	 
	    prevArrow:'<i class="fa fa-angle-left prev" aria-hidden="true"></i>',
	    nextArrow:'<i class="fa fa-angle-right next" aria-hidden="true"></i>',


	});

	rmcl();
	$('.main-nav>ul>li>i').click(function(){
	$('.main-nav li>ul').toggleClass('active');
  });
  $('.menu-btn').click(function(){
    $('.main-nav').toggleClass('active');
    $('.menu-btn i').toggleClass('fa-times');
    $('.menu-btn i').toggleClass('fa-bars');
    $('.main-nav li>ul').removeClass('active');
    $('.main-nav li i').removeClass('fa-caret-up');

  });
   $('.main-nav >ul>li>i').click(function(){
    $('.main-nav >ul>li>i').toggleClass('fa-caret-up');

  });

});
var rmcl=function(){
	  if($(window).width()<1199){
    $(".a1").removeClass('w210');
    $(".a2").removeClass('w660');
    $(".a3").removeClass('w300');
  }else{
  	$(".a1").addClass('w210');
    $(".a2").addClass('w660');
    $(".a3").addClass('w300');
  }
}

$(window).resize(function(){
	rmcl();
});

  // String.prototype.toDate = function(format)
  // {
  //   var normalized      = this.replace(/[^a-zA-Z0-9]/g, '-');
  //   var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  //   var formatItems     = normalizedFormat.split('-');
  //   var dateItems       = normalized.split('-');

  //   var monthIndex  = formatItems.indexOf("mm");
  //   var dayIndex    = formatItems.indexOf("dd");
  //   var yearIndex   = formatItems.indexOf("yyyy");
  //   var hourIndex     = formatItems.indexOf("hh");
  //   var minutesIndex  = formatItems.indexOf("ii");
  //   var secondsIndex  = formatItems.indexOf("ss");

  //   var today = new Date();

  //   var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
  //   var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
  //   var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

  //   var hour    = hourIndex>-1      ? dateItems[hourIndex]    : today.getHours();
  //   var minute  = minutesIndex>-1   ? dateItems[minutesIndex] : today.getMinutes();
  //   var second  = secondsIndex>-1   ? dateItems[secondsIndex] : today.getSeconds();

  //   return new Date(year,month,day,hour,minute,second);
  // };
  // var sktime = $(".sk-time");
  // if(sktime.length>0){
  //   var time = sktime.data("time");
  //   time = time.toDate("dd/mm/yyyy hh:ii:ss");
  //   var timeSK= time.getTime()/1000;
  //   var now = (new Date()).getTime()/1000;

  //   var distance = timeSK - now;
  //   if(distance>0){
  //     var days = parseInt(distance/86400);
  //     var mday = parseInt(distance % 86400);
  //     var hours = parseInt(mday/3600);
  //     var mhours = parseInt(mday%3600);
  //     var minutes = parseInt(mhours/ 60);
  //     var mminute = parseInt(mhours%60);
  //     var second = parseInt(mminute/ 60);
  //     var msecond = parseInt(mminute% 60);
  //     // $(".sk-time .day").text(days);
  //     $(".sk-time .hour").text(hours);
  //     $(".sk-time .minute").text(minutes);
  //     $(".sk-time .second").text(seconds);
  //   }
  // }
const countdownMB = new Date("August 28, 2019 18:15:00");
const countdownMT = new Date("August 28, 2019 17:15:00");
const countdownMN = new Date("August 28, 2019 16:15:00");

function getRemainingTime(endtime) {
  const milliseconds = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor( (milliseconds/1000) % 60 );
  const minutes = Math.floor( (milliseconds/1000/60) % 60 );
  const hours = Math.floor( (milliseconds/(1000*60*60)) % 24 );
  // const days = Math.floor( milliseconds/(1000*60*60*24) );

  return {
    'total': milliseconds,
    'seconds': seconds,
    'minutes': minutes,
    'hours': hours,
    // 'days': days,
  };
}
  
function initClock(id, endtime) {
  const counter = document.getElementById(id);
  if(counter===null) return;
  // const daysItem = counter.querySelector('.js-countdown-days');
  const hoursItem = counter.querySelector('.js-countdown-hours');
  const minutesItem = counter.querySelector('.js-countdown-minutes');
  const secondsItem = counter.querySelector('.js-countdown-seconds');
  console.log(endtime);
  function updateClock() {
    const time = getRemainingTime(endtime);

    // daysItem.innerHTML = time.days;
    hoursItem.innerHTML = ('0' + time.hours).slice(-2);
    minutesItem.innerHTML = ('0' + time.minutes).slice(-2);
    secondsItem.innerHTML = ('0' + time.seconds).slice(-2);
  
    if (time.hours===0&&time.minutes===0&&time.seconds===0) {        
      $('#'+id).hide();  
      clearInterval(timeinterval);
    }
    if(time.hours > 9){
        $('#'+id).hide();
    }
  }

  updateClock();
  const timeinterval = setInterval(updateClock, 1000);
}

initClock('js-countdown', countdownMB);
initClock('js-countdown1', countdownMT);
initClock('js-countdown2', countdownMN);



(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



