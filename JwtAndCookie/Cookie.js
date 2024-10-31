const setRefreshTokenCookie = (res, refresh_token) => {
  res.cookie('refresh_token', refresh_token, {
    //Opsn when finish
    //sameSite: 'none',
    //secure: true,
    //httpOnly: false,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}
const clearCookie = (res) => {
  res.clearCookie('refresh_token', {
    /*httpOnly: true,
    secure: true,
    sameSite: 'strict',*/
  });
}
module.exports = {
  setRefreshTokenCookie,
  clearCookie
};