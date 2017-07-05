/**
 * Created by lrt on 2017/5/13.
 */
$(function(){
    //--------------------------------------input 框自动监测内容改变 显示备选项  使用jqueryui 插件
    $( ".search input:eq(0)" ).autocomplete({
        source: [ "男装", "女装", "书籍", "家电", "手机", "家具", "男鞋","女鞋" ]
    });

});
window.onload=function(){
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

}
