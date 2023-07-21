const jwt = require('jsonwebtoken');

// set token secret and expiration date
const accessTokenSecret = 'mysecretsshhhhh';
const refreshTokenSecret = 'myrefreshtokensecret';
const accessTokenExpiration = '2h';
const refreshTokenExpiration = '1000d'

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, accessTokenSecret);
      req.user = data;
    } catch(err) {
      if(err.name === 'TokenExpiredError'){
        try{
            const {data} = jwt.verify(token, refreshTokenSecret)

            const newAccessToken = jwt.sign({data}, accessTokenSecret, {
                expiredIn: accessTokenExpiration,
            })
            req.user = data;
            req.accessToken = newAccessToken;

        }catch (refreshTokenError){
            console.log('Invalid or expired token')
        }
    } else {
        console.log('Invalid token')
    }
      };

    return req;
  },
  signToken: function ({ name, email, _id }) {
    const accessTokenPayload = { name, email, _id };
    const refreshTokenPayload = {_id};

    const accessToken = jwt.sign({data: accessTokenPayload}, accessTokenSecret,{expiresIn: accessTokenExpiration} );
    const refreshToken = jwt.sign({data: refreshTokenPayload}, refreshTokenSecret,{expiresIn: refreshTokenExpiration} )

    return {accessToken, refreshToken};
  },
};
