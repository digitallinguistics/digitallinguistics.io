module.exports = {

  secret: 'S4v3D4t4!',

  services: {
    onedrive: {

      development: {
        baseUrl: 'https://login.live.com/oauth20_authorize.srf?',
        clientId: '000000004C17A3A0',
        host: 'login.live.com',
        path: '/oauth20_token.srf',
        scope: 'wl.signin wl.offline_access',
        secret: 'FPnSX90ptw2swE6GONSGsaA3WMPs8Nsj'
      },

      local: {
        baseUrl: 'https://login.live.com/oauth20_authorize.srf?',
        clientId: '000000004C16D403',
        host: 'login.live.com',
        path: '/oauth20_token.srf',
        scope: 'wl.signin wl.offline_access',
        secret: 'DsrC9Iz0jELj39rtlEfbXg7daKjtEQaw'
      },

      production: {
        baseUrl: 'https://login.live.com/oauth20_authorize.srf?',
        clientId: '000000004017EEBF',
        host: 'login.live.com',
        path: '/oauth20_token.srf',
        scope: 'wl.signin wl.offline_access',
        secret: '4XFflNWPqqt4VzJNoWRiQ2SuzrjOL-oN'
      }

    }
  }

};
