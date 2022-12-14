import { findUser } from "../../../../lib/api-lib";

async function handler(req, res) {
  if (req.method === "GET") {
    const username = req.query.username;

    let clientGlobal;
    try {
      const { user, client } = await findUser(username, "users-account");
      clientGlobal = client;

      res.status(200).json({ data: user, message: "Success" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

    clientGlobal.close();
    return;
  }
}

export default handler;
