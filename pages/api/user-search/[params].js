import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "GET") {
    const param = req.query.params;

    let client, collection;

    try {
      client = await connectToDatabase();
      if (!client) throw new Error("Error! cannot connect to database.");

      collection = await client.db().collection("users-account");

      if (!collection) throw new Error("Collection notFound!");
    } catch (error) {
      res.status(404).json({ message: error.message });
      client?.close();
      return;
    }
    const regExpertion = new RegExp(param);

    const findedCursor = await collection.find({
      username: { $in: [regExpertion] },
    });

    let usersFinded = [];

    await findedCursor.forEach(item => usersFinded.push(item));

    res.status(200).json({ data: usersFinded, message: "Success" });
    client.close();
    findedCursor.close();
    return;
  }
}

export default handler;
