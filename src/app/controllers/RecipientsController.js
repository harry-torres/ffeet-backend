import Recipient from '../models/Recipient';

class RecipientController {
  async index(_, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);
    return res.json({ recipient });
  }

  async store(req, res) {
    const recipient = await Recipient.create(req.body);
    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);
    recipient.update(req.body);
    return res.json(recipient);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);
    if (recipient) recipient.destroy();
    return res.json(recipient);
  }
}

export default new RecipientController();
