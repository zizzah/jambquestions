import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

import { v4 as uuidv4 } from 'uuid';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

const userQuery = await sql`
  SELECT id, email, password
  FROM users
  WHERE email = ${email}
`;

if (!userQuery[0]) {
  return res.status(401).send({ message: 'Invalid email or password' });
}

const user = userQuery[0];
const isPasswordValid = await bcrypt.compare(password, user.password);

if (!isPasswordValid) {
  return res.status(401).send({ message: 'Invalid email or password' });
}

const token = uuidv4();

await sql`
  INSERT INTO sessions (token, user_id)
  VALUES (${token}, ${user.id})
  ON CONFLICT (user_id) DO UPDATE
    SET token = ${token}
`;

return res.send({ token });
}
