/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getCurrHHMMSS() {
    var currentdate = new Date();
    var currentHH = (currentdate.getHours() < 10 ? '0' + currentdate.getHours() : currentdate.getHours());
    var currentMM = (currentdate.getMinutes() < 10 ? '0' + currentdate.getMinutes() : currentdate.getMinutes());
    var currentSS = (currentdate.getSeconds() < 10 ? '0' + currentdate.getSeconds() : currentdate.getSeconds());
    return parseInt(currentHH + '' + currentMM + '' + currentSS);
}

function dateNow(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    } 

    if(mm<10) {
        mm = '0'+mm;
    } 

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}

function loadConfig(){
    var config = {
       apiKey: "AIzaSyDqy31SKVWYp4Duu4IH4qIullwq2Odb7es",
       authDomain: "mascom-865bf.firebaseio.com",
       databaseURL: "https://mascom-865bf.firebaseio.com",
       projectId: "mascom-865bf",
       storageBucket: "",
       messagingSenderId: "827774519905"
   };
   firebase.initializeApp(config);
}

function loadKQLiveCompany(db){   
   var messagesRef=firebase.database().ref('messages/'+db);
   messagesRef.limitToLast(1).on('child_added', setMessageCompany);
   messagesRef.limitToLast(1).on('child_changed', setMessageCompany);
}

function setMessageCompany(data){
//    console.log(data.val().text);
   try {
       var messages=JSON.parse(data.val().text);
       var today=dateNow();
       console.log(messages);
       if(messages[38].message===today){
           for(var i=0;i<messages.length;i++){
               var item=messages[i];
               // console.log(item);
               var id='#'+item.id;
               if(item.message!==''){
                   console.log("id==="+item.id+"...meg=="+item.message);
                   $(id).html(item.message);    
               }
           }
       }
   } catch (e) {
       console.log('setMessage');
   }

   
}

function loadKQLive(){
    
    var config = {
        apiKey: "AIzaSyDqy31SKVWYp4Duu4IH4qIullwq2Odb7es",
        authDomain: "mascom-865bf.firebaseio.com",
        databaseURL: "https://mascom-865bf.firebaseio.com",
        projectId: "mascom-865bf",
        storageBucket: "",
        messagingSenderId: "827774519905"
    };
    firebase.initializeApp(config);

    var messagesRef=firebase.database().ref('messages/pushxoso');
    messagesRef.limitToLast(1).on('child_added', setMessage);
    messagesRef.limitToLast(1).on('child_changed', setMessage);
}

function setMessage(data){
//    console.log(data.val().text);
    try {
        var messages=JSON.parse(data.val().text);
        var today=dateNow();
        console.log(messages);
        if(messages[47].message===today){
            for(var i=0;i<messages.length;i++){
                var item=messages[i];
                // console.log(item);
                var id='#'+item.id;
                if(item.message!==''){
                    console.log("id==="+item.id+"...meg=="+item.message);
                    $(id).html(item.message);    
                }
            }
        }
    } catch (e) {
        console.log('setMessage');
    }

    
}
var liveMB=false;
var liveMT=false;
var liveMN=false;
function countDownLive(){
    loadLive();
    var t=setInterval(function (){
        loadLive();
    },5000);
}

function countDownLiveRegion(region,code){
    loadLiveRegion(region,code);
    var t=setInterval(function (){
        loadLiveRegion(region,code);
    },5000);
}

function loadLiveRegion(region,code){
    var currTime = getCurrHHMMSS();
    console.log(currTime);
    if (region==='MB'&&currTime > 181000  && !liveMB) {
        //&& currTime < 184500
        liveMB=true;
        liveKQXS('MB',code);
    }else if (region==='MT'&&currTime > 171000 ) {
        //&& currTime < 174500
        if(!liveMT){liveKQXS('MT',code);}
        else{
            // liveKQXS_V2('MT');
        }
        liveMT=true;
    }else if (region==='MN'&&currTime > 161000 ) {
        //&& currTime < 164500
        if(!liveMN){liveKQXS('MN',code);}
        else{
            // liveKQXS_V2('MN');
        }
        liveMN=true;
    }
    
}

function loadLive(){
    var currTime = getCurrHHMMSS();
    console.log(currTime);
    if (currTime > 181000 && currTime < 184500 && !liveMB) {
        liveMB=true;
        liveKQXS('MB','full');
    }else if (currTime > 171000 && currTime < 174500) {
        if(!liveMT){liveKQXS('MT','full');}
        else{
            // liveKQXS_V2('MT');
        }
        liveMT=true;
    }else if (currTime > 161000 && currTime < 164500) {
        if(!liveMN){liveKQXS('MN','full');}
        else{
            // liveKQXS_V2('MN');
        }
        liveMN=true;
    }
    
}

