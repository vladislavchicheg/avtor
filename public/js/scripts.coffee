updateST = (parent)  ->
  if $('.tovarchik').length > 0
    $(parent).each ->
      dlinka = $(@).find('.dlina2').val()
      kol = $(@).find('.kolvo').val()
      kol = ((kol) * 100).toFixed(0) / 100
      shirinka = $(@).find('.width_list').val()
      if shirinka.Length > 0 then shirinka = shirinka else shirinka = 1
      plosh = Math.ceil($(@).find('.kolvo').val())
      plosh = ((plosh) * 100).toFixed(0) / 100
      measure = $(this).find('.edizm').val()
      cena = $(this).find('.priceValue').val()
      total = (cena * plosh).fixedCeil(2)
      $('.total_price').val(total)
      total = Number(total)
      $('.gen').html(cena)
      $('.itog_price').html(total)
      $('.itog_dlina').html(plosh)
      $('.itog_dlina').append('&nbsp;шт.')

      $('.gen').html(cena)


updateS = (parent) ->
  cena = Number(parent.find('.priceValue').val())
  quantity = Number(parent.find('.kolvo').val())
  sum = (cena * quantity)
  sum = sum.toFixed(2)
  total = 0
  $('.gen').html(cena)
  total = sum
  total = ((total) * 100).toFixed(0) / 100
  total = Number(total)
  parent.find('.total_price').val(total)
  parent.find('.price.total').text total + ' руб.'
pechatsum = ()->
  square = Number($('.length').val()) * Number($('.width').val())
  square = (square).toFixed(2)
  perimetr = (Number($('.length').val()) + Number($('.width').val())) * 2
  perimetr = ((perimetr) * 100).toFixed(0) / 100
  $('.perimetr').val(perimetr).trigger('change')
  kol = Number($('.kolvo').val())
  kol = ((kol) * 100).toFixed(0) / 100
  pricepechat = Number($('.price').val()) * square
  pricepechat = pricepechat * kol
  $('.vivodprice').html(pricepechat.toFixed(2))
  $('.vivodsquare').html(square)
  supitog()

supitog = () ->
  postpechatitogsupersumm = Number($('.postpech-itog-sum').html())
  superitog = postpechatitogsupersumm + Number($('.vivodprice').html())
  $('.superitog').html(superitog)
fileFieldInit = ($input) ->
  accept = $input.attr('accept').split(',')
  max = $input.data('max-filesize')
  fileField = $input.closest('.file-field')
  if fileField.find('.close').length
    fileField.find('.close').click ->
      $input.val(null)
      $input.change()
  fileField.find('.file-path').attr('readonly', true)
  if accept || max
    $input.change (e) ->
      files = $(@)[0].files;
      fileField.find('.error-text').html('')
      if files.length
        size = 0;
        hasError = false
        errorStack = []
        for file in files
          size += file.size
          c = 0
          ext = file.name.split('.').pop()
          for type in accept
            type = addslashes(type)
            exp = new RegExp(type)

            if file.type.match(exp) || ext.match(exp)
              c++
          if c == 0
            hasError = true;
            errorStack.push(strings.ext + ' ' + ext);
        if size > Number(max) || hasError
          if (max && size > Number(max))
            errorStack.push(strings.max + ' ' + bytesToSize(Number(max)))
          e.preventDefault()
          e.stopPropagation()
          $(@).val('').trigger('change')
          fileField.addClass('error');
          fileField.find('.error-text').html(errorStack.join('<br>'))
          setTimeout =>
            fileField.removeClass('error');
          , 2500

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
isFloat = (num) ->
  num.toFixed() != num
kolvo = (wrapper) ->
  val = wrapper.find('input').val()
  itog = Math.ceil(val)
  itog = itog.toFixed(0)
  wrapper.find('.itog_dlina').html(itog)
itogprice = (wrapper) ->
  kol = wrapper.find('.itog_dlina').html()
  itemprice = wrapper.find('.gen').html()
  price = kol * itemprice
  wrapper.find('.total').html(price)
kolpoz = (element) ->
  kol = $(element).length
  $('.colpoz').html(kol)

ultraprice = (element) ->
  ultrasum = 0
  element = $(element)
  element.each ->
    ultrasum += Number($(@).find('.total').html())
    $('.ultra_total_price').html(ultrasum)

