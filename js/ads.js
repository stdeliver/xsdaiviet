/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var domain=document.domain.replace("m.","");
//domain=domain.replace(".vn","");
domain='xosodaiviet.net';
var page='';
var listads=new Array();
var indexItem=0;

$(function (){
    page=$('.pageid_ads').attr('data-id');
    console.log('domain...'+domain);
    console.log('page...'+page);
    loadads();   
});


//lay quang cao
function loadads(){
    var ads=sessionStorage.getItem(page);
    console.log(ads);
    if(ads!==''&& ads!==null){
        listads=JSON.parse(ads);
        for (var i = 0; i <listads.length; i++) {
            showAds(listads[i]);
        }
    }else{
        getAds();
    }
}

function getAllAds(){
    //get page all
    getAds('pageall');
    
    //get of page
    getAds(page);
}

function getAds(){
    
   var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   var kieu;
   if (isMobile) { kieu = 'mobile'; }else{ kieu = 'pc'; } 
//   kieu='pc';
   
    var url="https://tuongthuatketqua.vn/ads.api/get_ads.htm?domain="+domain+"&page="+page+"&kieu="+kieu+"&trangthai=1";
    try{
        $.ajax({
            url: url,
            dataType: 'text',
            cache: false
        }).done(function (data) {
            console.log('data...' + data);
            if(data!==''){
                data=JSON.parse(data);
                for (var i = 0; i < data.length; i++) {
                    showAds(data[i]);
                    listads[indexItem]=data[i];
                    sessionStorage.setItem(page,JSON.stringify(listads));
                    indexItem++;
                }
            }
        });
    }catch (e) {
        console.log('getAds...'+e);
    }
}


//show quang cao
function showAds(item){    
    if(item.kichthuoc==='qc_chungads'){
        $('.qc_chungads').each(function (index){
            if(index===eval(item.vitri)){
                console.log('show quang cao vi tri...'+item.vitri);
                $(this).html(item.maquangcao);        
            }
        });
    }else if(item.kichthuoc==='qc_riengads'){
        if(item.loai==='quangcao'){
            $('.qc_riengads').each(function (index){
                if(index===eval(item.vitri)){
                    $(this).html(item.maquangcao);        
                }
            });
        }else{
            $('.textlink_riengads').each(function (index){
                if(index===eval(item.vitri)){
                    $(this).html(item.maquangcao);        
                }
            });
        }
    }    
}