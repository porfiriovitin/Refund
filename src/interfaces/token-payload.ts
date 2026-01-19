import { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  role: string;
  sub: string;
}

export { TokenPayload };