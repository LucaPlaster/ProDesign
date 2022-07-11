import logo from '../../assets/img/logo.svg'
import './styles.css'

function Header() {
    return (
        <header>
            <div className="ProDesigner-logo-container">
                <img src={logo} alt="ProDesigner"/>   
                <h1>ProDesigner</h1>   
                <p>
                    Desenvolvido por
                    <a href="https://www.instagram.com/luca_plaster/">@luca_plaster</a>
                </p>
            </div>
        </header>
    )
  }

export default Header;