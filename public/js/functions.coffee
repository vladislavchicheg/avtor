guid = ->
  s4 = ->
    Math.floor((1 + Math.random()) * 0x10000).toString(16).substring 1
  s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
window.guid = guid
bindLabels = ->
  $('input[type="checkbox"], input[type="radio"]').not('[id]').each ->
    id = guid()
    $(this).attr('id', id)
    if $(this).next().is('label')
      $(this).next().attr('for', id)
  $('label').not('[for]').each ->
    id = guid()
    if $(this).next().is('input,textarea,select')
      $(this).attr('for', id)
      $(this).next().attr('id', id)
    else if $(this).prev().is('input,textarea,select')
      $(this).attr('for', id)
      $(this).prev().attr('id', id)
$ ->
  bindLabels()
  setType = ->
    type = 's'
    w = $(window).width()
    if w > 600 && w < 993
      type = 'm'
    else if w > 992
      type = 'l'
    window.type = type
  setType()
  $(window).resize ->
    setType()
  $(document).on 'click', '.scroll-to', ->
    id = if $(@).data('scroll-target')? then $(@).data('scroll-target') else $(@).attr('href')
    if id?
      if id.indexOf('#') == -1
        id = '#' + id
      offset = if window.type == 's' then -$('header').outerHeight() else 0
      offset -= 20
      setTimeout ->
        $(id).velocity('scroll', {
          offset: offset
        });
      , (if $(@).data('scroll-delay') then $(@).data('scroll-delay') else 0)
  $(document).on 'click', '.to-tab', (e) ->
    e.preventDefault();
    id = if $(@).attr('href') then $(@).attr('href') else $(@).data('target')
    if id
      if id.indexOf('#') == -1
        id = '#' + id
      $a = $('.tab [href="' + id + '"]')
      if $a.length
        setTimeout ->
          $a.click();
        , (if $(@).data('to-tab-delay') then $(@).data('to-tab-delay') else 0)
  if $('.modal-load').length
    $('body').append('
      <div id="load" class="modal">
        <div class="modal-content">
            <div class="close modal-close"></div>
            <div id="load-container">

            </div>
        </div>
      </div>');
    $modalLoad = $('#load')
    $('.modal-load').click (e) ->
      e.preventDefault()
      $modalLoad.attr('class','modal '+$(@).data('modal-class'))
      $modalLoad.openModal()
      $.get($(@).attr('href'), {"ajax-call": 'y'}, (data)->
        $('#load-container').html(data)
      )
  if ScrollMagic?
    controller = new ScrollMagic.Controller();
    ScrollMagicDebug = false;
    magic = (selector) ->
      if $(selector).length
        scene = new ScrollMagic.Scene({
          triggerElement: selector
          duration: $(selector).outerHeight()
        })
        .setClassToggle(selector, "active")
        if ScrollMagicDebug
          scene.addIndicators()
        scene
        .addTo(controller);
    window.magic = magic