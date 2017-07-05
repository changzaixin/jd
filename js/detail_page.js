/**
 * Created by lrt on 2017/5/13.
 */


$(function() {
    //-------------------------------------------------放大镜
    //将小中大三种图分别存放在数组中；
    var arr=["1","2","3","4","5","6"];
    var arr_s=["01","02","03","04","05","06"];
    var arr_b=["001","002","003","004","005","006"];
    var flag=true;

    //最小图鼠标进入  自己加ac 兄弟移除ac 并更改中图的地址
    $(".pic-list").find("li").mouseenter(
        function () {
            $(this).addClass("ac").siblings().removeClass("ac");
            var i=$(this).index();
            var oImg=$(".big-pic").children("img")
            oImg.prop("src","images/"+arr_s[i]+".jpg");
        });

    //中图鼠标进入 放大镜span显示 大图页开始移动
    $(".big-pic").hover(
        function(ev){
            var _this=$(this);
            var oSpan=_this.children("span");
            oSpan.show();

            //放大镜显示后  根据小图的索引值对应找出大图
            $(".pic-list").find("li").each(function(index){
                var n=$(".pic-list").find(".ac").index();
                _this.children(".zoom_pic").show().children("img").prop("src","images/"+arr_b[n]+".jpg");
            });

            //鼠标移动放大镜跟着移动
            _this.mousemove(function(ev){
                var dis_l=_this.offset().left+oSpan.width()/2;
                var dis_t=_this.offset().top+oSpan.height()/2;
                var l=ev.pageX-dis_l;
                var t=ev.pageY-dis_t;
                if(l<0){
                    l=0;
                };
                if(l>_this.width()-oSpan.width()){
                    l=_this.width()-oSpan.width();
                }
                if(t<0){
                    t=0;
                };
                if(t>_this.height()-oSpan.height()){
                    t=_this.height()-oSpan.height();
                }
                oSpan.css({"left":l,"top":t});
                var l_rate=($(".zoom_pic").children("img").width()-$(".zoom_pic").width())/(_this.width()-oSpan.width());
                var t_rate=($(".zoom_pic").children("img").height()-$(".zoom_pic").height())/(_this.height()-oSpan.height());
                $(".zoom_pic").children("img").css({"left":-l*l_rate,"top":-t*t_rate})
            })


        },

        //鼠标从中图移出 放大镜。大图都隐藏
        function(){
            $(".zoom_pic").hide();
            $(".big-pic").children("span").hide();

        }
    );
    $(".zoom_pic").mouseenter(function(){
        $(".zoom_pic").hide();
        $(".big-pic").children("span").hide();
    })


    //-----------------------------------------------------------前后点击换图
    var e=0,
        len_li=$(".pic-list").find("li").length;

    //点击下一个按钮 第e个（初始为0）隐藏
    $(".nextbtn").click(function(){
        if(e>=len_li-5){
            return;
        }
        else{
            $(".pic-list").find("li").eq(e).hide().siblings().show();

        }
        e++;

    });
    //点击上一个按钮 第len_li-e个（当下一个点后后的初始为最后一个）隐藏
    $(".prebtn").click(function(){
        if(e<=0){
            e=0;
            return;
        }
        else{
            $(".pic-list").find("li").eq(len_li-e).hide().siblings().show();
        }
        e--;
    });
    $(".nextbtn").hover(
        function(){
            if(e<len_li-5){
                $(this).addClass("hov");
            }
        },
        function(){
            $(this).removeClass("hov");
        }
    )
    $(".prebtn").hover(
        function(){
            if(e>0){
                $(this).addClass("hov");
            }
        },
        function(){
            $(this).removeClass("hov");
        }
    )
    //-------------------------------------------------------------------------选择尺码

    var n;//n用来存放已经被选中的尺码的索引值；

    //选择各个尺寸的点击事件
    $(".size").find("li").click(function(){
        if($(this).index()==n){
            $(this).removeClass("ac");
            n=null;
        }else{
            $(this).addClass("ac").siblings().removeClass("ac");
            //将被选中的记录下来
            n=$(this).index();
        }
    }).hover(
        function(){
            $(this).addClass("ac");
        },
        function(){
            //将被点击选中的保留
            if($(this).index()==n){
                return;
            }else{
                $(this).removeClass("ac");
            }
        }
    );


    //------------------------------------------加减数量的的按钮
    var z=1;

    //数量为1时减少按钮不可点
    $(".reduce").prop("disabled",true);
    $(".reduce").css("cursor","not-allowed");
    $(".add").css("cursor","pointer");

    //增加按钮
    $(".add").click(function(){
        z++;
        $(".box input").val(z);
        $(".reduce").prop("disabled",false);
        $(".reduce").css("cursor","pointer");
    });
    //减少按钮
    $(".reduce").click(function(){
        z--;
        $(".box input").val(z);
        if(z==1){
            $(".reduce").css("cursor","not-allowed");
            $(".reduce").prop("disabled",true);
        }
    });


    //------------------------------------------------选项卡
    $(".switchover").find("li").click(function(){
        //给自己加类名
        $(this).addClass("switch-ac").siblings().removeClass("switch-ac");
        var i=$(this).index();
        //对应的内容显示
        $(".switchover-cont").addClass("hide");
        $('.switchover-cont:eq('+i+')').removeClass("hide");
    });

    //-------------------------------------------------------------------全部商品分类
    //点击全部商品分类时  它下面的NAV显示
    var timer;
    $(".all").hover(
        function() {
            $(".floor1 .nav").show();
            $(this).children("i").addClass("aci");
            clearTimeout(timer);
        },
        function(){
            timer=setTimeout(function(){
                $(".floor1 .nav").hide();
                $(this).children("i").removeClass("aci");
            },200)
        }
    );
    $(".floor1 .nav li").hover(
        function(){
            $(this).children(".son").show();
        },
        function(){
            $(this).children(".son").hide();
        }
    );
    $(".floor1 .nav").hover(
        function(){
            $(".floor1 .nav").show();
            clearTimeout(timer);

        },
        function(){
            $(".floor1 .nav").hide();
            $(".all i").removeClass("aci");
        }
    )


    //-------------------------------------------------------选地址
    //u用来判断ul里面有没有地址1---有 0---没有
    var u=1,
        timer;
    var data=cityArr;
    function success(data){
            function prov(){
                for (var i = 0; i < data.length; i++) {
                    if (data[i].item_code % 10000 == 0) {
                        $(".box1 ul").append("<li></li>");
                        $(".box1 ul").children().last().data("code",data[i].item_code);
                        $(".box1 ul").children().last().html(data[i].item_name);
                    }
                }
            }
            //鼠标进入 地址框  地址下的box出现
            $(".delivery .province").hover(
                function() {
                    $(this).children("i").addClass("iac");
                    $(".delivery .box1").show();
                    if(u==1){
                        prov();
                        u=0;
                    }
                }
                ,
                //鼠标离开 地址框  地址下的box消失
                function(){
                        timer=setTimeout(function(){
                        $(".box1").hide();
                    },200)
                }
            );
            //省市县的点击事件
            $(".downline span").click(function(){
                $(this).addClass("acspan").siblings().removeClass("acspan");
                //如果是省 则将省加进来
                if($(this).index()==0){
                    $(".delivery .box1").show();
                    $(".box1 ul").html("");
                    prov();
                }
                var m;
                //如果是市  要判断省是什么  把省下面的市加进来；
                if($(this).index()==1){
                    var htm3=$(".downline span").first().html().trim();
                    for(j=0;j<data.length;j++){
                        if(data[j].item_name==htm3){
                            m=data[j].item_code;
                            break;
                        }
                    }
                    $(".box1 ul").html("");
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].item_code!=m&&parseInt(data[i].item_code/10000)==m/10000&&data[i].item_code%100==0){
                            $(".box1 ul").append("<li>"+data[i].item_name+"</li>");
                            $(".box1 ul").children().last().data("code",data[i].item_code);
                            $(".downline span:eq(2)").html("请选择");
                        }
                    }
                    $(".delivery .province").html(  $(".downline span:eq(0)").html()+" "+$(".downline span:eq(1)").html()+" "+$(".downline span:eq(2)").html()+"<i class='iac'>◇</i>");
                    blank_width();
                }
                //如果是县 要判断市是什么  把市下面的县加进来；
                if($(this).index()==2){
                    var htm4=$(".downline span").eq(1).html().trim();
                    for(j=0;j<data.length;j++){
                        if(data[j].item_name==htm4&&data[j].item_code%10000!=0){
                            m=data[j].item_code;
                            break;
                        }
                    }
                    $(".box1 ul").html("");
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].item_code!=m&&parseInt(data[i].item_code/100)==m/100){
                            $(".box1 ul").append("<li>"+data[i].item_name+"</li>");
                            $(".box1 ul").children().last().data("code",data[i].item_code);
                            var htm2=$(".box1 ul li").first().html();
                            $(".downline span:eq(2)").html(htm2);
                        }
                    }
                    blank_width()
                }
            });
            //事件委派到各个地址上
            $(".delivery").on("click","li",function(){
                var htm=$(this).html(),
                    this_code=$(this).data("code");
                //如果你点的这个为省，先把省放在它的位置 ，找出这个省下的市 并显示出来
                if(this_code%10000==0){
                    $(".downline span:eq(0)").html(htm);
                    $(".downline span:eq(0)").data("code",this_code);
                    $(".box1 ul").html("");
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].item_code!=this_code&&parseInt(data[i].item_code/10000)==this_code/10000&&data[i].item_code%100==0){
                            $(".box1 ul").append("<li>"+data[i].item_name+"</li>");
                            $(".box1 ul").children().last().data("code",data[i].item_code);
                            $(".downline span:eq(1)").addClass("acspan").siblings().removeClass("acspan");
                            var htm1=$(".box1 ul li").first().html();
                            $(".downline span:eq(1)").html(htm1);
                            $(".downline span:eq(2)").html("请选择");
                        }
                    }
                    $(".delivery .province").html(  $(".downline span:eq(0)").html()+$(".downline span:eq(1)").html()+$(".downline span:eq(2)").html()+"<i class='iac'>◇</i>");
                    blank_width()
                }
                //如果你点的这个为市，先把市放在它的位置 ，找出这个市下的县并显示出来
                if(this_code%10000!=0&&this_code%100==0){
                    $(".downline span:eq(1)").html($(this).html());
                    $(".downline span:eq(1)").data("code",this_code);
                    $(".box1 ul").html("");
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].item_code!=this_code&&parseInt(data[i].item_code/100)==this_code/100){
                            $(".box1 ul").append("<li>"+data[i].item_name+"</li>");
                            $(".box1 ul").children().last().data("code",data[i].item_code);
                            $(".downline span:eq(2)").addClass("acspan").siblings().removeClass("acspan");
                            var htm2=$(".box1 ul li").first().html();
                            $(".downline span:eq(2)").html(htm2);
                        }
                    }
                    $(".delivery .province").html(  $(".downline span:eq(0)").html()+$(".downline span:eq(1)").html()+$(".downline span:eq(2)").html()+"<i class='iac'>◇</i>");
                    blank_width()
                }
                //如果你点的这个为县，把县放在它的位置
                if(this_code%100!=0){
                    $(".downline span:eq(2)").html($(this).html());
                    $(".downline span:eq(2)").data("code",this_code);
                    $(".delivery .province").html(  $(".downline span:eq(0)").html()+$(".downline span:eq(1)").html()+$(".downline span:eq(2)").html()+"<i class='iac'>◇</i>");
                    $(".box1").hide();
                    $(".delivery .province").removeClass("iac");
                    blank_width()

                }
            })
        }
    success(data);
    //新增收货地址同一行的下三角   可以收起、放出地址
    $(".box1 i").click(function(){
        $(this).toggleClass("iac");
        $(".downline,.downline1,.box1 ul").toggle();
    });
   $(".box1").hover(
        function(){
            $(this).show();
            clearTimeout(timer);
        },function(){
            $(this).hide();
        }
    );
    function blank_width(){
        var wid=$(".box1").width()-$(".province").width()+1;
        $(".box1 .blank").css("width",wid+"px");

    }
    blank_width();




});
