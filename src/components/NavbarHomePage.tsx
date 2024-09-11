import NavbarClientHomePage from "./NavbarClientHomePage";
import { getUserBySessionUseCase } from "@/use-cases/users";
import { User } from "@/db/schema";

const Navbar = async () => {
  const authStatus = await getUserBySessionUseCase();

  return <NavbarClientHomePage authStatus={authStatus as User} />;
};

export default Navbar;
