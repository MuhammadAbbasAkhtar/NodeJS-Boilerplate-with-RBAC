const APP_NAME = process.env.APP_NAME

module.exports = { 
    MONGO_CONN_OPTIONS: { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false  },
    JWT_SECRET:'1yc2EAAAABJQAAAgEAzHD87c2gFcH6qkHVWIRNnqiQ5Qo7WsS1/Lp4DqJHYDw0nMZWMRV0rOF5karY0AzWxIrakgUmkTAP20OifUT06RU4sTr5zI7/2z73MAAAIBALfIZzg1zwhl4UEyPXxwBO1qN1PRJtYvy1BDUzP5M46Of254oe0tg7/caJxX+Sfyx/udy/jssMbM3SYsEq52ONrOogO4PgtNaSc5hoEzEpyKVred/axFKo4NrA3y5SKDHHbVyj37Cwr2pBCRAUW+q',
    REFRESH_TOKEN_SECRET:'a/aJRQJ\qV*K9K3!$]}V!*t!9_.&k+Z.Cgr!,MYeAY@:GUL8EwVT6spYpuAh^gL?77PB;@V{Vu?m<{kv**h~?~*Dn.T*kp^UbjsAPkqjB?Ry-KTKf*],!9qce^SSCjmKr8\XzA8arxMLN3}*?hs.h<9=!5#!J@2&mBe/YQ94t:L<W.XP)4x/U)FvHE?n3PBt&kJL?8g~u!%!K?a9pGmtcdYbv@$y&-xRQX2#:6:t%L~!P&t/mxJxnqdK)w8552HH',
    REFRESH_TOKEN_LIFE:"30d",
    REFRESH_TOKEN_ALGO:"HS256",
    tokenExpireTime:"4h",
    welcome_email_subject: `Welcome to ${APP_NAME}`,
    emailUrl:'/api/auth/verify/',
    emailLocalUrl:`/api/auth/verify/`,
    EMAIL_TOKEN_EXPIRY:"12h",
    directories:{
        logs: 'logs',
        uploadsRoot: 'uploads',
        uploadsPublic: 'uploads/public',
        uploadsPrivate: 'uploads/private',
    }
 
}
