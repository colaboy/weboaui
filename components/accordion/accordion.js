
/**
 * 手拉风琴菜单
 */
(function ($) {
  /*手风琴控件-父节点*/
  $(".accordion-title").click(function(){
    if($(this).hasClass("active")){
      $(this).removeClass("active");
      $(this).next().slideUp();
      return;
    }
    //互斥
    if($(".accordion").hasClass("accordion-mutex")){
      $(this).parent().siblings().find(".accordion-title").removeClass("active");
      $(this).parent().siblings().find("ul").slideUp();
    }
    $(this).addClass("active");
    $(this).next().slideDown();
  });
})(jQuery);