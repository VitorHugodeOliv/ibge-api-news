import './Header.css';
import logo from '../../Imagens/logo_trybe-escola-de-programacao_qa5YhY.png';

function Header() {
  return (
    <div className="header">
      <img
        src={ logo }
        alt="Logo"
        className="header-logo"
      />
      <div className="header-title">Título do Cabeçalho</div>
    </div>
  );
}

export default Header;
