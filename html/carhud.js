/*
  Ups to też
*/

let block = false;
let engineOn = false;
let speedoMode = 1;
setTimeout(() => {
  if (window.localStorage.getItem('hud') != undefined) {
    if (window.localStorage.getItem('hud') != 'new') {
      $.post('https://e-hud/sethud', JSON.stringify({ mode: true }));
      $('html').fadeOut(500);
    } else {
      $.post('https://e-hud/sethud', JSON.stringify({ mode: false }));
    }
  } else {
    $.post('https://e-hud/sethud', JSON.stringify({ mode: false }));
    window.localStorage.setItem('hud', 'new');
  }
}, 1000);

$(document).ready(function () {
  $('.icons').hide();
  $('.mapborder').hide();

  window.addEventListener('message', function (event) {
    if (event.data.switchhud) {
      speedoMode = speedoMode == 1 ? 2 : 1;
      window.localStorage.setItem('hud', speedoMode == 1 ? 'new' : 'old');
    }
    if (event.data.showhud == true) {
      $('.streetlabel').css('display', 'inline-block');
      $('.icons').css('display', 'flex')
      $('.speedometer-minimalistic').hide();
      $('.speedometer').show();
      $('.hud2').show();
      $('.border').show();
      $('.streetlabel').removeClass('streetminimalist');
      engineOn = true;
    }
    if (event.data.showhud == false) {
    
      $('.streetlabel').hide();
      $('.icons').hide();
      $('.speedometer-minimalistic').hide();
      $('.speedometer').hide();
      $('.hud2').hide();
      $('.border').hide();
      $('.icons').hide();
      engineOn = false;
    }

    if (event.data.type == 'SWITCH_SPEEDO') {
      if (event.data.bool) {
        block = true;
        $('.icons').hide();
        engineOn = false;
      } else {
        block = false;
      }
    }

    if (event.data.style) {
      if (engineOn == true) {
        $('.streetlabel').removeClass('streetminimalist');
        $('.icons').css('display', 'flex')
        $('.speedometer-minimalistic').hide();
        $('.speedometer').hide();
      }
    }

    if (event.data.aspectratio) {
      setAspectRatio(Math.round(event.data.aspectratio * 100) / 100);
    }

    if (event.data.speedometer) {
      let speed = Number(event.data.speed);
      let percent = Number(event.data.percent);
      let showpercent = percent * 0.82;
      if (speed < 10) {
        $('.speed-digital').text('00' + speed);
        $('.minimalistic-speed').text('00' + speed + ' KMH');
      } else if (speed < 100) {
        $('.speed-digital').text('0' + speed);
        $('.minimalistic-speed').text('0' + speed + ' KMH');
      } else {
        $('.speed-digital').text(speed);
        $('.minimalistic-speed').text(speed + ' KMH');
      }

      $('.speed').attr('stroke-dasharray', showpercent + ' 100');
    }

    if (event.data.tachometer) {
      let gear = event.data.gear;
      if (gear == '0') gear = 'R';
      $('.gear').html(gear);

      if (event.data.eHealth > 900) {
        $('.speed').css('stroke', 'rgba(52, 145, 23, 0.9)');
      } else if (event.data.eHealth > 700) {
        $('.speed').css('stroke', 'rgba(65, 222, 16, 0.9)');
      } else if (event.data.eHealth > 500) {
        $('.speed').css('stroke', 'rgba(231, 235, 19, 0.9)');
      } else if (event.data.eHealth > 400) {
        $('.speed').css('stroke', 'rgba(217, 133, 15, 0.9)');
      } else if (event.data.eHealth > 300) {
        $('.speed').css('stroke', 'rgba(224, 33, 16, 0.9)');
      } else if (event.data.eHealth > 200) {
        $('.speed').css('stroke', 'rgba(173, 32, 19, 0.9)');
      } else if (event.data.eHealth > 100) {
        $('.speed').css('stroke', 'rgba(145, 32, 22, 0.9)');
      } else {
        $('.speed').css('stroke', 'rgba(94, 21, 14, 0.9)');
      }

      let rpm = Number(event.data.rpmx) * 0.65;
      $('.tacho path').attr('stroke-dasharray', rpm + ' 100');
    }

    if (event.data.seatbelt) {
      $('.seatbelt').addClass('active');
      $('.seatbelt .ikona').css('fill', 'rgba(0, 255, 0, 0.9)');
    } else if (event.data.seatbelt == false) {
      $('.seatbelt').removeClass('active');
      $('.seatbelt .ikona').css('fill', 'rgba(255, 0, 0, 0.9)');
    }

    // console.log(event.data.street)
    if (event.data.street) {
      $('.car-text').text(event.data.street);
    }
    if (event.data.direction) {
      $('.direction').text(event.data.direction);
    }
  });
});

$('.huds').hide();
