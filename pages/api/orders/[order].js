// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const data = require('../data.json');

export default function handler(req, res) {
    const item = req.query.order;
    const orders = data.events;
    const order = orders.find( ord => ord.order === item );
    res.status(200).json(order);
  }
  