function quayThuKQXS(region){
    try {
        $.ajax({
        url:'ajax/quaythu.htm?r='+region
        }).done(function (response) {
            $('#kqxs').html(response);
        });
    } catch (e) {
        console.log(e);
    }

    
}

function liveKQXS(region,code){
    try {
        $.ajax({
        url:'ajax/live.htm?r='+region+'&c='+code
        }).done(function (response) {
//            console.log(response);
            $('#kqxs').html(response);
            if(region==='MB'){loadKQLive();}
            else{
                // liveKQXS_V2(region);
                //lay ket qua tu firebase
                loadConfig();
                if(region==='MN'){
                    if(code==='full'){
                        arrCompMN=arrCompMN.split(',');
                        for (var i in arrCompMN) {
                            if(arrCompMN[i]!==''){
                                loadKQLiveCompany(arrCompMN[i]);
                            }
                        }
                    }else{
                        loadKQLiveCompany(code.toUpperCase());
                    }
                }else if(region==='MT'){
                    if(code==='full'){
                        arrCompMT=arrCompMT.split(',');
                        for (var i in arrCompMT) {
                            if(arrCompMT[i]!==''){
                                loadKQLiveCompany(arrCompMT[i]);
                            }
                        }
                    }else{
                        loadKQLiveCompany(code.toUpperCase());
                    }
                }
                //ket thuc
            }
        });
    } catch (e) {
        console.log(e);
    }

    
}

function liveKQXSNew(region,code,id){
    try {
        $.ajax({
        url:'ajax/live.htm?r='+region+'&c='+code
        }).done(function (response) {
//            console.log(response);
            $('#'+id).html(response);
            if(region==='MB'){loadKQLive();}
            else{
                // liveKQXS_V2(region);
                //lay ket qua tu firebase
//                loadConfig();
                if(region==='MN'){
                    if(code==='full'){
                        arrCompMN=arrCompMN.split(',');
                        for (var i in arrCompMN) {
                            if(arrCompMN[i]!==''){
                                loadKQLiveCompany(arrCompMN[i]);
                            }
                        }
                    }else{
                        loadKQLiveCompany(code.toUpperCase());
                    }
                }else if(region==='MT'){
                    if(code==='full'){
                        arrCompMT=arrCompMT.split(',');
                        for (var i in arrCompMT) {
                            if(arrCompMT[i]!==''){
                                loadKQLiveCompany(arrCompMT[i]);
                            }
                        }
                    }else{
                        loadKQLiveCompany(code.toUpperCase());
                    }
                }
                //ket thuc
            }
        });
    } catch (e) {
        console.log(e);
    }

    
}

function liveKQXS_V2(region){
    $.ajax({
        url:'ajax/live_kqxs.htm?r='+region
    }).done(function (response) {
        try {
            kqxs=JSON.parse(response);
            console.log(kqxs);
            for (i=0;i<kqxs.length;i++) {
                if(region==='MB'){
                    setMessageMB(kqxs[i]);
                }else{
                    setMessageNotMB(kqxs[i]);
                }
            }
        } catch (e) {
            console.log('liveKQXS');
        }
    });
}

function setMessageMB(kqxs){
    try {
        if(kqxs.lottery.first!==''&&kqxs.lottery.first!=='-'){
            $('#g1').html(kqxs.lottery.first);
        }
        if(kqxs.lottery.second!==''&&kqxs.lottery.second!=='-'){
            seconds=kqxs.lottery.second.split('-');
            for (var i = 0; i < seconds.length; i++) {
                if(seconds[i]!==''&&seconds[i]!=='-'){
                    $('#g2'+(i+1)).html(seconds[i]);
                }
            }
        }
        if(kqxs.lottery.third!==''){
            thirds=kqxs.lottery.third.split('-');
            for (var i = 0; i < thirds.length; i++) {
                if(thirds[i]!==''&&thirds[i]!=='-'){
                    $('#g3'+(i+1)).html(thirds[i]);
                }
            }
        }
        if(kqxs.lottery.fourth!==''){
            fourths=kqxs.lottery.fourth.split('-');
            for (var i = 0; i < fourths.length; i++) {
                if(fourths[i]!==''&&fourths[i]!=='-'){
                    $('#g4'+(i+1)).html(fourths[i]);
                }
            }
        }
        if(kqxs.lottery.fifth!==''){
            fifths=kqxs.lottery.fifth.split('-');
            for (var i = 0; i < fifths.length; i++) {
                if(fifths[i]!==''&&fifths[i]!=='-'){
                    $('#g5'+(i+1)).html(fifths[i]);
                }
            }
        }
        if(kqxs.lottery.sixth!==''){
            sixths=kqxs.lottery.sixth.split('-');
            for (var i = 0; i < sixths.length; i++) {
                if(sixths[i]!==''&&sixths[i]!=='-'){
                    $('#g6'+(i+1)).html(sixths[i]);
                }
            }
        }
        if(kqxs.lottery.siseventhxth!==''){
            sevenths=kqxs.lottery.seventh.split('-');
            for (var i = 0; i < sevenths.length; i++) {
                if(sevenths[i]!==''&&sevenths[i]!=='-'){
                    $('#g7'+(i+1)).html(sevenths[i]);
                }
                
            }
        }
        if(kqxs.lottery.special!==''&&kqxs.lottery.special!=='-'){
            $('#g0').html(kqxs.lottery.special);
        }
        
        //dau and duoi
        for (var i = 0, max = kqxs.listDuoi.length; i < max; i++) {
            duois=kqxs.listDuoi[i].split(' ');
            duoi='';
            for (var j = 0; j < duois.length; j++) {
                if(duois[j]!=='&nbsp;'){
                    if(duoi===''){
                        duoi+=i+duois[j];
                    }else{
                        duoi+=';'+i+duois[j];
                    }
                }
            }
            $('#duoi'+i).html(duoi);
        }
        
        //dau and duoi
        for (var i = 0, max = kqxs.listDau.length; i < max; i++) {
            daus=kqxs.listDau[i].split(' ');
            dau='';
            for (var j = 0; j < daus.length; j++) {
                if(daus[j]!=='&nbsp;'){
                    if(dau===''){
                        dau+=i+daus[j];
                    }else{
                        dau+=';'+i+daus[j];
                    }                    
                }
            }
            $('#dau'+i).html(dau);
        }
        
    } catch (e) {
        console.log(e);
    }
}

