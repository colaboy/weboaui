// JavaScript Document

//固定表格

(function($){
    var fixTables={};
    $.fixTable=function(options){
        //定义全局变量
        var s={};
        s.params={};
        //设置接收参数及默认值
        var defaults ={
            tableID:'',//要设置的TableID
            onScroll:null,
            onBottomRefresh:null
        };
        //转换接收来的参数值
        $.extend(true,s.params,defaults, options);

        //容器ID
        var tableID=s.params.tableID;

        //得到表格本身
        s.$table=$("#"+tableID);
        if(s.$table.length==0){
            return;
        }

        //得到头和身体容器
        s.$headContainer=s.$table.find(".fixTable-headContainer");
        s.$bodyContainer=s.$table.find(".fixTable-bodyContainer");
        //得到头和身体内嵌容器
        s.$headContainerInner=s.$table.find(".fixTable-headContainerInner");
        s.$bodyContainerInner=s.$table.find(".fixTable-bodyContainerInner");
        //得到头和身体表格
        s.$headTable=s.$table.find(".fixTable-headTable");
        s.$bodyTable=s.$table.find(".fixTable-bodyTable");
        //控制表格实际大小
        function updateTableWidth(){
            var tableInnerW=s.$bodyTable.outerWidth();
            s.$headTable.width(tableInnerW);
            s.$bodyTable.width(tableInnerW);
            s.$headTable.find("thead td").each(function(i,n){
                var width=s.$bodyTable.find("thead td").eq(i).width();
                $(this).width(width);
            });
        }
        updateTableWidth();
        //底部刷新
        s.isBottomRefreshed=false;
        function onBottomRefresh(){
            //底部无数据、底部正在刷新、下拉中、头部刷新的情况，不执行
            if(s.isBottomRefreshed)return;

            s.isBottomRefreshed=true;
            //CallBack onBottomRefresh
            if(s.params.onBottomRefresh)s.params.onBottomRefresh(s);
        }
        //判断是否有滚动条
        s.hasScroll=function(){
            var clientHeight=s.$bodyContainer[0].clientHeight || window.innerHeight;
            var scrollHeight=s.$bodyContainer[0].scrollHeight || document.body.scrollHeight;
            var scrollTop=s.$bodyContainer[0].scrollTop || document.body.scrollTop;
            //console.log(clientHeight+":"+scrollHeight+":"+scrollTop);

            if(clientHeight == scrollHeight){
                return false;
            }
            return true;
        };
        //设置监听事件
        if(!fixTables[tableID]){
            fixTables[tableID]=true;
            $(window).resize(function() {
                updateTableWidth();
            });
            s.$bodyContainer.scroll(function(e){
                if(s.params.onScroll)s.params.onScroll(s);
                //横向滚动，则挪动位置
                var scrollLeft=$(this).scrollLeft();
                s.$headContainer.scrollLeft(scrollLeft);
                //滚动至底部
                var clientHeight=this.clientHeight || window.innerHeight;
                var scrollHeight=this.scrollHeight || document.body.scrollHeight;
                var scrollTop=this.scrollTop || document.body.scrollTop;

                if(scrollTop + clientHeight >= scrollHeight-2){
                    onBottomRefresh();
                }
            });
        }
        //设置是否已包含监听
        s.clearListener=function(){
            fixTables[tableID]=false;
        }
        return s;
    }
})(jQuery);