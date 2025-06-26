import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

import { v4 as uuidv4 } from 'uuid';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Handles user login requests.
 * 
 * This function processes POST requests containing an email and password, verifying the user's credentials against the database.
 * If the credentials are valid, a session token is generated and stored, and the token is returned in the response.
 * 
 * @param req - The Next.js API request object, containing the email and password in the body.
 * @param res - The Next.js API response object used to send the response back to the client.
 * 
 * @returns A JSON response with a session token if the login is successful, or an error message if the login fails.
 * 
 * @throws Returns a 405 error if the request method is not POST.
 * @throws Returns a 400 error if the email or password is missing.
 * @throws Returns a 401 error if the email does not exist or the password is incorrect.
 */

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
