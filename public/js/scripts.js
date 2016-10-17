// Generated by CoffeeScript 1.10.0
var bindLabels, counterInit, fileFieldInit, guid, isFloat, itogprice, kolpoz, kolvo, linenumbercount, pechatsum, remainder, supitog, ultraprice, updateS, updateST;

updateST = function(parent) {
  if ($('.tovarchik').length > 0) {
    return $(parent).each(function() {
      var cena, dlinka, kol, measure, plosh, shirinka, total;
      dlinka = $(this).find('.dlina2').val();
      kol = $(this).find('.kolvo').val();
      kol = (kol * 100).toFixed(0) / 100;
      shirinka = $(this).find('.width_list').val();
      if (shirinka.Length > 0) {
        shirinka = shirinka;
      } else {
        shirinka = 1;
      }
      plosh = Math.ceil($(this).find('.kolvo').val());
      plosh = (plosh * 100).toFixed(0) / 100;
      measure = $(this).find('.edizm').val();
      cena = $(this).find('.priceValue').val();
      total = (cena * plosh).fixedCeil(2);
      $('.total_price').val(total);
      total = Number(total);
      $('.gen').html(cena);
      $('.itog_price').html(total);
      $('.itog_dlina').html(plosh);
      $('.itog_dlina').append('&nbsp;шт.');
      return $('.gen').html(cena);
    });
  }
};

updateS = function(parent) {
  var cena, quantity, sum, total;
  cena = Number(parent.find('.priceValue').val());
  quantity = Number(parent.find('.kolvo').val());
  sum = cena * quantity;
  sum = sum.toFixed(2);
  total = 0;
  $('.gen').html(cena);
  total = sum;
  total = (total * 100).toFixed(0) / 100;
  total = Number(total);
  parent.find('.total_price').val(total);
  return parent.find('.price.total').text(total + ' руб.');
};

pechatsum = function() {
  var kol, perimetr, pricepechat, square;
  square = Number($('.length').val()) * Number($('.width').val());
  square = square.toFixed(2);
  perimetr = (Number($('.length').val()) + Number($('.width').val())) * 2;
  perimetr = (perimetr * 100).toFixed(0) / 100;
  $('.perimetr').val(perimetr).trigger('change');
  kol = Number($('.kolvo').val());
  kol = (kol * 100).toFixed(0) / 100;
  pricepechat = Number($('.price').val()) * square;
  pricepechat = pricepechat * kol;
  $('.vivodprice').html(pricepechat.toFixed(2));
  $('.vivodsquare').html(square);
  return supitog();
};

supitog = function() {
  var postpechatitogsupersumm, superitog;
  postpechatitogsupersumm = Number($('.postpech-itog-sum').html());
  superitog = postpechatitogsupersumm + Number($('.vivodprice').html());
  return $('.superitog').html(superitog);
};

fileFieldInit = function($input) {
  var accept, fileField, max;
  accept = $input.attr('accept').split(',');
  max = $input.data('max-filesize');
  fileField = $input.closest('.file-field');
  if (fileField.find('.close').length) {
    fileField.find('.close').click(function() {
      $input.val(null);
      return $input.change();
    });
  }
  fileField.find('.file-path').attr('readonly', true);
  if (accept || max) {
    return $input.change(function(e) {
      var c, errorStack, exp, ext, file, files, hasError, j, k, len, len1, size, type;
      files = $(this)[0].files;
      fileField.find('.error-text').html('');
      if (files.length) {
        size = 0;
        hasError = false;
        errorStack = [];
        for (j = 0, len = files.length; j < len; j++) {
          file = files[j];
          size += file.size;
          c = 0;
          ext = file.name.split('.').pop();
          for (k = 0, len1 = accept.length; k < len1; k++) {
            type = accept[k];
            type = addslashes(type);
            exp = new RegExp(type);
            if (file.type.match(exp) || ext.match(exp)) {
              c++;
            }
          }
          if (c === 0) {
            hasError = true;
            errorStack.push(strings.ext + ' ' + ext);
          }
        }
        if (size > Number(max) || hasError) {
          if (max && size > Number(max)) {
            errorStack.push(strings.max + ' ' + bytesToSize(Number(max)));
          }
          e.preventDefault();
          e.stopPropagation();
          $(this).val('').trigger('change');
          fileField.addClass('error');
          fileField.find('.error-text').html(errorStack.join('<br>'));
          return setTimeout((function(_this) {
            return function() {
              return fileField.removeClass('error');
            };
          })(this), 2500);
        }
      }
    });
  }
};

