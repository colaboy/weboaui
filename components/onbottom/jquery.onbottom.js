// JavaScript Document

//底部刷新

(function($){
    $.fn.onbottom=function(options){
        //定义全局变量
        var s={};
        s.params={};
        //设置接收参数及默认值
        var defaults ={
            onBottomRefresh:null
        };
        //转换接收来的参数值
        $.extend(true,s.params,defaults, options);
        var container = $(this)[0];
        //得到表格本身
        var $container=$(this);
        if($container.length==0){
            return;
        }

        //底部刷新
        s.isBottomRefreshed=false;
        s.onBottomRefresh=function(){
            //底部无数据、底部正在刷新、下拉中、头部刷新的情况，不执行
            if(s.isBottomRefreshed)return;

            s.isBottomRefreshed=true;
            //CallBack onBottomRefresh
            if(s.params.onBottomRefresh)s.params.onBottomRefresh(s);
        }
        //判断是否有滚动条
        s.hasScroll=function(){
            var clientHeight=container.clientHeight || window.innerHeight;
            var scrollHeight=container.scrollHeight || document.body.scrollHeight;
            var scrollTop=container.scrollTop || document.body.scrollTop;
            //console.log(clientHeight+":"+scrollHeight+":"+scrollTop);

            if(clientHeight == scrollHeight){
                return false;
            }
            return true;
        }
        //设置监听事件
        if(!$container.hasOnBottom){
            $container.hasOnBottom=true;
            $container.bind("scroll",function(e){
                //滚动至底部
                var clientHeight=this.clientHeight || window.innerHeight;
                var scrollHeight=this.scrollHeight || document.body.scrollHeight;
                var scrollTop=this.scrollTop || document.body.scrollTop;

                if(scrollTop + clientHeight >= scrollHeight-2){
                    s.onBottomRefresh(s);
                }
            });
        }
        //设置是否已包含监听
        s.clearListener=function(){
            $container.unbind("scroll");
            $container.hasOnBottom=false;
        }
        return s;
    }
})(jQuery);