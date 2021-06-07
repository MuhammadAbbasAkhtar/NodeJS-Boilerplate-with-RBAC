const APP_NAME = process.env.APP_NAME

module.exports = { 
    MONGO_CONN_OPTIONS: { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false  },
    JWT_SECRET:'MJpk3yxeslEbwVY%5$QwjJKWeWDtdX^D1AGN!o+VrYHi0DN1+pBBRW24sTIofm8APHW*eIBgHrB#8nbZQrBAAA(FQ+D6BjxPF00r83XUA4ybSpsRx4T+2wAAAgBeP5VJ48Xl40RDjpIjGx/4rnhJo8MymoB1exz9TLxZSBcvsseM36FIpK2bH7SocqYCKog1/95WYpCDxRyGvh5O92+d7/BrUbrLUcbrzR9PdII8S35PuZOGBMd8e/EALrXQrtWAon2P+3GEhWmk4zRlwVlsOupYF8wZua/rvN2qXTSPHyw',
    REFRESH_TOKEN_SECRET:'AE2VjZHNhLXNoYTItbmlzdHA1MjEAAAAIbmlzdHA1MjEAAACFBAArudxWYUv1yikWAEsEL82yKKaFEKAIWhqq6Ei11p2tDOjqcjPz7FthXky6Rtof7eSgcwmeERwxfYBBfh3LGHDEUwDHzL0Y5MbswMiMVklb0Drzhr8gQ0+UTHoiYLgJDyNuvo8Bvot5ht7qN4lTy3soDq0zPgC87nCBNc6pT1KnmEE8fg',
    REFRESH_TOKEN_LIFE:"365d",
    REFRESH_TOKEN_ALGO:"HS256",
    tokenExpireTime:"6h",
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