

function animate(obj,modeJson,speed,fn){ //对象  要运动的模式  速度
    var def_speed={//默认速度
        fast:400,
        normal:800,
        slow:1600
    };
    //判断速度的默认值
    if(speed){
        if(typeof speed=="string"){//传入的是字符串
            speed=def_speed[speed];
        }
    }else{
        speed=def_speed.normal;
    };
    //---------------------------------------------
     var m_style=getComputedStyle(obj,null);//读取初始值
     var   start={},
            dis={},
            count=parseInt(speed/27),//通过时间,计算步数
            step={};
    for(var key in modeJson){
        start[key]=parseInt(m_style[key]);
        dis[key]=modeJson[key]-start[key];
        step[key]=dis[key]/count;
    };
    var i=0;
    clearInterval(obj.timer);//用对象的自定义属性作为定时的变量
    obj.timer=setInterval(function(){
        i++;
        for(var key in modeJson){
            obj.style[key]=start[key]+step[key]*i+"px";
        };

        if(i==count){
            clearInterval(obj.timer);
            fn && fn();
        };
    },27);

};

//滚动条高度的动画
function scorll_top(obj,c_s_t,speed,fn){
    var i=0,
        n_s_t=obj.scrollTop,
        dis_t=c_s_t-n_s_t,
        count=parseInt(speed/30),//通过时间,计算步数
        step=dis_t/count;
    clearInterval(obj.timer);//用对象的自定义属性作为定时的变量
    obj.timer=setInterval(function(){

        //页面滚动时，关掉 window.onscroll事件
        window.onscroll=null;
        i++;
        obj.scrollTop=n_s_t+step*i;
        if(i==count){
            clearInterval(obj.timer);

            //页面滚动结束时，开启window.onscroll事件
            window.onscroll=function(){
                fn();
            }
        };
    },30);
}

