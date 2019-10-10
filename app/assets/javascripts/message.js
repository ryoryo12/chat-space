$(function() {
  function createImage(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
  }

  function buildHTML(message){
      var html = `<div class="message" data-id="${message.id}">
                    <div class="message__upper">
                      <div class="upper__name">
                        ${message.user_name}
                      </div>
                      <div class="upper__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="message-text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${createImage(message)}  
                  </div>`
    return html
  }

  $("#new_message").on('submit',function(){
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message)
      $('div').animate({scrollTop: $('.messages').height()})
      $('.messages').append(html)
      $('form')[0].reset();
    })
    .fail(function(){
      alert('messageか画像を入力してください')
    })
    return false;
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.message:last').data("id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML); 
        $('div').animate({scrollTop: $('.messages').height()})
        })
      })
      .fail(function() {
        alert('更新に失敗しました');
      });
    };
  } 
  setInterval(reloadMessages, 5000); 
});