guid = function() {
  var s4;
  s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

window.guid = guid;

bindLabels = function() {
  $('input[type="checkbox"], input[type="radio"]').not('[id]').each(function() {
    var id;
    id = guid();
    $(this).attr('id', id);
    if ($(this).next().is('label')) {
      return $(this).next().attr('for', id);
    }
  });
  return $('label').not('[for]').each(function() {
    var id;
    id = guid();
    if ($(this).next().is('input,textarea,select')) {
      $(this).attr('for', id);
      return $(this).next().attr('id', id);
    } else if ($(this).prev().is('input,textarea,select')) {
      $(this).attr('for', id);
      return $(this).prev().attr('id', id);
    }
  });
};

isFloat = function(num) {
  return num.toFixed() !== num;
};

kolvo = function(wrapper) {
  var itog, val;
  val = wrapper.find('input').val();
  itog = Math.ceil(val);
  itog = itog.toFixed(0);
  return wrapper.find('.itog_dlina').html(itog);
};

itogprice = function(wrapper) {
  var itemprice, kol, price;
  kol = wrapper.find('.itog_dlina').html();
  itemprice = wrapper.find('.gen').html();
  price = kol * itemprice;
  return wrapper.find('.total').html(price);
};

kolpoz = function(element) {
  var kol;
  kol = $(element).length;
  return $('.colpoz').html(kol);
};

ultraprice = function(element) {
  var ultrasum;
  ultrasum = 0;
  element = $(element);
  return element.each(function() {
    ultrasum += Number($(this).find('.total').html());
    return $('.ultra_total_price').html(ultrasum);
  });
};

linenumbercount = function(wrapper) {
  var i;
  i = 1;
  wrapper = $(wrapper);
  return wrapper.each(function() {
    $(this).find('td').filter(':first').html(i);
    return i = i + 1;
  });
};

remainder = function(number, divider) {
  var counter, multiple, result;
  multiple = divider.toString().split('.').pop().length;
  counter = 10;
  while (multiple > 0) {
    counter *= 10;
    multiple--;
  }
  number *= counter;
  divider *= counter;
  result = (number - (parseInt(number / divider) * divider)) / counter;
  return result;
};

counterInit = function(counter) {
  var $input, max, min, minus, plus, step;
  $input = counter.find('input[type="text"]');
  minus = counter.find('.minus');
  plus = counter.find('.plus');
  min = $input.data('min') ? Number($input.data('min')) : 1;
  max = Number($input.data('max'));
  step = $input.data('step') ? Number($input.data('step')) : 1;
  $input.on('change', function() {
    var multiple, normalize, val;
    val = Number($(this).val().replace(/[^0-9\-\.]/g, ''));
    if (isNaN(val)) {
      val = min;
    }
    if (val < min) {
      val = min;
    }
    if (max && val > max) {
      val = max;
    }
    if (isFloat(step)) {
      multiple = step.toString().split('.').pop().length;
      normalize = remainder(val, step);
      counter = 10;
      while (multiple > 0) {
        counter *= 10;
        multiple--;
      }
      val = ((val * counter) - (normalize * counter)) / counter;
    } else {
      val = val - (val % step);
    }
    if (val === min) {
      minus.addClass('disabled');
    } else {
      minus.removeClass('disabled');
    }
    if (max && val === max) {
      plus.addClass('disabled');
    } else {
      plus.removeClass('disabled');
    }
    return $(this).val(val);
  }).on('step-update', function(e, value) {
    step = Number(value);
    return $(this).trigger('change');
  }).trigger('change');
  minus.on('click', function() {
    if ($(this).hasClass('disabled')) {
      return false;
    }
    return $input.val(Number($input.val()) - step).trigger('change');
  });
  return plus.on('click', function() {
    if ($(this).hasClass('disabled')) {
      return false;
    }
    return $input.val(Number($input.val()) + step).trigger('change');
  });
};

$(function() {
  var dolgus, itogdolg, itogoplat, kolitem, luversstep, oplat, perimetr, postpechatitogsupersumm, sum, summoch, ultra_total_price, znach;
  $('.quant').each(function() {
    return counterInit($(this));
  });
  if ($('.file').length) {
    fileFieldInit($('.file'));
    $('.file').change(function() {
      if (this.files[0]) {
        return $('.file-path').text(this.files[0].name);
      } else {
        return $('.file-path').text('');
      }
    });
    $('.insert-file').on('dragover dragenter', function() {
      return $(this).addClass('is-dragover');
    }).on('dragleave dragend drop', function() {
      return $(this).removeClass('is-dragover');
    });
  }
  bindLabels();
  $('.top-select').material_select();
  $('.header .select-wrapper .caret').html('<img src="images/arrow.png" alt="" title="" />');
  $('.select-dropdown').addClass('truncate');
  kolpoz('tr.stroka');
  $('.kol').each(function() {
    return counterInit($(this));
  });
  $('.zakaz tbody tr').each(function() {
    kolvo($(this));
    return itogprice($(this));
  });
  ultraprice('.zakaz tbody tr');
  linenumbercount('.zakaz tbody tr');
  $(document).on('click', '.edit', function() {
    $(this).closest('tr').find('.dlina').addClass('db');
    $(this).closest('tr').find('.cveth').addClass('db');
    $(this).closest('tr').find('.skrt').addClass('db');
    $(this).closest('tr').find('.itog_dlina').addClass('dn');
    return $(this).closest('tr').find('.cvet').addClass('dn');
  });
  $(window).on('update', function() {
    return $('#zakaz-variant tbody tr').each(function() {
      var dlinka, kol, measure, plosh, shirinka;
      dlinka = $(this).find('.dlina2').val();
      kol = $(this).find('.kolvo').val();
      shirinka = $(this).find('.width_list').val();
      plosh = Math.ceil($(this).find('.kolvo').val());
      plosh = plosh.toFixed(0);
      measure = $(this).closest('tr').find('.edizm').val();
      $(this).closest('tr').find('.itog_dlina').html(plosh);
      $(this).closest('tr').find('.itog_dlina').append('&nbsp;шт.');
      $(this).closest('tr').find('.dlinashtuki').html(dlinka);
      $(this).closest('tr').find('.kolvoshtuki').html(kol);
      return updateS($(this));
    });
  }).trigger('update');
  ultra_total_price = 0;
  znach = 0;
  $('.zakaz tbody .total').each(function() {
    znach = $(this).html();
    znach = znach.replace(/\s+/g, '');
    znach = znach.replace('руб.', '');
    return ultra_total_price += Number(znach);
  });
  ultra_total_price = ultra_total_price.toFixed(2);
  ultra_total_price = Number(ultra_total_price);
  $('.ultra_total_price').html(ultra_total_price);
  $(document).on('click', '.skrt', function() {
    var i;
    i = 0;
    $(this).closest('tr').find('.dlina').removeClass('db');
    $(this).closest('tr').find('.itog_dlina').removeClass('dn');
    $(window).trigger('update');
    $(this).removeClass('db');
    ultra_total_price = 0;
    return $('.zakaz tbody .total').each(function() {
      znach = $(this).html();
      znach = znach.replace(/\s+/g, '');
      znach = znach.replace('руб.', '');
      ultra_total_price += Number(znach);
      ultra_total_price = ultra_total_price.toFixed(2);
      ultra_total_price = Number(ultra_total_price);
      return $('.ultra_total_price').html(ultra_total_price);
    });
  });
  $(document).on('click', '.delete', function() {
    $(this).closest('tr').remove();
    $('.colpoz').html($('.zakaz tbody tr').length);
    ultra_total_price = 0;
    $('.zakaz tbody .total').each(function() {
      znach = $(this).html();
      znach = znach.replace(/\s+/g, '');
      znach = znach.replace('руб.', '');
      return ultra_total_price += Number(znach);
    });
    ultra_total_price = ultra_total_price.toFixed(2);
    ultra_total_price = Number(ultra_total_price);
    return $('.ultra_total_price').html(ultra_total_price);
  });
  $(document).on('click', '.delete_all', function() {
    $('#zakaz-variant tbody tr').remove();
    $('.colpoz').html($('.zakaz tbody tr').length);
    updateST(".tovarchik tbody");
    updateST("#zakaz-variant tbody");
    return $('.ultra_total_price').html('0');
  });
  $('.colpoz').html($('.zakaz tbody tr').length);
  updateST(".tovarchik tbody");
  updateST("#zakaz-variant tbody");
  $(document).on('click', '.add', function() {
    var partr, pattrclone;
    partr = $(this).closest('tr');
    pattrclone = partr.clone().addClass('cloned');
    partr.after(pattrclone);
    $('.cloned .skrt').addClass('db');
    $('.cloned .cveth').addClass('db');
    $('.cloned .dlina').addClass('db');
    $('.cloned .itog_dlina').addClass('dn');
    return $('.cloned .cvet').addClass('dn');
  });
  $(document).on('click', '.cloned .skrt', function() {
    return $(this).closest('tr').removeClass('cloned');
  });
  $('.itogo_zakazov').text($('#zakaz tbody tr').length);
  $('.itogo_otgruz').text($('#zakaz tbody .vidan').length);
  sum = 0;
  $('#zakaz tbody .summa').each(function() {
    return sum += parseFloat($(this).text());
  });
  sum = sum.toFixed(2);
  sum = Number(sum);
  $('.itogo_sum').html(sum);
  $('#zakaz tbody tr').each(function() {
    var dolg, oplataproc, oplatka, summochka;
    oplatka = parseFloat($(this).find('.oplata').text());
    summochka = parseFloat($(this).find('.summa').text());
    oplataproc = (oplatka * 100 / summochka).toFixed(0);
    dolg = summochka - oplatka;
    if (dolg > 1) {
      dolg = dolg.toFixed(2);
    } else {
      dolg = dolg.toFixed(0);
    }
    dolg.replace(/[,]+/g, '.');
    $(this).find('.oplata_proc').html(oplataproc).prepend('(').append('%)');
    return $(this).find('.dolg').html(dolg);
  });
  itogdolg = 0;
  $('#zakaz tbody .dolg').each(function() {
    return itogdolg += parseFloat($(this).text());
  });
  itogdolg = itogdolg.toFixed(2);
  itogdolg = Number(itogdolg);
  $('.itogo_dolg').html(itogdolg);
  itogoplat = 0;
  $('#zakaz tbody .oplata').each(function() {
    return itogoplat += parseFloat($(this).text());
  });
  itogoplat = itogoplat.toFixed(2);
  itogoplat = Number(itogoplat);
  $('.itogo_oplat').html(itogoplat);
  oplat = 0;
  summoch = 0;
  dolgus = 0;
  $('.zakaz tbody tr').has('.bolee7dney').each(function() {
    var $dolgus;
    oplat += parseFloat($(this).find('.oplata').text());
    summoch += parseFloat($(this).find('.summa').text());
    dolgus = summoch - oplat;
    if (dolgus > 0) {
      $dolgus = dolgus;
      $('.neoplat7d').html($dolgus);
      return $('.redwarn').addClass('db');
    }
  });
  oplat = 0;
  $('.zakaz tbody tr').has('.bolee7dneyoplat').each(function() {
    var $oplat;
    oplat += parseFloat($(this).find('.oplata').text());
    if (oplat > 0) {
      $oplat = oplat;
      $('.oplat7d').html($oplat);
      return $('.greenwarn').addClass('db');
    }
  });
  $('.modal-trigger').leanModal();
  $('input,textarea').focus(function() {
    $(this).data('placeholder', $(this).attr('placeholder'));
    return $(this).attr('placeholder', '');
  });
  $('input,textarea').blur(function() {
    return $(this).attr('placeholder', $(this).data('placeholder'));
  });
  $('.matselect').material_select();
  $('.matselect .caret').html('<img src="images/arrow2.png" alt="" title="" />');
  if ($('.itog-wrap').length) {
    pechatsum();
    $('.gab').change(function() {
      return pechatsum();
    });
    $('.kolvo').change(function() {
      return pechatsum();
    });
    $('.material-wrp select').change(function() {
      var material;
      return material = $(this).val();
    });
  }
  luversstep = $('.luvers-step').val();
  perimetr = Number($('.perimetr').val());
  $('.luvers-step').attr('data-max', perimetr);
  kolitem = perimetr / luversstep;
  $('.kol-luvers').val(kolitem);
  $('.luvers-step').change(function() {
    var itogprc, price;
    luversstep = (Number($('.luvers-step').val())).toFixed(2);
    perimetr = Number($('.perimetr').val());
    kolitem = (perimetr / luversstep).toFixed();
    price = Number($(this).closest('.postpechat-item').find('.item-price').val());
    itogprc = (price * kolitem).toFixed();
    return $(this).closest('.postpechat-item').find('.item-prc').html(itogprc);
  }).trigger('change');
  $('.kol-item').change(function() {
    var itogprc, klv, price;
    price = Number($(this).closest('.postpechat-item').find('.item-price').val());
    klv = Number($(this).closest('.postpechat-item').find('.kol-item').val());
    itogprc = (price * klv).toFixed();
    return $(this).closest('.postpechat-item').find('.item-prc').html(itogprc);
  }).trigger('change');
  postpechatitogsupersumm = 0;
  $('.pitem').change(function() {
    var cena, lishka, name;
    name = $(this).siblings('label').html();
    cena = $(this).closest('.postpechat-item').find('.item-prc').html();
    if ($(this).prop("checked")) {
      lishka = '<li>' + name + ':&nbsp;' + cena + '&nbsp;руб</li>';
      $(lishka).appendTo($(".preditog-postp"));
      $(this).closest('.postpechat-item').find('.luvers-step').attr('disabled', '');
      $(this).closest('.postpechat-item').find('.kol-item').attr('disabled', '');
      $(this).closest('.postpechat-item').find('.plus').addClass('disabled');
      $(this).closest('.postpechat-item').find('.minus').addClass('disabled');
      postpechatitogsupersumm = Number(postpechatitogsupersumm) + Number(cena);
      $('.postpech-itog-sum').html(postpechatitogsupersumm);
      return supitog();
    } else {
      $('.preditog-postp li:last').remove();
      $(this).closest('.postpechat-item').find('.luvers-step').removeAttr('disabled');
      $(this).closest('.postpechat-item').find('.kol-item').removeAttr('disabled');
      $(this).closest('.postpechat-item').find('.plus').removeClass('disabled');
      $(this).closest('.postpechat-item').find('.minus').removeClass('disabled');
      postpechatitogsupersumm = Number(postpechatitogsupersumm) - Number(cena);
      $('.postpech-itog-sum').html(postpechatitogsupersumm);
      return supitog();
    }
  });
  supitog();
  $(document).on('click', '.add', function() {
    var partr, pattrclone;
    partr = $(this).closest('tr');
    pattrclone = partr.clone().addClass('cloned');
    partr.after(pattrclone);
    $('.cloned .skrt').addClass('db');
    $('.cloned .cveth').addClass('db');
    $('.cloned .dlina').addClass('db');
    $('.cloned .itog_dlina').addClass('dn');
    return $('.cloned .cvet').addClass('dn');
  });
  $(document).on('click', '.cloned .skrt', function() {
    return $(this).closest('tr').removeClass('cloned');
  });
  if ($('#zakaz-variant')) {
    $('#zakaz-variant').DataTable({
      paging: false,
      ordering: true,
      "info": false,
      dom: 'Bfrtip',
      buttons: ['print'],
      search: false,
      "order": [[0, 'asc'], [1, 'asc']],
      "searching": false
    });
  }
  $('#zakaz').DataTable({
    paging: false,
    ordering: true,
    "info": false,
    dom: 'Bfrtip',
    search: false,
    buttons: ['print'],
    "order": [[0, 'asc'], [1, 'asc']],
    "searching": false
  });
  $('#zakaz tbody tr').each(function() {
    var dolg, oplataproc, oplatka, summochka;
    oplatka = parseFloat($(this).find('.oplata').text());
    summochka = parseFloat($(this).find('.summa').text());
    oplataproc = (oplatka * 100 / summochka).toFixed(0);
    dolg = summochka - oplatka;
    if (dolg > 1) {
      dolg = dolg.toFixed(0);
    } else {
      dolg = dolg.toFixed(0);
    }
    dolg.replace(/[,]+/g, '.');
    $(this).find('.oplata_proc').html(oplataproc).prepend('(').append('%)');
    $(this).find('.dolg').html(dolg);
    itogdolg = 0;
    $('#zakaz tbody .dolg').each(function() {
      return itogdolg += parseFloat($(this).text());
    });
    itogdolg = itogdolg.toFixed(2);
    $('.itogo_dolg').html(itogdolg);
    itogoplat = 0;
    $('#zakaz tbody .oplata').each(function() {
      return itogoplat += parseFloat($(this).text());
    });
    itogoplat = itogoplat.toFixed(2);
    itogoplat = Number(itogoplat);
    return $('.itogo_oplat').html(itogoplat);
  });
  $('.contragent').change(function() {
    var $option;
    $option = $(this).find("option:selected");
    $('.inn').val($option.data('inn'));
    $('.kpp').val($option.data('kpp'));
    $('.ogrn').val($option.data('ogrn'));
    $('.uradress').val($option.data('uradress'));
    $('.fizadress').val($option.data('fizadress'));
    $('.phone').val($option.data('telefon'));
    $('.fiocont').val($option.data('fiocont'));
    return console.log($option.data());
  });
  $('#inn').suggestions({
    serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
    token: '91e85902b66ec85e9049718b98fde64d64efb1ed',
    type: 'PARTY',
    minChars: 3,
    deferRequestBy: 500,
    floating: true,
    count: 5,
    formatResult: function(value, currentValue, suggestion, options) {
      return suggestion.data.inn;
    },
    onSelect: function(suggestion) {
      console.log(suggestion);
      $('#kpp').val(suggestion.data.kpp);
      $('#ogrn').val(suggestion.data.ogrn);
      $('#fullname').val(suggestion.data.name.full_with_opf);
      $('#uradress').val(suggestion.data.address.unrestricted_value);
    },
    formatSelected: function(suggestion) {
      return suggestion.data.inn;
    }
  });
  $('#kpp').suggestions({
    serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
    token: '91e85902b66ec85e9049718b98fde64d64efb1ed',
    type: 'PARTY',
    minChars: 3,
    deferRequestBy: 500,
    floating: true,
    count: 5,
    formatResult: function(value, currentValue, suggestion, options) {
      return suggestion.data.kpp;
    },
    onSelect: function(suggestion) {
      console.log(suggestion);
      $('#inn').val(suggestion.data.inn);
      $('#ogrn').val(suggestion.data.ogrn);
      $('#fullname').val(suggestion.data.name.full_with_opf);
      $('#uradress').val(suggestion.data.address.unrestricted_value);
    },
    formatSelected: function(suggestion) {
      return suggestion.data.kpp;
    }
  });
  return $('#ogrn').suggestions({
    serviceUrl: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
    token: '91e85902b66ec85e9049718b98fde64d64efb1ed',
    type: 'PARTY',
    minChars: 3,
    deferRequestBy: 500,
    floating: true,
    count: 5,
    formatResult: function(value, currentValue, suggestion, options) {
      return suggestion.data.ogrn;
    },
    onSelect: function(suggestion) {
      console.log(suggestion);
      $('#inn').val(suggestion.data.inn);
      $('#kpp').val(suggestion.data.kpp);
      $('#fullname').val(suggestion.data.name.full_with_opf);
      $('#uradress').val(suggestion.data.address.unrestricted_value);
    },
    formatSelected: function(suggestion) {
      return suggestion.data.ogrn;
    }
  });
});