linenumbercount = (wrapper) ->
  i = 1
  wrapper = $(wrapper)
  wrapper.each ->
    $(@).find('td').filter(':first').html(i)
    i = i + 1


remainder = (number, divider) ->
  multiple = divider.toString().split('.').pop().length
  counter = 10
  while multiple > 0
    counter *= 10
    multiple--
  number *= counter
  divider *= counter
  result = (number - (parseInt(number / divider) * divider)) / counter
  return result

counterInit = (counter) ->
  $input = counter.find('input[type="text"]')
  minus = counter.find('.minus')
  plus = counter.find('.plus')
  min = if $input.data('min') then Number($input.data('min')) else 1
  max = Number($input.data('max'))
  step = if $input.data('step') then Number($input.data('step')) else 1
  $input.on 'change', ->
    val = Number($(@).val().replace(/[^0-9\-\.]/g, ''))
    if isNaN(val)
      val = min
    if val < min
      val = min
    if max && val > max
      val = max
    if isFloat(step)
      multiple = step.toString().split('.').pop().length
      normalize = remainder(val, step);
      counter = 10
      while multiple > 0
        counter *= 10
        multiple--
      val = ((val * counter) - (normalize * counter)) / counter
    else
      val = val - (val % step)
    if val == min
      minus.addClass('disabled')
    else
      minus.removeClass('disabled')
    if max && val == max
      plus.addClass('disabled')
    else
      plus.removeClass('disabled')
    $(@).val(val)
  .on('step-update', (e, value) ->
    step = Number(value)
    $(@).trigger('change')
  ).trigger('change')
  minus.on('click', ->
    if $(@).hasClass('disabled')
      return false
    $input.val(Number($input.val()) - step).trigger('change')
  )
  plus.on('click', ->
    if $(@).hasClass('disabled')
      return false
    $input.val(Number($input.val()) + step).trigger('change')
  )
