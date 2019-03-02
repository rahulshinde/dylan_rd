Site = {}

$(document).ready(function(){
  Site.body = $('body');
  Site.window_height = $(window).height();
  Site.window_width = $(window).width();
  Site.document_height = $(document).height() - Site.window_height;
  var font_size = parseInt($('html').css('font-size'));
  Site.image_width = 0;

  Site.slideshow_next = $('#slide_next');
  Site.slideshow_prev = $('#slide_prev');

  // if (Site.body.hasClass('project_page')){
  //   setTimeout(function(){
  //     Site.body.addClass('hide_nav');
  //   }, 2000);
  // }

  if (Site.body.hasClass('slideshow')){
    Site.setupSlideshow();
  }

  Site.slideshow_next.on('click', Site.slideshowNext);
  Site.slideshow_prev.on('click', Site.slideshowPrev);
  $('#open_gallery').on('click', Site.toggleGallery);
  $('#home_link').on('click', Site.openBlinds);

  Site.curtain_height = $('#curtain').outerHeight();

  if (Site.body.hasClass('side_scroll')){
    $(document).imagesLoaded(function(){
      $('.project_image').each(function(){
        Site.image_width = Site.image_width + $(this).outerWidth() + (0.75 * font_size);
      });
    })

    if (Site.window_width > 1050){
      Site.image_width = Site.image_width - Site.window_width;
    } else{
      Site.image_width = Site.image_width - Site.window_width + (2 * font_size);
    }

    $(window).on('scroll', Site.scrollProject);
  }
})

Site.scrollProject = function(){
  var scroll = $(document).scrollTop();
  Site.scroll_position = scroll/Site.document_height * Site.image_width;
  console.log(Site.image_width);
  $('#works_wrapper').css('transform', 'translateX(-' + Site.scroll_position  + 'px)')
}

Site.openBlinds = function(){
  $('#site').addClass('blinds_open');
}


Site.setupSlideshow = function(){
  Site.slideshow_length = $('.slide').length;
  Site.current_slide = 1;
  Site.current = $('#current_slide');
  Site.current.html(Site.current_slide);
  $('#total_slides').html(Site.slideshow_length);

  $(document).on('keyup', Site.keyCommand);
}

Site.keyCommand = function(e){
  if(e.keyCode === 37){
    Site.slideshowPrev();
  }
  if(e.keyCode === 39){
    Site.slideshowNext();
  }
}

Site.slideshowNext = function(){
  Site.current_slide = Site.current_slide + 1;
  if (Site.current_slide > Site.slideshow_length){
    Site.current_slide = 1;
  }

  $('.slide').removeClass('current');
  $('.slide' + Site.current_slide).addClass('current');
}

Site.slideshowNext = function(){
  Site.current_slide = Site.current_slide + 1;
  if (Site.current_slide > Site.slideshow_length){
    Site.current_slide = 1;
  }

  $('.slide').removeClass('current');
  $('.slide' + Site.current_slide).addClass('current');
  Site.current.html(Site.current_slide);
}

Site.slideshowPrev = function(){
  Site.current_slide = Site.current_slide - 1;
  console.log(Site.current_slide);
  if (Site.current_slide < 1){
    Site.current_slide = Site.slideshow_length;
  }

  $('.slide').removeClass('current');
  $('.slide' + Site.current_slide).addClass('current');
  Site.current.html(Site.current_slide);
}


Site.toggleGallery = function(){
  Site.body.toggleClass('gallery_open');
}