function setMessageNotMB(kqxs){
    try {
        if(kqxs.lottery.first!==''&&kqxs.lottery.first!=='-'){            
            $('#g1'+kqxs.lottery.code).html(kqxs.lottery.first);
        }
        if(kqxs.lottery.second!==''&&kqxs.lottery.second!=='-'){
            $('#g2'+kqxs.lottery.code).html(kqxs.lottery.second);
        }
        if(kqxs.lottery.third!==''&&kqxs.lottery.third!=='-'){
            thirds=kqxs.lottery.third.split('-');
            for (var i = 0; i < thirds.length; i++) {
                if(thirds[i]!==''&&thirds[i]!=='-'){
                    $('#g3'+(i+1)+kqxs.lottery.code).html(thirds[i]);
                }
            }
        }
        if(kqxs.lottery.fourth!==''&&kqxs.lottery.fourth!=='-'){
            fourths=kqxs.lottery.fourth.split('-');
            for (var i = 0; i < fourths.length; i++) {
                if(fourths[i]!==''&&fourths[i]!=='-'){
                    $('#g4'+(i+1)+kqxs.lottery.code).html(fourths[i]);
                }                
            }
        }
        if(kqxs.lottery.fifth!==''&&kqxs.lottery.fifth!=='-'){
            $('#g5'+kqxs.lottery.code).html(kqxs.lottery.fifth);
        }
        if(kqxs.lottery.sixth!==''&&kqxs.lottery.sixth!=='-'){
            sixths=kqxs.lottery.sixth.split('-');
            for (var i = 0; i < sixths.length; i++) {
                if(sixths[i]!==''&&sixths[i]!=='-'){
                    $('#g6'+(i+1)+kqxs.lottery.code).html(sixths[i]);
                }                
            }
        }
        if(kqxs.lottery.seventh!==''&&kqxs.lottery.seventh!=='-'){
            $('#g7'+kqxs.lottery.code).html(kqxs.lottery.seventh);
        }
        if(kqxs.lottery.eighth!==''&&kqxs.lottery.eighth!=='-'){
            $('#g8'+kqxs.lottery.code).html(kqxs.lottery.eighth);
        }
        if(kqxs.lottery.special!==''&&kqxs.lottery.special!=='-'){
            $('#g0'+kqxs.lottery.code).html(kqxs.lottery.special);
        }
        
        
        //dau and duoi
        for (var i = 0, max = kqxs.listDuoi.length; i < max; i++) {
            duois=kqxs.listDuoi[i].split(' ');
            duoi='';
            for (var j = 0; j < duois.length; j++) {
                if(duois[j]!=='&nbsp;'){
                    if(duoi===''){
                        duoi+=duois[j];
                    }else{
                        duoi+=';'+duois[j];
                    }
                }
            }
            $('#duoi'+kqxs.lottery.code+i).html(duoi);
        }                
        
        for (var i = 0, max = kqxs.listDau.length; i < max; i++) {
            daus=kqxs.listDau[i].split(' ');
            dau='';
            for (var j = 0; j < daus.length; j++) {
                if(daus[j]!=='&nbsp;'){
                    if(dau===''){
                        dau+=daus[j];
                    }else{
                        dau+=';'+daus[j];
                    }
                }
            }
            $('#dau'+kqxs.lottery.code+i).html(dau);
        } 
        
    } catch (e) {
        console.log(e);
    }
}