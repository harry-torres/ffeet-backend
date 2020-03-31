import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  constructor() {
    // TODO: use decorators to provide this info
    this.store.noAuth = true;
  }

  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    const canLogin = user && (await user.checkPassword(password));

    if (!canLogin) {
      return res
        .status(401)
        .json({ error: 'Invalid username or wrong password!' });
    }

    const { id } = user;
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({ token });
  }
}

// SessionController.prototype.store.noAuth = true;

export default new SessionController();
