import "./Navegacao.css"
import { Row } from 'react-bootstrap';

function Botao(param) {

    return (
        <>
            <Row fluid style={{/*display:display}} onClick={() => {setDisplay("none")*/ }} className='opcao px-0'>
                <div><p>{param.titulo}</p></div>
            </Row>
        </>
    )
}

export default Botao;