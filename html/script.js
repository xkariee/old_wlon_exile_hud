//dont change

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? new ImGui.ImVec4(parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255, 1.0) : new ImGui.ImVec4(0.0, 0.0, 0.0, 1.0);
}
(async function() {
  let toggled = false;
  let hidden = false;
  let canchange = true;
  
  var settingss = window.localStorage.getItem('settings');
  var settings = settingss
    ? JSON.parse(settingss)
    : {
        hp: rgbToHex(209, 0, 31),
        armor: rgbToHex(10, 89, 199),
        hunger: rgbToHex(130, 83, 39),
        thirst: rgbToHex(32, 128, 201),
        oxygen: rgbToHex(115, 143, 235),
        sound: rgbToHex(196, 190, 190),
        fuel: rgbToHex(220, 152, 7),
        align: '2',
        align1: '1',
        size: 1.0,
        hudtype: true
      };
  
  function resetSettings() {
    settings = {
      hp: rgbToHex(209, 0, 31),
      armor: rgbToHex(10, 89, 199),
      hunger: rgbToHex(130, 83, 39),
      thirst: rgbToHex(32, 128, 201),
      fuel: rgbToHex(220, 152, 7),
      oxygen: rgbToHex(115, 143, 235),
      sound: rgbToHex(196, 190, 190),
      align: '2',
      align1: '1',
      size: 1.0,
      hudtype: true
    };
    color = hexToRgb(settings.hp) 
    color1 = hexToRgb(settings.armor) 
    color2 = hexToRgb(settings.hunger) 
    color3 = hexToRgb(settings.thirst) 
    color4 = hexToRgb(settings.oxygen) 
    color5 = hexToRgb(settings.sound) 
    color6 = hexToRgb(settings.fuel) 
    hud = settings.hudtype
    scaleofhud = settings.size
    align_hud = settings.align-1
    align_taskbar = settings.align1-1
    $('.hud').css({'transform': 'scale(1.0)','transform-origin':'right 100%'});
    setAlign(settings.align);
    window.localStorage.setItem('settings', JSON.stringify(settings));

    setTimeout(() => {
      $('.hud').show();
      $('.hud-collapse').hide();
      hidden = false
    }, 500);
  }
  
  function setAlign(t) {
    if (t == '2') {
      $('#thirst').css('transform', '');
      $('#hunger').css('transform', '');
      $('#sound').css('transform', '');
  
      $('ul').css('display', '');
      $('li').css('display', '');
      $('ul').css('display', 'flex');
      $('li').css('display', 'flex');

      $('.hud').css('transform', 'translate(-0.7%, -10px')
      $('.hud').css('bottom', '10px')
      $('.hud').css('right', '0.7%')

    }
  }
  

  setTimeout(() => {
    window.localStorage.setItem('settings', JSON.stringify(settings));
    $.post('https://e-hud/progressalign', JSON.stringify({align: settings.align1}));
    setAlign(settings.align);
    align_hud = settings.align-1
    align_taskbar = settings.align1-1
  }, 1000);

  function exit() {
    disableMenu()
    disableMenu()
    $('.containerx').fadeOut(300);
    $.post('https://e-hud/NUIFocusOff', JSON.stringify({}));
    $('.suwak-container').fadeOut(function(){
    })
    settings.size = scaleofhud
  }
  
  $(document).on('keyup', function (e) {
    if (e.key == 'Escape') {
      exit();
    }
  });
  
  

  function saveSettings() {
    settings.size = scaleofhud
    settings.hudtype = hud
    window.localStorage.setItem('settings', JSON.stringify(settings));
  }
  let firstsize = false
  var switchh = true;
  
  window.addEventListener('message', (event) => {
    if (event.data.type == 'SET_SETTINGS') {
      $('.hud').show();
      $('.hud-collapse').show();
      hidden = false;
    }
    if (event.data.type == 'OPEN_SETTINGS') {
      enableMenu()
    }
    if (event.data.type == 'TOGGLE_HUD') {
      toggled = true;
      $('.hud-collapse').animate(animations.two, 300);
      setTimeout(function () {
        if (toggled) {
          $('.hud').animate(animations.one, 300);
        }
      }, 500);
      return;
    }

    if(event.data.type == "ENABLE_TRAILER") {
      disableMenu()
      startTrailer()
    }
  
    if (event.data.type == 'UPDATE_VOICE') {
      if (event.data.isTalking) {
        if (event.data.mode == 'Car') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:rgb(79, 75, 75);stop-opacity:1" /><stop offset="25%" style="stop-color:rgb(54, 50, 50);stop-opacity:1"/><stop offset="25%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Whisper') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:rgb(79, 75, 75);stop-opacity:1" /><stop offset="50%" style="stop-color:rgb(54, 50, 50);stop-opacity:1"/><stop offset="50%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Normal') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:rgb(79, 75, 75);stop-opacity:1" /><stop offset="75%" style="stop-color:rgb(54, 50, 50);stop-opacity:1"/><stop offset="75%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Shouting') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:rgb(79, 75, 75);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(54, 50, 50);stop-opacity:1"/><stop offset="100%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        }
      } else {
        if (event.data.mode == 'Car') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1" /><stop offset="25%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1"/><stop offset="25%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Whisper') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1" /><stop offset="50%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1"/><stop offset="50%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Normal') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1" /><stop offset="75%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1"/><stop offset="75%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        } else if (event.data.mode == 'Shouting') {
          $('#grad7').html(
            '<stop offset="0%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1" /><stop offset="100%" style="stop-color:' +
              settings.sound +
              ';stop-opacity:1"/><stop offset="100%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
          );
        }
      }
      return;
    }
    if (event.data.type == 'UPDATE_HUD') {

      if(event.data.updateIdHud){
        $('.exile-id-id').html(event.data.updateIdHud)
      }

      if(settings.hudtype === true || settings.hudtype === false){
        hud = settings.hudtype

        $.post('https://e-hud/kariee-switchHud', JSON.stringify({hud}));
        
        if (hud === false){$('.hud').fadeOut(function(){})}
        if (hud === true){$('.hud').fadeIn(function(){})}
      }


      if (firstsize === false){
        if(settings.size){
          var kutas = settings.size * 60
          document.getElementById("suwaczek").value = kutas
          scaleofhud = settings.size
        }
      }
      
      if(settings.size){
        firstsize = true
        var scale = document.getElementById("suwaczek").value / 60;
        var resize = $('.hud')
        scaleofhud = scale
        resize.css({
            'transform': 'scale('+scale+')',
            'transform-origin':'right 100%'
        });
      }

      if (event.data.hunger) {
        var hungerlevel = Math.floor(event.data.hunger);
        $('#grad3').html(
          '<stop offset="0%" style="stop-color:' +
            settings.hunger +
            ';stop-opacity:1" /><stop offset="' +
            hungerlevel +
            '%" style="stop-color:' +
            settings.hunger +
            ';stop-opacity:1" /><stop offset="' +
            hungerlevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.thirst) {
        var thirstlevel = Math.floor(event.data.thirst);
        $('#grad4').html(
          '<stop offset="0%" style="stop-color:' +
            settings.thirst +
            ';stop-opacity:1" /><stop offset="' +
            thirstlevel +
            '%" style="stop-color:' +
            settings.thirst +
            ';stop-opacity:1" /><stop offset="' +
            thirstlevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.fuel) {
        var fuellevel = Math.floor(event.data.fuel);
        $('#grad10').html(
          '<stop offset="0%" style="stop-color:' +
            settings.fuel +
            ';stop-opacity:1" /><stop offset="' +
            fuellevel +
            '%" style="stop-color:' +
            settings.fuel +
            ';stop-opacity:1" /><stop offset="' +
            fuellevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.czas) {
        $('.time-text').html('<i class="fa-light fa-clock time clock" style="margin-right: 5px"></i>' + event.data.czas)
      }

      if(event.data.seatbelt) {
        $('#seatbelt').css('color', 'green')      
      } else {
        $('#seatbelt').css('color', 'red')
      }
    

      if (event.data.armor) {
        var armorlevel = Math.floor(event.data.armor);
        $('#grad2').html(
          '<stop offset="0%" style="stop-color:' +
            settings.armor +
            ';stop-opacity:1" /><stop offset="' +
            armorlevel +
            '%" style="stop-color:' +
            settings.armor +
            ';stop-opacity:1" /><stop offset="' +
            armorlevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.armor <= 0) {
        $('#armor').fadeOut(1000);
      }
      if (event.data.armor > 0) {
        $('#armor').fadeIn(1000);
      }
      if (event.data.fuel <= 0) {
        $('#fuel').fadeOut(1000);
      }
      if (event.data.fuel > 0) {
        $('#fuel').fadeIn(1000);
      }
      if (event.data.nurkowanie) {
        var oxygenlevel = Math.floor(event.data.nurkowanie);
        $('#grad5').html(
          '<stop offset="0%" style="stop-color:' +
            settings.oxygen +
            ';stop-opacity:1" /><stop offset="' +
            oxygenlevel +
            '%" style="stop-color:' +
            settings.oxygen +
            ';stop-opacity:1" /><stop offset="' +
            oxygenlevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.inwater) {
        $('#oxygen').fadeIn(1000);
      }
      if (!event.data.inwater) {
        $('#oxygen').fadeOut(1000);
      }
      if (event.data.stress <= 1) {
        $('#stress').fadeOut(1000);
      }
      if (event.data.stress > 1) {
        $('#stress').fadeIn(1000);
      }

      // if (event.data.stress) {
      // 	var stress = Math.floor(event.data.stress / 10)
      // 	$('#grad6').html('<stop offset="' + stress + '%" style="stop-color:rgb(142, 84, 233);stop-opacity:1" /><stop offset="' + stress + '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>')
      // }
      if (event.data.zycie) {
        var hplevel = Math.floor(event.data.zycie);
        $('#grad1').html(
          '<stop offset="0%" style="stop-color:' +
            settings.hp +
            ';stop-opacity:1" /><stop offset="' +
            hplevel +
            '%" style="stop-color:' +
            settings.hp +
            ';stop-opacity:1" /><stop offset="' +
            hplevel +
            '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      if (event.data.isdead) {
        $('#grad1').html(
          '<stop offset="0%" style="stop-color:' +
            settings.hp +
            ';stop-opacity:1" /><stop offset="0%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
        );
      }
      return;
    }
  });
  
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }
  




  function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  window.addEventListener('load', (event) => {
    $('#help').fadeOut(0);
  });


  await ImGui.default();

  const canvas = document.getElementById("output");
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.width = canvas.scrollWidth * devicePixelRatio;
  canvas.height = canvas.scrollHeight * devicePixelRatio;
  const context = canvas.getContext('2d');
  window.addEventListener("resize", () => {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.scrollWidth * devicePixelRatio;
    canvas.height = canvas.scrollHeight * devicePixelRatio;
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
  ImGui.CreateContext();
  ImGui_Impl.Init(canvas);

  ImGui.StyleColorsDark();
  window.requestAnimationFrame(_loop);
  //ImGui.StyleColorsClassic();

  let done = false;
  var align_hud = 0
  var align_taskbar = 0
  var aligns = [
    "Gora",
    "Dol",
    "Lewo",
    "Prawo"
  ]
  /*
      hp: rgbToHex(209, 0, 31),
      armor: rgbToHex(10, 89, 199),
      hunger: rgbToHex(252, 186, 3),
      thirst: rgbToHex(102, 79, 14),
      oxygen: rgbToHex(115, 143, 235),
      sound: rgbToHex(196, 190, 190),
  */
    var color = hexToRgb(settings.hp) 
    var color1 = hexToRgb(settings.armor) 
    var color2 = hexToRgb(settings.hunger) 
    var color3 = hexToRgb(settings.thirst) 
    var color4 = hexToRgb(settings.oxygen) 
    var color5 = hexToRgb(settings.sound) 
    var color6 = hexToRgb(settings.fuel) 

    var hud = true

    var scaleofhud = 1.0

    var enabled = true;  

  function _loop(time) {
      enabled = true
    context.clearRect(0, 0, canvas.width, canvas.height);
    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();

    ImGui.SetNextWindowPos(new ImGui.ImVec2(20, 20), ImGui.Cond.FirstUseEver);
    ImGui.SetNextWindowSize(new ImGui.ImVec2(294, 140), ImGui.Cond.FirstUseEver);
    ImGui.Begin("Ustawienia HUDu");
    // ImGui.Separator()
    // ImGui.TextColored(new ImGui.ImVec4(0.1,0.1,0.1,1.0), "Pozycja");
    // if(ImGui.BeginCombo("Pozycja HUDu", aligns[align_hud])) {
    //   aligns.forEach((align) => {
    //     const is_selected = (align == aligns[align_hud])
    //     if(ImGui.Selectable(align, is_selected)) {
    //       align_hud = aligns.indexOf(align)
    //       settings.align = aligns.indexOf(align)+1
    //     }
    //     if(is_selected) {
    //       ImGui.SetItemDefaultFocus()
    //     }
    //   })
    // }
    ImGui.Separator()
    ImGui.Text("Kolor")

    if(ImGui.ColorEdit4("HP", color)) {
      let hex = rgbToHex(Math.floor(color.x*255), Math.floor(color.y*255), Math.floor(color.z*255))
      $('#grad1').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.hp = hex
    }
    if(ImGui.ColorEdit4("Armor", color1)) {
      let hex = rgbToHex(Math.floor(color1.x*255), Math.floor(color1.y*255), Math.floor(color1.z*255))
      $('#grad2').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.armor = hex
    }
    if(ImGui.ColorEdit4("Glod", color2)) {
      let hex = rgbToHex(Math.floor(color2.x*255), Math.floor(color2.y*255), Math.floor(color2.z*255))
      $('#grad3').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.hunger = hex
    }
    if(ImGui.ColorEdit4("Napojenie", color3)) {
      let hex = rgbToHex(Math.floor(color3.x*255), Math.floor(color3.y*255), Math.floor(color3.z*255))
      $('#grad4').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.thirst = hex
    }
    if(ImGui.ColorEdit4("Tlen", color4)) {
      let hex = rgbToHex(Math.floor(color4.x*255), Math.floor(color4.y*255), Math.floor(color4.z*255))
      $('#grad5').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.oxygen = hex
    }
    if(ImGui.ColorEdit4("Voice", color5)) {
      let hex = rgbToHex(Math.floor(color5.x*255), Math.floor(color5.y*255), Math.floor(color5.z*255))
      $('#grad7').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.sound = hex
    }
    if(ImGui.ColorEdit4("Paliwo", color6)) {
      let hex = rgbToHex(Math.floor(color6.x*255), Math.floor(color6.y*255), Math.floor(color6.z*255))
      $('#grad10').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.fuel = hex
    }
    ImGui.Separator()
    if(ImGui.Button("Zapisz")) {
      saveSettings()
    }
    ImGui.SameLine()
    if(ImGui.Button("Skaluj")) {
      $('.suwak-container').fadeIn(function(){})
    }
    ImGui.SameLine()
    if(ImGui.Button("Zmien HUD")) {
      $.post('https://e-hud/kariee-switchHud', JSON.stringify({hud}));

      if (hud === false){$('.hud').fadeOut(function(){hud = true})}
      if (hud === true){$('.hud').fadeIn(function(){hud = false})}
      settings.hudtype = hud

    }
    ImGui.SameLine()
    if(ImGui.Button("Resetuj")) {
      resetSettings()
      $.post('https://e-hud/kariee-resetHud', JSON.stringify({}));
    }
    ImGui.Separator()
    ImGui.Text("ExileRP © 2022")

    ImGui.End();

    ImGui.EndFrame();

    ImGui.Render();
    const gl = ImGui_Impl.gl;
    gl && gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl && gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound

    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());

    window.requestAnimationFrame(done ? _done : _loop);
  }

  /*

        Trailer

  */

  async function startTrailer() {
    await ImGui.default()
    ImGui.CreateContext();
    ImGui_Impl.Init(canvas);
  
    ImGui.StyleColorsDark();
    window.requestAnimationFrame(_loop1);
    setTimeout(() => {
      hudpos = true
      setTimeout(() => {
        taskbarpos = true
        setTimeout(() => {
          hps = true
          setTimeout(() => {
            armorh = true
            setTimeout(() => {
              hungerh = true
              setTimeout(() => {
                thirsth = true
                setTimeout(() => {
                  oxygenh = true
                  setTimeout(() => {
                    soundh = true
                    setTimeout(() => {
                      fuelh = true
                    },550)
                  },550)
                },550)
              },550)
            }, 550)
          }, 550)
        }, 400)
      },400)
    }, 400)
  }

  var hudpos,taskbarpos,hps,armorh,hungerh,oxygenh,thirsth,soundh,fuelh

  function _loop1(time) {
      enabled = true
    context.clearRect(0, 0, canvas.width, canvas.height);
    ImGui_Impl.NewFrame(time);
    ImGui.NewFrame();

    ImGui.SetNextWindowPos(new ImGui.ImVec2(20, 20), ImGui.Cond.FirstUseEver);
    ImGui.SetNextWindowSize(new ImGui.ImVec2(294, 140), ImGui.Cond.FirstUseEver);
    ImGui.Begin("Ustawienia HUDu");
    ImGui.Separator()
    ImGui.TextColored(new ImGui.ImVec4(0.1,0.1,0.1,1.0), "Pozycja");
    if(hudpos && ImGui.BeginCombo("Pozycja HUDu", aligns[align_hud])) {
      aligns.forEach((align) => {
        const is_selected = (align == aligns[align_hud])
        if(ImGui.Selectable(align, is_selected)) {
          align_hud = aligns.indexOf(align)
          settings.align = aligns.indexOf(align)+1
        }
        if(is_selected) {
          ImGui.SetItemDefaultFocus()
        }
      })
    }
    if(taskbarpos && ImGui.BeginCombo("Pozycja Taskbara", aligns[align_taskbar])) {
      aligns.forEach((align) => {
        const is_selected = (align == aligns[align_taskbar])
        if(ImGui.Selectable(align, is_selected)) {
          align_taskbar = aligns.indexOf(align)
          settings.align1 = aligns.indexOf(align)+1
        }
        if(is_selected) {
          ImGui.SetItemDefaultFocus()
        }
      })
    }
    ImGui.Separator()
    ImGui.Text("Kolor")

    if(hps && ImGui.ColorEdit4("HP", color)) {
      let hex = rgbToHex(Math.floor(color.x*255), Math.floor(color.y*255), Math.floor(color.z*255))
      $('#grad1').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.hp = hex
    }
    if(armorh && ImGui.ColorEdit4("Armor", color1)) {
      let hex = rgbToHex(Math.floor(color1.x*255), Math.floor(color1.y*255), Math.floor(color1.z*255))
      $('#grad2').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.armor = hex
    }
    if(hungerh && ImGui.ColorEdit4("Glod", color2)) {
      let hex = rgbToHex(Math.floor(color2.x*255), Math.floor(color2.y*255), Math.floor(color2.z*255))
      $('#grad3').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.hunger = hex
    }
    if(thirsth && ImGui.ColorEdit4("Napojenie", color3)) {
      let hex = rgbToHex(Math.floor(color3.x*255), Math.floor(color3.y*255), Math.floor(color3.z*255))
      $('#grad4').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.thirst = hex
    }
    if(oxygenh && ImGui.ColorEdit4("Tlen", color4)) {
      let hex = rgbToHex(Math.floor(color4.x*255), Math.floor(color4.y*255), Math.floor(color4.z*255))
      $('#grad5').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.oxygen = hex
    }
    if(soundh && ImGui.ColorEdit4("Voice", color5)) {
      let hex = rgbToHex(Math.floor(color5.x*255), Math.floor(color5.y*255), Math.floor(color5.z*255))
      $('#grad7').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.sound = hex
    }
    if(fuelh && ImGui.ColorEdit4("Paliwo", color6)) {
      let hex = rgbToHex(Math.floor(color6.x*255), Math.floor(color6.y*255), Math.floor(color6.z*255))
      $('#grad10').html(
        '<stop offset="0%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:' +
          hex +
          ';stop-opacity:1" /><stop offset="' +
          100 +
          '%" style="stop-color:rgb(255, 255, 255);stop-opacity:1"/>'
      );
      settings.fuel = hex
    }
    ImGui.Separator()
    if(ImGui.Button("Zapisz")) {
      saveSettings()
    }
    ImGui.SameLine()
    if(ImGui.Button("Skaluj")) {
      $('.suwak-container').fadeIn(function(){})
    }
    ImGui.SameLine()
    if(ImGui.Button("Zmien HUD")) {
      $.post('https://e-hud/kariee-switchHud', JSON.stringify({hud}));

      if (hud === false){$('.hud').fadeOut(function(){hud = true})}
      if (hud === true){$('.hud').fadeIn(function(){hud = false})}
      settings.hudtype = hud
    }z
    ImGui.SameLine()
    if(ImGui.Button("Resetuj")) {
      resetSettings()
      $.post('https://e-hud/kariee-resetHud', JSON.stringify({}));
    }
    ImGui.Separator()
    ImGui.Text("by exilerp for ExileRP © 2022")

    ImGui.End();

    ImGui.EndFrame();

    ImGui.Render();
    const gl = ImGui_Impl.gl;
    gl && gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl && gl.clear(gl.COLOR_BUFFER_BIT);
    //gl.useProgram(0); // You may want this if using this code in an OpenGL 3+ context where shaders may be bound

    ImGui_Impl.RenderDrawData(ImGui.GetDrawData());

    window.requestAnimationFrame(done ? _done : _loop1);



    
  }



  /*

    Trailer end

  */




  

  function _done() {
    ImGui_Impl.Shutdown();
    ImGui.DestroyContext();
  }

  async function disableMenu() {
    if(enabled) {
        enabled = false
        _done()
    }
  }

  setTimeout(() => {
    disableMenu()
  },10)

  async function enableMenu() {
    await ImGui.default()
    ImGui.CreateContext();
    ImGui_Impl.Init(canvas);
  
    ImGui.StyleColorsDark();
    window.requestAnimationFrame(_loop);
  }
  
})();


$('.close-suwak').click(function(){
  $('.suwak-container').fadeOut(function(){})
})