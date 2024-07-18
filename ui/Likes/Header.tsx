type HeaderProps = {
    length: number;
  };

const Header: React.FC<HeaderProps> = ({length}) => {
  return (
    <div className="mb-5">
      <p className="text-4xl font-bold text-white">You Like</p>
      <p className="text-4xl font-bold text-white">
        <strong className="italic text-blue-500">{length}</strong> Words
      </p>
    </div>
  );
}

export default Header;