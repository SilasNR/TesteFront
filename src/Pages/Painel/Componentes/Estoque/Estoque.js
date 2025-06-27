import Lista from "./Lista/Lista.js"
import { useEffect, useState } from 'react';
import { getProdutos } from '../../../../service/produto.service.js';
import Filtro from '../Filto/Filtro.js';

function Estoque() {
    const [produtos, setProdutos] = useState([]);

    const buscarAteEncontrar = async () => {////////////////////////////////////////////////////////////////Busca produtos no banco
        let encontrado = false;
        let tentativas = 0;
        const maxTentativas = 3;
        while (!encontrado && tentativas < maxTentativas) {
            tentativas++;
            const data = await getProdutos();
            if (Array.isArray(data) && data.length > 0) {
                setProdutos(data);
                console.log(produtos);

                console.log("Encontrado");
                encontrado = true;
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000)); // espera 2 segundos 
                console.log("Buscando produto...");
            }
        }
    };

    useEffect(() => {
        buscarAteEncontrar();
    });

    const [titulos] = useState([
        "Código",
        "Estoque Frente",
        "Estoque Fundo",
        "Total de Peças"
    ]);

    const [campos] = useState([
        "codigo",
        "quantidade",
        "caixa",
        "total"
    ]);

    const aoClicar = () => {

    }

    return (
        <>
            <Filtro /*mudarModal={mudarModal}*/ tela="produto"/>
            <Lista valores={produtos} titulos={titulos} campos={campos}  aoClicar={aoClicar} resposta="Não há produtos em estoque"/>
        </>
    )
}

export default Estoque;