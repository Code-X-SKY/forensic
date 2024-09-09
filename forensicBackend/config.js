module.exports = { 
    mysqlHost: "",
      user: "",
      password: '',
      database: "forensic", 
      mysqlPort: 3306,
      JWT_SECRET_KEY: 'ly27lg35kci85tvgvl0zgbod4',
      SESSION_EXPIRES_IN: '365d',
      flagUrl:'https://espsofttech.org:6014/api/flags/',
      STRIPE_SECRET_KEY:'sk_test_51I1B19DGoZy86ujNGMhkjFdSBgUdys9HiqLSobHjtiwGWTxndimpkwrVuC5u4Q41seTII8uUHqDkx5pOS7hM1ei400HAioGbvG',

      // email_verify_link : 'https://espsofttech.org/collecto-admin',
      email_verify_link : 'http://localhost:3000',
      // Email Configuration
      authMailUser:'',
      authMailPass:'',
      mailFrom:'',
      mailUrl:'https://espsofttech.org:60155/api/',

      // SMS Configuration
      smsApiUrl:'https://api.smsapi.com/sms.do',
      smsAuthToken:'Bearer uOPs3AmVrUViQo74Y6fX7EeFbu6QMBQI1zjYEtbw',
      smsSenderName:'Test',
  }
