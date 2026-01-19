import { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  role: string;
}

export { TokenPayload };