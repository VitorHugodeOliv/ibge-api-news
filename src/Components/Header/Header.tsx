import './Header.css';
import logo from '../../Imagens/274-1.png';

function Header() {
  return (
    <div className="header">
      <img
        src={ logo }
        alt="Logo"
        className="header-logo"
      />
      <div className="header-title">IBGE News</div>
    </div>
  );
}

export default Header;
