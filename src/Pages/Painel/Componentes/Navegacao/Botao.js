import { Link } from 'react-router-dom';
import './Navegacao.css';

function Botao({ titulo, ativo }) {
    return (
        
            <Link className={`botao ${ativo ? 'ativo' : ''}`} to={`/${titulo}`}>
                <div className={`botao ${ativo ? 'ativo' : ''}`} to={`/${titulo}`}>
                <h3>{titulo}</h3>
                 </div>
            </Link>
       
    );
}

export default Botao;
