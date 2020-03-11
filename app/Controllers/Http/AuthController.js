'use strict'

class AuthController {

  async getLogin({ view }) {
    return view.render('layouts.login')
  }

  async postLogin({ request, response, auth }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)
    return response.route('profile')
  }

  async postLogout({ auth, response }) {
    await auth.logout()
    return response.route('/')
  }

  async getProfile({ auth, view }) {
    const user = auth.user.toJSON()
    return view.render('layouts.profile', {user: user})
  }

  // JWT
  async postLoginJwt({ request, auth }) {
    const { email, password } = request.all()
    return auth
      .authenticator('jwt')
      .withRefreshToken()
      .attempt(email, password)
  }

  async getProfileJwt({ response, auth }) {
    return response.send(auth.current.user)
  }  
  
  async getCustomResponseJwt({ response, auth }) {
    return response.send("KasirPintar")
  }

  async postRefreshTokenJwt({ request, auth }) {
    const refreshToken = request.input('refresh_token')
    return await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken)
  }

  async postLogoutJwt({ auth, response }) {
    const apiToken = auth.getAuthHeader()
    await auth
      .authenticator('jwt')
      .revokeTokens([apiToken])
    return response.send({ message: 'Logout successfully!'})
  }

}

module.exports = AuthController
