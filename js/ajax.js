/**
 * Created by lrt on 2017/5/7.
 */
// JavaScript Document
function ajax(url, ok_fn, err_fn){ //地址  成功  错误
    //console.log(url)

    //1.创建Ajax对象
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
    };

    //2.连接服务器（打开和服务器的连接）
    oAjax.open('GET', url, true);

    //3.发送
    oAjax.send();

    //4.接收
    oAjax.onreadystatechange=function (){

        if(oAjax.readyState==4)	{

            if(oAjax.status==200){
                //alert('成功了：'+oAjax.responseText);
                ok_fn(oAjax.responseText);
            }else{
                //alert('失败了');
                err_fn && err_fn();
            }
        }
    };
}