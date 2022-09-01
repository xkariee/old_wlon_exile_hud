fx_version 'adamant'
game 'gta5'
version '1.0.0'

client_scripts {
  '@es_extended/imports.lua',
	'client/client.lua',
  'config.lua'
}
server_scripts {
  'server/server.lua'
}

ui_page 'html/ui.html'

exports {
  'RadarShown',
  'getAlign',
  'GetStreetsCustom'
}

files {
  'html/**',
}