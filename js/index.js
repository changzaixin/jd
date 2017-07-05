/**
 * Created by lrt on 2017/5/13.
 */
$(function(){
    //--------------------------------------input 框自动监测内容改变 显示备选项  使用jqueryui 插件
    $( ".search input:eq(0)" ).autocomplete({
        source: [ "男装", "女装", "书籍", "家电", "手机", "家具", "男鞋","女鞋" ]
    });

    //------------------------------------------timer 钟表
    //让灰色小球自己动起来
    var arc=2*Math.PI/360,
        j=-90,
        cX=100,
        cY=70;
    setInterval(function(){
        var t=Math.sin(arc*j)*35;//Y方向  sin取的是对边
        var l=Math.cos(arc*j)*35;//X方向  cos取临边
        $(".round4").css("left",cX+t+"px");
        $(".round4").css("top",cY+l+"px");
        j-=6;
        if(j==-276) j=84;
    },200)

});

window.onload=function() {
    //----------------------------------------------------------------头部右侧我的京东的鼠标进入事件
    var oHeader=document.getElementsByClassName("header")[0],
        oTop_header=oHeader.getElementsByClassName("top")[0],
        mYjd=oTop_header.getElementsByClassName("sub")[0],
        mYjd_none=oTop_header.getElementsByClassName("myjd_none")[0],
        aSpan_mYjd_none=mYjd_none.getElementsByTagName("span"),
        aSpan_mYjd_none_len=aSpan_mYjd_none.length;

    //我的京东的鼠标进入事件 mYjd_none显示
    mYjd.parentElement.onmouseenter=function(){
        mYjd_none.style.display="block";
        mYjd_none.style.color="#666";
        mYjd.className="sub subac";
        mYjd_none.onmouseenter=function(){
            mYjd.className="sub subac";
        }
        mYjd_none.onmouseleave=function(){
            mYjd.className="sub";
        }
    }

    //我的京东的鼠标离开事件mYjd_none隐藏
    mYjd.parentElement.onmouseleave=function(){
        mYjd_none.style.display="none";
        mYjd.className="sub";
    }

    //mYjd_none里面的span的鼠标进入 移出事件
    for(i=0;i<aSpan_mYjd_none_len;i++){
        aSpan_mYjd_none[i].onmouseenter=function(){
            this.style.color="#c81623"
        }
        aSpan_mYjd_none[i].onmouseleave=function(){
            this.style.color="#666"
        }

    }


    //----------------------------------------------------------------全部商品分类下面的nav
    var oFloor1=document.getElementsByClassName("floor1")[0],
        oNav_f1=oFloor1.getElementsByClassName("nav")[0],
        oUl_nav=oNav_f1.getElementsByTagName("ul")[0],
        aLi_floor1=oUl_nav.children,
        aLi_f1_len=aLi_floor1.length,
        aSon_floor1=oFloor1.getElementsByClassName("son"),
        oALL=document.getElementsByClassName("all")[0];

    //每一个导航里的li传一个编号
    for(var i=0;i<aLi_f1_len;i++){
        aLi_floor1[i].index=i;
    }

    //每一个导航里的里的li绑定鼠标移入移除事件
    for(var i=0;i<aLi_f1_len;i++){
        aLi_floor1[i].onmouseenter=function(){
            aSon_floor1[this.index].style.display="block";
        }
        aLi_floor1[i].onmouseleave=function(){
            aSon_floor1[this.index].style.display="none";
        }
    }

    //----------------------------------------------------------------轮播图

    //找到banner区
    var abanner = document.getElementsByClassName("banner");
    function ban(obj) {

        //获取banner区内的a li btn 以及li的长度
        var aa = obj.getElementsByTagName("a"),
            abtn = obj.getElementsByClassName("btn"),
            ali = abtn[0].getElementsByTagName("li"),
            oprebtn = abanner[0].getElementsByClassName("prebtn")[0],
            onextbtn = abanner[0].getElementsByClassName("nextbtn")[0],
            len = ali.length,
            n = 0;//用来记录当前显示a（图片）的索引值；

        //封装一个函数 先把所有的a（图片）隐藏 li（圆点）去类名 当前a显示 li加类名
        function public(a) {
            for (var j = 0; j < len; j++) {
                aa[j].style.display = "none";
                ali[j].className = "";
            }
            aa[a].style.display = "block";
            ali[a].className = "red";
        }

        // 轮播图上点击事件的事件委派
        obj.onclick = function (ev) {
            var ev = ev || event,
                ele = ev.target;
            if (ele == this) {
                return;
            }

            //li（圆点）上的点击事件 传入点击的li的索引
            if (ele.tagName == "LI") {
                clearInterval(timer);
                for (var i = 0; i < len; i++) {
                    ali[i].index = i;
                }
                public(ele.index);
                n = ele.index;
            }

            //向前切换图片按钮的点击事件
            if (ele.className == "prebtn") {
                clearInterval(timer);
                n--;
                if (n < 0) {
                    n = len - 1;
                }
                public(n)
            }

            //向后切换图片按钮的点击事件
            if (ele.className == "nextbtn") {
                n++;
                if (n > len - 1) {
                    n = 0;
                }
                public(n);
            }

        }

        //开启定时器
        clearInterval(timer);
        var timer = setInterval(run, 2000);

        function run() {
            n++;
            if (n >= len) {
                n = 0;
            }
            public(n);
        }

        //鼠标进入banner区关闭定时器 前后切换按钮变色
        obj.onmouseenter = function (ev) {
            var ev = ev || event,
                ele = ev.target;
            oprebtn.style.display = "block";
            oprebtn.style.opacity = 0.3;
            onextbtn.style.display = "block";
            onextbtn.style.opacity = 0.3;
            clearInterval(timer);
        }

        //鼠标离开banner区后关闭定时器 前后切换按钮变色
        obj.onmouseleave = function (ev) {
            clearInterval(timer);
            var ev = ev || event,
                ele = ev.target;
            timer = setInterval(run, 2000);
            oprebtn.style.display = "none";
            onextbtn.style.display = "none";
        }

        //鼠标放在前后按钮上按钮变色
        function btn(obj1) {
            obj1.onmouseenter = function () {
                this.style.opacity = 1;
            }
            obj1.onmouseleave = function () {
                this.style.opacity = 0.3;
            }
        }

        btn(oprebtn);
        btn(onextbtn);
    }

    ban(abanner[0]);


//----------------------------------------------------------------右侧固定定位的动画

    //找到右侧的元素
    var ofixnav = document.getElementsByClassName("fixnav")[0],
        aLi = ofixnav.getElementsByTagName("li"),
        aLi_len = aLi.length;

    //每一个图标绑定点击事件
    var oA,
        oSpan;
    for (var j = 0; j < aLi_len; j++) {

        //鼠标进入动画开始，元素变色
        aLi[j].onmouseenter = function () {
            var _this = this;
            oA = _this.firstChild;
            oSpan = _this.firstChild.firstChild;
            oA.style.backgroundColor = "#c81623";
            oSpan.style.display = "block";
            setTimeout(function(){
                animate(oSpan, {"width": 62}, 150);
            },80)

        }

        //鼠标出来恢复原来颜色，动画结束
        aLi[j].onmouseleave = function () {
            var _this = this;
            oA = _this.firstChild;
            oSpan = _this.firstChild.firstChild;
            oA.style.backgroundColor = "#7a6e6e";
            oSpan.style.width = 0;
            oSpan.style.display = "none";
        }
    }

//----------------------------------------------------------左侧固定定位的楼层显示
    var aInf1 = document.getElementsByClassName("inf1"),
        aInf1_len = aInf1.length,
        oFixnav2 = document.getElementsByClassName("fixnav2")[0],
        aA_f = oFixnav2.getElementsByTagName("a"),
        aSpan_f = oFixnav2.getElementsByTagName("span"),
        aLi_f = oFixnav2.getElementsByTagName("li"),
        aLi_f_len = aLi_f.length,
        num;

    //每一个li点击
    for (var j = 0; j < aLi_f_len; j++) {
        aLi_f[j].index = j;
        aLi_f[j].onclick = function () {
            var _this = this;

            //span a初始化 所有span隐藏 a显示
            for (var n = 0; n < aInf1_len; n++) {
                aSpan_f[n].style.display = "block";
                aA_f[n].style.display = "none";
                aInf1[n].firstElementChild.firstElementChild.className="";
            }

            //num用来存储当前显示的那个楼层的索引值
            num = _this.index;

            //点击事件内需要对document.body.scrollTop或htmlElm.scrollTop重置值
            var htm = document.body.scrollTop ? document.body : htmlElm;
            scorll_top(htm, aInf1[_this.index].offsetTop, 1000, scroll);

            //点击事件时，点击的span隐藏，a显示 对应楼层的h3背景色变为黄色
            for (var n = 0; n < aInf1_len; n++) {
                aInf1[n].index = n;
            }
            aSpan_f[_this.index].style.display = "none";
            aA_f[_this.index].style.display = "block";
            aInf1[_this.index].firstElementChild.firstElementChild.className="back";
        }
    }


    //鼠标进入  span隐藏，a显示
    for (var j = 0; j < aLi_f_len; j++) {
        aLi_f[j].index = j;
        aLi_f[j].onmouseenter = function () {
            aSpan_f[this.index].style.display = "none";
            aA_f[this.index].style.display = "block";
        }
    }

    //鼠标离开  a隐藏，span显示
    for (var j = 0; j < aLi_f_len; j++) {
        aLi_f[j].index = j;
        aLi_f[j].onmouseleave = function () {

            //鼠标进入前哪个显示，鼠标离开后仍然显示
            if (this.index == num) {
                return;
            } else {
                aSpan_f[this.index].style.display = "block";
                aA_f[this.index].style.display = "none";
            }
        }
    }

    //scrolltop改变时调用的函数
    function scroll() {
        var htmlElm = document.getElementsByTagName('html')[0];

        //获取scrollTop值
        var scroll_t = document.body.scrollTop || htmlElm.scrollTop;

        //当1f离屏幕顶端<200px时左侧fixnav显示,否则隐藏
        if (aInf1[0].offsetTop - scroll_t < 200) {
            oFixnav2.style.display = "block";
        } else {
            oFixnav2.style.display = "none";
            aInf1[0].firstElementChild.firstElementChild.className="";
        }

        //span a初始化 所有span隐藏 a显示 楼层中H3为绿色
        for (var n = 0; n < aInf1_len; n++) {
            aSpan_f[n].style.display = "block";
            aA_f[n].style.display = "none";
            aInf1[n].firstElementChild.firstElementChild.className="";
        }

        //计算屏幕高度的一半 ;
        var dis = 1 / 2 * window.screen.height;

        for (var n = 0; n < aInf1_len; n++) {
            aInf1[n].index = n;
            var next_h = aInf1[n].offsetHeight;
            var dis_t = aInf1[n].offsetTop - scroll_t;

            //如果哪层楼离屏幕顶点的高度小于dis 大于-(-dis + next_h)，就相应显示这层楼
            if ((dis_t > -(-dis + next_h)) && (dis_t < dis)) {
                aSpan_f[n].style.display = "none";
                aA_f[n].style.display = "block";

                //要显示的这层楼的H3背景色变黄
                aInf1[n].firstElementChild.firstElementChild.className="back";
                num = n;
            }
        }
    }

    //window的scroll事件
    window.onscroll = function () {
        scroll();
    }

    //---------------------------------------------------------------------搜索框
    /* function stp(e){
     var e=e||window.event;
     if(e.keyCode==13){
     e.keyCode=0;
     }
     }
     var oSearch = document.getElementsByClassName("search")[0],
     oForm = oSearch.getElementsByTagName("form")[0],
     oInput = oForm.getElementsByTagName("input")[0],
     sea_aP,
     sea_aP_len,
     idx = 0;

     oInput.onkeyup=function(ev){
     ajax("input_content.txt", fnSucc);
     function fnSucc(data) {
     if (ev.keyCode == 78 || ev.keyCode == 68) {
     var input_content = JSON.parse(data),
     inp_cont_len=input_content.length;
     oBox = document.createElement("div");
     oBox.setAttribute("id", "search_box");
     oSearch.appendChild(oBox);

     if (ev.keyCode == 78) {
     var cont = input_content[0].n;
     }
     if (ev.keyCode == 68) {
     var cont = input_content[1].d;
     }
     for (var i = 0; i < cont.length; i++) {
     var oP = document.createElement("p");
     oP.style.border="1px solid transparent"
     oP.innerHTML += cont[i];
     oBox.appendChild(oP);
     }
     }
     var oBox=document.getElementById("search_box");
     sea_aP = oBox.getElementsByTagName("p");
     sea_aP_len = sea_aP.length;
     sea_aP[0].style.border = "1px solid red";*/
    /*if(oInput.value!=""&&oInput.value!="卡通手机壳"){
     var m=0;
     for(var i=0;i<inp_cont_len;i++){
     for (var key in input_content[i]){
     var lens=input_content[i][key].length;
     for(var j=0;i<lens;j++){
     var conts=input_content[i][key][j];
     var re=new RegExp(conts);
     if(re.test(oInput.value)){
     m++;
     if(m==1){
     oBox.innerHTML="";
     }
     var oP = document.createElement("p");
     oP.innerHTML += conts;
     oP.style.border="1px solid transparent";
     oP.innerHTML += conts;
     oBox.appendChild(oP);
     }
     }
     }
     }
     }*/

    /* function updown(flag){
     flag?idx++:idx--;
     if(sea_aP_len){
     if (idx == sea_aP_len&&flag) {
     idx = 0;
     }
     if (idx == -1&&(!flag)) {
     idx = sea_aP_len-1;
     };
     for (var i = 0; i < sea_aP_len; i++) {
     sea_aP[i].style.border = "1px solid transparent";
     }
     sea_aP[idx].style.border = "1px solid red";
     }
     }


     if (ev.keyCode == 40) {
     updown(true);

     }
     if (ev.keyCode == 38) {
     updown(false);
     }
     if(ev.keyCode==13){
     ev.keyCode==0;
     if(sea_aP_len){
     oInput.value=sea_aP[idx].innerHTML;
     }
     ev.preventBubble();
     return false;
     }
     //备用选项的点击事件
     for(var i=0;i<sea_aP_len;i++){
     sea_aP[i].onclick=function(){
     oInput.value=this.innerHTML;
     this.style.cursor="pointer";
     for (var i = 0; i < sea_aP_len; i++) {
     sea_aP[i].style.border = "1px solid transparent";
     }
     this.style.border = "1px solid red";
     oBox.style.display="none";
     }
     }
     }*/

    // -------------------------------------------------------------------京东快报 更多
    var oFloor1=document.getElementsByClassName("floor1")[0],
        oTxt=oFloor1.getElementsByClassName("txt")[0],
        oDl=oTxt.getElementsByTagName("dl")[0],
        oMore=oDl.getElementsByTagName("a")[0],
        aDd=oDl.getElementsByTagName("dd"),
        D_num=0,
        aDd_len=aDd.length;

    //快报上的更多地点击事件
    oMore.onclick=function(){
        D_num++;
        if(D_num==(aDd_len/5+1)){
            D_num=1;
        }
        //让一批dd移向左边，后面的一批左浮，会进行补位
        for(var i=5*D_num-5;i<5*D_num;i++){
            aDd[i].style.marginLeft=-232+"px";
        }

        //当num=3，即组后一批时，其他的已经全部移到了左边，此时将所有dd归回原位
        if(D_num==(aDd_len/5)){
            for(var i=0;i<aDd_len;i++){
                aDd[i].style.marginLeft=0;
            }
        }
    }

    //-----------------------------------------------------------------img图片鼠标hover事件


    //floor2 猜你喜欢
    var oFloor2=document.getElementsByClassName("floor2")[0],
        aLi_f2=oFloor2.getElementsByTagName("li"),
        aLi_f2_len=aLi_f2.length;

    function displacement(obj,len,flag){
        for(var i=0;i<len;i++){

            //li里面没有图片，只有一条线的就跳出循环
            if(obj[i].className=="line"){
                continue;
            }

            //鼠标进入盒子时，它下面的图片发生位移
            obj[i].onmouseenter=function(){
                var oImg_f2=this.getElementsByTagName("img")[0];
                flag?animate(oImg_f2, {"margin-top": -6}, 200):animate(oImg_f2, {"margin-left": -10}, 200)
            }

            //鼠标出来盒子时，它下面的图片归回原味
            obj[i].onmouseleave=function(){
                var oImg_f2=this.getElementsByTagName("img")[0];
                flag?animate(oImg_f2, {"margin-top": 0}, 200):animate(oImg_f2, {"margin-left": 0}, 200)
            }
        }
    }
    displacement(aLi_f2,aLi_f2_len,true);

    //---------------------------------------------------------------------猜你喜欢上的换一批点击事件

    var oTop_floor2=oFloor2.getElementsByTagName("a")[0],
        n=0;

    oTop_floor2.onclick=function(){
        n++;
        if(11*n+11<=aLi_f2_len){
            replace("none","block");
        };
        if(11*n+11>aLi_f2_len){
            n=1;
            replace("block","none");
            n=0;
        }
    }
    function replace(state,disstate){
        for(var i=n*11-11;i<11*n;i++){
            aLi_f2[i].style.display=state;
        }
        for(var i=n*11-11+11;i<11*n+11;i++){
            aLi_f2[i].style.display=disstate;
        }
    }


    //floor3  京东品质生活  下的图片
    var oFloor3=document.getElementsByClassName("floor3")[0],
        aPic_f3=oFloor3.getElementsByClassName("pic"),
        aPic_f3_len=aPic_f3.length;
    displacement(aPic_f3,aPic_f3_len,false);

    //---------------------------------------------------------------------每层楼标题上的选项卡
    function inf1_12(i){
        var oTop=aInf1[i].getElementsByClassName("top")[0],
            aA_inf1=oTop.getElementsByTagName("a"),
            aA_inf1_len=aA_inf1.length,
            aMid=aInf1[i].getElementsByClassName("mid"),
            aUl_inf1=oTop.getElementsByTagName("ul")[0],
            mid_n=0;
        aMid_len=aMid.length;

        //初始化，让第一个mid显示
        aMid[0].style.left=0;

        //标题是哪个的li座记号
        for(var i=0;i<aA_inf1_len;i++){
            aA_inf1[i].index=i;
        }
        oTop.onmouseover=function(ev){
            var ev=ev||event,
                ele=ev.target;
            if(ele==this){
                return;
            }
            if(ele.tagName=="A"){
                for(var i=0;i<aMid_len;i++){
                    if(i!=mid_n){
                        aMid[i].style.left="1210px";
                    }
                }
                animate(aMid[mid_n],{"left":-1210},120);
                animate(aMid[ele.index],{"left":0},120);
                mid_n=ele.index;
            }
        }

        //鼠标从所有的li上离开的时候，也就是鼠标离开ul时
        aUl_inf1.onmouseleave=function(){
            if(mid_n==0){
                return;
            }

            //让当前显示的移动到-1210的位置
            animate(aMid[mid_n],{"left":-1210},120);

            //让第一个移动到1210的位置 然后动画显示；
            aMid[0].style.left="1210px";
            animate(aMid[0],{"left":0},120);
            mid_n=0;
        }
    }
    for(var z=0;z<aInf1_len;z++){
        inf1_12(z);
    }

    //-----------------------------------------------------------------------------话费充值
    var oPic_text=document.getElementsByClassName("pic-text")[0],
        oPic_text_list=oPic_text.getElementsByClassName("pic-text-list")[0],
        aLi_pic_txt=oPic_text.getElementsByTagName("li"),
        oFour_pic_txt=oPic_text.getElementsByClassName("four")[0],
        aTitle_four_pic_txt=oFour_pic_txt.getElementsByClassName("title")[0],
        aA_aTitle_four_pic_txt=aTitle_four_pic_txt.getElementsByTagName("a"),
        aPhofare=oFour_pic_txt.getElementsByClassName("phofare"),
        oClose=oFour_pic_txt.getElementsByClassName("close")[0],
        game;//在点击了X之后用来判断用来判断鼠标是否离开过第四个游戏格子

    //将十二宫格的前四个加编号 并给他们自定义属性c为0；
    for(var i=0;i<4;i++){
        aLi_pic_txt[i].index=i;
        aA_aTitle_four_pic_txt[i].index=i;
        aA_aTitle_four_pic_txt[i].c=0;
    }

    //鼠标离开游戏格子后将其赋值为false；
    aLi_pic_txt[3].onmouseleave=function(){
        game=false;
    }

    for(var i=0;i<4;i++) {

        //第一排四个宫格的鼠标进入事件
        aLi_pic_txt[i].onmouseenter = function () {

            //只有在最初以及点了X后鼠标离开了游戏格子以后不用return；
            if (game) {
                return;
            }

            //鼠标点击关闭X 恢复原本的显示 game=true；
            oClose.onclick = function () {
                oPic_text_list.style.display = "block";
                oFour_pic_txt.style.display = "none";
                game = true;
                oFour_pic_txt.style.top="30px";
            }

            //设初值
            for (var j = 0; j < 4; j++) {
                aPhofare[j].style.display = "none";
                aA_aTitle_four_pic_txt[j].className = "";
                aA_aTitle_four_pic_txt[j].index = j;
            }

            //相应宫格下的内容显示  相应标题加顶部的颜色；
            oPic_text_list.style.display = "none";
            oFour_pic_txt.style.display = "block";
            animate(oFour_pic_txt, {"top": 0}, 400);
            aPhofare[this.index].style.display = "block";
            aA_aTitle_four_pic_txt[this.index].className = "acc";

            for (var i = 0; i < 4; i++) {

                //宫格消息 后的相应标题的鼠标进入事件
                aA_aTitle_four_pic_txt[i].onmouseenter = function () {

                    //设初值
                    for (j = 0; j < 4; j++) {
                        aA_aTitle_four_pic_txt[j].className = "";
                        aPhofare[j].style.display = "none";
                    }

                    //相应标题加背景色 相应内容显示
                    this.className = "acc";
                    aPhofare[this.index].style.display = "block";

                    //找出鼠标进入的标题里的内容
                    var _th_inx=this.index,
                        oCharge = aPhofare[_th_inx].getElementsByClassName("charge")[0],
                        oPurchase = aPhofare[_th_inx].getElementsByClassName("purchase")[0],
                        aLi_oPurchase = oPurchase.getElementsByTagName("li"),
                        aA_oCharge = oCharge.getElementsByTagName("a"),
                        aA_oCharge_len = aA_oCharge.length;

                    //鼠标进入的标题里的小标题编号
                    for (var j = 0; j < aA_oCharge_len; j++) {
                        aA_oCharge[j].index = j;
                    }

                    for (var j = 0; j < aA_oCharge_len; j++) {
                        //小标题的鼠标进入事件；
                        aA_oCharge[j].onmouseenter = function () {

                            //设初值
                            for(var z=0;z<aA_oCharge_len;z++){
                                aA_oCharge[z].className = "";
                            }

                            //给自己加背景色
                            this.className = "b6";

                            //this.c 用来存放上次进入的小标题的索引，没有则为0；
                            if(this.c==this.index){
                                return;
                            }

                            //让上次显示的 动画移动到左边，这侧的移到可以显示出来的位置，动画结束所有的移到右边
                            animate(aLi_oPurchase[aA_aTitle_four_pic_txt[_th_inx].c],{"left":-250},150,function(){
                                for(var m=0;m<aA_oCharge_len;m++){
                                    aLi_oPurchase[m].style.left="250px";
                                }
                            })
                            animate(aLi_oPurchase[this.index],{"left":0},150);
                            aA_aTitle_four_pic_txt[_th_inx].c=this.index;
                        }
                    }
                }
            }

        }


    }

    //输入手机号的input框
    var oTelnum=oFour_pic_txt.getElementsByClassName("telnum"),
        oTelnum_len=oTelnum.length;
    for(var i=0;i<oTelnum_len;i++){
        oTelnum[i].onblur=function(){

            //只能输入11位数字
            var re=/^[0-9]{11}$/;

            //若不是11位数字 则作出提醒
            if(!re.test(this.value)){
                this.parentElement.lastElementChild.innerHTML="*不符合规定";
                /* this.placeholder="*"*/
            }else{
                this.parentElement.lastElementChild.innerHTML="";
            }
        }
    }

    //找到多选框
    var oMany=oFour_pic_txt.getElementsByClassName("many"),
        oMany_len=oMany.length,

        //多选框对应的不同价格存入数组
        arr=[];
    arr[0]=["￥9.8-￥11","￥19.6-￥21.0","￥29.4-￥31","￥49-￥50","￥98-￥100","￥196-￥200","￥294-￥300"];
    arr[1]=["￥9.5-￥10","￥19.5-￥20.0","￥29.5-￥30","￥38.5-￥40","￥47.5-￥50"];
    arr[2]=["￥9.8-￥11","￥19.6-￥21.0","￥29.4-￥31","￥49-￥50","￥98-￥100","￥196-￥200","￥294-￥300","￥398-￥400","￥496-￥500","￥594-￥600"];
    arr[3]=["￥4.9-￥5.1","￥9.9-￥10.1","￥99.8-￥100"];
    arr[4]=["￥4.9-￥5.1","￥9.9-￥10.1","￥99.8-￥100"];

    //多选框添加编号，以及多选框内的option添加value
    for(var i=0;i<oMany_len;i++){
        oMany[i].index=i;
        var aOption=oMany[i].getElementsByTagName("option"),
            aOption_len=aOption.length;
        for(var j=0;j<aOption_len;j++){
            aOption[j].value=j;
        }
    }

    //多选框内的value值发生变化时 价格相应改变；
    for(var i=0;i<oMany_len;i++){
        oMany[i].onchange=function(){
            if(this.index==1){
                this.parentElement.nextElementSibling.lastElementChild.innerHTML=arr[this.index][this.value];
            }else{
                this.parentElement.lastElementChild.innerHTML=arr[this.index][this.value];
            }
        }
    }

    //单程 往返只能选一个
    var oWay=oFour_pic_txt.getElementsByClassName("way");
    function path(i){
        var aPath=oWay[i].getElementsByClassName("path"),
            aPath_len=aPath.length;
        for(var j=0;j<aPath_len;j++){

            //当点击某个时，当前checked=true其他checked=false
            aPath[j].onclick=function(){
                for(var z=0;z<aPath_len;z++){
                    aPath[z].checked=false;
                    console.log(aPath[z])
                }
                this.checked=true;
            }
        }
    }
    path(0);
    path(1);
}