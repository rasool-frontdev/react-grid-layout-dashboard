import UserBox from "./userBox";

const Header = () => {
  return (
    <div className="h-12 sticky z-10 top-0 shadow backdrop-blur-md bg-background">
      <div className="flex justify-between items-center h-full px-8">
        <div>LOGO</div>
        <UserBox />
      </div>
    </div>
  );
};

export default Header;