$ ->
  $('.quant').each ->
    counterInit($(@))
  if $('.file').length
    fileFieldInit($('.file'));
    $('.file').change ->
      if @files[0]
        $('.file-path').text(@files[0].name);
      else
        $('.file-path').text('')
    $('.insert-file').on('dragover dragenter', ->
      $(@).addClass('is-dragover')
    ).on('dragleave dragend drop', ->
      $(@).removeClass('is-dragover');
    )
  bindLabels()
  $('.top-select').material_select()
  $('.header .select-wrapper .caret').html('<img src="images/arrow.png" alt="" title="" />')

  $('.select-dropdown').addClass('truncate')
  kolpoz('tr.stroka')
  $('.kol').each ->
    counterInit($(@))
  $('.zakaz tbody tr').each ->
    kolvo($(@))
    itogprice($(@))
  ultraprice('.zakaz tbody tr')
  linenumbercount('.zakaz tbody tr')
  $(document).on 'click', '.edit', ->
    $(this).closest('tr').find('.dlina').addClass('db')
    $(this).closest('tr').find('.cveth').addClass('db')
    $(this).closest('tr').find('.skrt').addClass('db')
    $(this).closest('tr').find('.itog_dlina').addClass('dn')
    $(this).closest('tr').find('.cvet').addClass('dn')
  $(window).on('update', ->
    $('#zakaz-variant tbody tr').each ->
      dlinka = $(@).find('.dlina2').val()
      kol = $(@).find('.kolvo').val()
      shirinka = $(@).find('.width_list').val()
      plosh = Math.ceil($(@).find('.kolvo').val())
      plosh = plosh.toFixed(0)
      measure = $(this).closest('tr').find('.edizm').val()
      $(@).closest('tr').find('.itog_dlina').html(plosh)
      $(@).closest('tr').find('.itog_dlina').append('&nbsp;шт.')
      $(@).closest('tr').find('.dlinashtuki').html(dlinka)
      $(@).closest('tr').find('.kolvoshtuki').html(kol)
      updateS($(@))
  ).trigger('update');
  ultra_total_price = 0
  znach = 0
  $('.zakaz tbody .total').each ->
    znach = $(this).html()
    znach = znach.replace(/\s+/g, '');
    znach = znach.replace('руб.', '');
    ultra_total_price += Number(znach)
  ultra_total_price = ultra_total_price.toFixed(2)
  ultra_total_price = Number(ultra_total_price)
  $('.ultra_total_price').html(ultra_total_price)
  $(document).on 'click', '.skrt', ->
    i = 0
    $(this).closest('tr').find('.dlina').removeClass('db')
    $(this).closest('tr').find('.itog_dlina').removeClass('dn')
    $(window).trigger('update');
    $(this).removeClass('db')
    ultra_total_price = 0
    $('.zakaz tbody .total').each ->
      znach = $(this).html()
      znach = znach.replace(/\s+/g, '');
      znach = znach.replace('руб.', '');
      ultra_total_price += Number(znach)
      ultra_total_price = ultra_total_price.toFixed(2)
      ultra_total_price = Number(ultra_total_price)
      $('.ultra_total_price').html(ultra_total_price)

  $(document).on 'click', '.delete', ->
    $(this).closest('tr').remove()
    $('.colpoz').html($('.zakaz tbody tr').length)
    ultra_total_price = 0
    $('.zakaz tbody .total').each ->
      znach = $(this).html()
      znach = znach.replace(/\s+/g, '');
      znach = znach.replace('руб.', '');
      ultra_total_price += Number(znach)
    ultra_total_price = ultra_total_price.toFixed(2)
    ultra_total_price = Number(ultra_total_price)
    $('.ultra_total_price').html(ultra_total_price)
  $(document).on 'click', '.delete_all', ->
    $('#zakaz-variant tbody tr').remove()
    $('.colpoz').html($('.zakaz tbody tr').length)
    updateST(".tovarchik tbody")
    updateST("#zakaz-variant tbody")
    $('.ultra_total_price').html('0')
  $('.colpoz').html($('.zakaz tbody tr').length)
  updateST(".tovarchik tbody")
  updateST("#zakaz-variant tbody")
  $(document).on 'click', '.add', ->
    partr = $(this).closest('tr')
    pattrclone = partr.clone().addClass('cloned')
    partr.after(pattrclone)
    $('.cloned .skrt').addClass('db')
    $('.cloned .cveth').addClass('db')
    $('.cloned .dlina').addClass('db')
    $('.cloned .itog_dlina').addClass('dn')
    $('.cloned .cvet').addClass('dn')
  $(document).on 'click', '.cloned .skrt', ->
    $(this).closest('tr').removeClass('cloned')
  $('.itogo_zakazov').text($('#zakaz tbody tr').length)
  $('.itogo_otgruz').text($('#zakaz tbody .vidan').length)
  sum = 0
  $('#zakaz tbody .summa').each ->
    sum += parseFloat($(this).text())
  sum = sum.toFixed(2)
  sum = Number(sum)
  $('.itogo_sum').html(sum)

  $('#zakaz tbody tr').each ->
    oplatka = parseFloat($(this).find('.oplata').text())
    summochka = parseFloat($(this).find('.summa').text())
    oplataproc = (oplatka * 100 / summochka).toFixed(0)
    dolg = (summochka - oplatka)
    if dolg > 1
      dolg = dolg.toFixed(2)
    else
      dolg = dolg.toFixed(0)
    dolg.replace(/[,]+/g, '.')
    $(@).find('.oplata_proc').html(oplataproc).prepend('(').append('%)')
    $(@).find('.dolg').html(dolg)

  itogdolg = 0
  $('#zakaz tbody .dolg').each ->
    itogdolg += parseFloat($(this).text())
  itogdolg = itogdolg.toFixed(2)
  itogdolg = Number(itogdolg)
  $('.itogo_dolg').html(itogdolg)

  itogoplat = 0
  $('#zakaz tbody .oplata').each ->
    itogoplat += parseFloat($(this).text())
  itogoplat = itogoplat.toFixed(2)
  itogoplat = Number(itogoplat)
  $('.itogo_oplat').html(itogoplat)

  oplat = 0
  summoch = 0
  dolgus = 0
  $('.zakaz tbody tr').has('.bolee7dney').each ->
    oplat += parseFloat($(this).find('.oplata').text())
    summoch += parseFloat($(this).find('.summa').text())
    dolgus = summoch - oplat
    if dolgus > 0
      $dolgus = dolgus
      $('.neoplat7d').html($dolgus)
      $('.redwarn').addClass('db')
  oplat = 0
  $('.zakaz tbody tr').has('.bolee7dneyoplat').each ->
    oplat += parseFloat($(this).find('.oplata').text())
    if oplat > 0
      $oplat = oplat
      $('.oplat7d').html($oplat)
      $('.greenwarn').addClass('db')
  $('.modal-trigger').leanModal()
  $('input,textarea').focus ->
    $(this).data('placeholder', $(this).attr('placeholder'))
    $(this).attr('placeholder', '');
  $('input,textarea').blur ->
    $(this).attr('placeholder', $(this).data('placeholder'));
  $('.matselect').material_select();

  $('.matselect .caret').html('<img src="images/arrow2.png" alt="" title="" />')
  if $('.itog-wrap').length
    pechatsum()
    $('.gab').change ->
      pechatsum()
    $('.kolvo').change ->
      pechatsum()
    $('.material-wrp select').change ->
      material = $(@).val()


  luversstep = $('.luvers-step').val()
  perimetr = Number($('.perimetr').val())
  $('.luvers-step').attr('data-max', perimetr)
  kolitem = perimetr / luversstep
  $('.kol-luvers').val(kolitem)
  $('.luvers-step').change ->
    luversstep = (Number($('.luvers-step').val())).toFixed(2)
    perimetr = Number($('.perimetr').val())
    kolitem = (perimetr / luversstep).toFixed()
    price = Number($(@).closest('.postpechat-item').find('.item-price').val())
    itogprc = (price * kolitem).toFixed()
    $(@).closest('.postpechat-item').find('.item-prc').html(itogprc)
  .trigger('change')

  $('.kol-item').change ->
    price = Number($(@).closest('.postpechat-item').find('.item-price').val())
    klv = Number($(@).closest('.postpechat-item').find('.kol-item').val())
    itogprc = (price * klv).toFixed()
    $(@).closest('.postpechat-item').find('.item-prc').html(itogprc)
  .trigger('change')
  postpechatitogsupersumm = 0
  $('.pitem').change ->
    name = $(@).siblings('label').html()
    cena = $(@).closest('.postpechat-item').find('.item-prc').html()
    if $(@).prop("checked")
      lishka = '<li>' + name + ':&nbsp;' + cena + '&nbsp;руб</li>'
      $(lishka).appendTo($(".preditog-postp"));
      $(@).closest('.postpechat-item').find('.luvers-step').attr('disabled', '')
      $(@).closest('.postpechat-item').find('.kol-item').attr('disabled', '')
      $(@).closest('.postpechat-item').find('.plus').addClass('disabled')
      $(@).closest('.postpechat-item').find('.minus').addClass('disabled')
      postpechatitogsupersumm = Number(postpechatitogsupersumm) + Number(cena)
      $('.postpech-itog-sum').html(postpechatitogsupersumm)
      supitog()
    else
      $('.preditog-postp li:last').remove()
      $(@).closest('.postpechat-item').find('.luvers-step').removeAttr('disabled')
      $(@).closest('.postpechat-item').find('.kol-item').removeAttr('disabled')
      $(@).closest('.postpechat-item').find('.plus').removeClass('disabled')
      $(@).closest('.postpechat-item').find('.minus').removeClass('disabled')
      postpechatitogsupersumm = Number(postpechatitogsupersumm) - Number(cena)
      $('.postpech-itog-sum').html(postpechatitogsupersumm)
      supitog()
  supitog()
  $(document).on 'click', '.add', ->
    partr = $(this).closest('tr')
    pattrclone = partr.clone().addClass('cloned')
    partr.after(pattrclone)
    $('.cloned .skrt').addClass('db')
    $('.cloned .cveth').addClass('db')
    $('.cloned .dlina').addClass('db')
    $('.cloned .itog_dlina').addClass('dn')
    $('.cloned .cvet').addClass('dn')
  $(document).on 'click', '.cloned .skrt', ->
    $(this).closest('tr').removeClass('cloned')
  if $('#zakaz-variant')
    $('#zakaz-variant').DataTable(
      {
        paging: false,
        ordering: true,
        "info": false,
        dom: 'Bfrtip',
        buttons: [
          'print'
        ],
        search: false,
        "order": [[0, 'asc'], [1, 'asc']],
        "searching": false
      }
    );
  $('#zakaz').DataTable(
    {
      paging: false,
      ordering: true,
      "info": false,
      dom: 'Bfrtip',
      search: false,
      buttons: [
        'print'
      ],
      "order": [[0, 'asc'], [1, 'asc']],
      "searching": false
    }
  );

  $('#zakaz tbody tr').each ->
    oplatka = parseFloat($(this).find('.oplata').text())
    summochka = parseFloat($(this).find('.summa').text())
    oplataproc = (oplatka * 100 / summochka).toFixed(0)
    dolg = (summochka - oplatka)
    if dolg > 1
      dolg = dolg.toFixed(0)
    else
      dolg = dolg.toFixed(0)
    dolg.replace(/[,]+/g, '.')
    $(@).find('.oplata_proc').html(oplataproc).prepend('(').append('%)')
    $(@).find('.dolg').html(dolg)

    itogdolg = 0
    $('#zakaz tbody .dolg').each ->
      itogdolg += parseFloat($(this).text())
    itogdolg = itogdolg.toFixed(2)

    $('.itogo_dolg').html(itogdolg)

    itogoplat = 0
    $('#zakaz tbody .oplata').each ->
      itogoplat += parseFloat($(this).text())
    itogoplat = itogoplat.toFixed(2)
    itogoplat = Number(itogoplat)
    $('.itogo_oplat').html(itogoplat)


  $('.contragent').change ->
    $option = $(@).find("option:selected")
    $('.inn').val($option.data('inn'))
    $('.kpp').val($option.data('kpp'))
    $('.ogrn').val($option.data('ogrn'))
    $('.uradress').val($option.data('uradress'))
    $('.fizadress').val($option.data('fizadress'))
    $('.phone').val($option.data('telefon'))
    $('.fiocont').val($option.data('fiocont'))
    console.log($option.data())
  $('#inn').suggestions
    serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs'
    token: '91e85902b66ec85e9049718b98fde64d64efb1ed'
    type: 'PARTY'
    minChars: 3
    deferRequestBy: 500
    floating: true
    count: 5
    formatResult: (value, currentValue, suggestion, options)->
      return suggestion.data.inn;
    onSelect: (suggestion) ->
      console.log suggestion
      $('#kpp').val(suggestion.data.kpp)
      $('#ogrn').val(suggestion.data.ogrn)
      $('#fullname').val(suggestion.data.name.full_with_opf)
      $('#uradress').val(suggestion.data.address.unrestricted_value)
      return
    formatSelected: (suggestion)->
      return suggestion.data.inn;
  $('#kpp').suggestions
    serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs'
    token: '91e85902b66ec85e9049718b98fde64d64efb1ed'
    type: 'PARTY'
    minChars: 3
    deferRequestBy: 500
    floating: true
    count: 5
    formatResult: (value, currentValue, suggestion, options)->
      return suggestion.data.kpp;
    onSelect: (suggestion) ->
      console.log suggestion
      $('#inn').val(suggestion.data.inn)
      $('#ogrn').val(suggestion.data.ogrn)
      $('#fullname').val(suggestion.data.name.full_with_opf)
      $('#uradress').val(suggestion.data.address.unrestricted_value)
      return
    formatSelected: (suggestion)->
      return suggestion.data.kpp;

  $('#ogrn').suggestions
    serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs'
    token: '91e85902b66ec85e9049718b98fde64d64efb1ed'
    type: 'PARTY'
    minChars: 3
    deferRequestBy: 500
    floating: true
    count: 5
    formatResult: (value, currentValue, suggestion, options)->
      return suggestion.data.ogrn;
    onSelect: (suggestion) ->
      console.log suggestion
      $('#inn').val(suggestion.data.inn)
      $('#kpp').val(suggestion.data.kpp)
      $('#fullname').val(suggestion.data.name.full_with_opf)
      $('#uradress').val(suggestion.data.address.unrestricted_value)
      return
    formatSelected: (suggestion)->
      return suggestion.data.ogrn;
