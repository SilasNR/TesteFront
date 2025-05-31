import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Form, Spinner } from 'react-bootstrap';
import "./Navegacao.css"

function Navegacao(param){
    const [display, setDisplay] = useState("block");


    return(
        <>
            <Row fluid style={{display:display}} onClick={() => {setDisplay("none")}} className='opcao px-0'>
                <div><p>{param.titulo}</p></div>
            </Row>
        </>
    )
}

export default Navegacao;