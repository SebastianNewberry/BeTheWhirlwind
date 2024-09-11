import NavbarClient from "./NavbarClient";
import { getUserBySessionUseCase } from "@/use-cases/users";
import { User } from "@/db/schema";

const Navbar = async () => {
  const authStatus = await getUserBySessionUseCase();

  return <NavbarClient authStatus={authStatus as User} />;
};

export default Navbar;
