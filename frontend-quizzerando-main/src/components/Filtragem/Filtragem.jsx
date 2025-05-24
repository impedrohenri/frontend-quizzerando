import { ListGroup } from "react-bootstrap";//Importa um componente listgroup do bootstrap usado no react listas estilizadas
import categorias from '../../data/categorias.json'//Importa as categorias de um arquivo JSON
import React, {usestate} from "react";//importa hook useState para modificar o estado

const [categoriasSelecionadas, setcategoriasSelecionadas] = usestate([])//Usanado o use state para criar estado chamado categoriasSelecionada 
//que começa vazio ele serve para guarda as categorias estão marcadas no filtro

//Quando o usuario clica marca ou desmarcar uma opção,isso dispara o evento
//onChange,e a função handleChange é chamada para lidar
const handleChange = (categorias) =>{
    let novasCategorias = [];//cria uma variavel com array vazio armazenar as categorias


    if (categoriasSelecionadas.includes(categorias)){//verifica se array tem categorias esta dentro do array categoriasSelecionadas.
        novasCategorias = categoriasSelecionadas.filter(cat)//vai verificar se o item clicado corresponde ao array categoriasSelecionadas.
        // Acima Uma função para desmarcar a checkbox
    }
    else{
        //operador spread(...) para criar esse novo array
        novasCategorias= [...categoriasSelecionadas, categorias];//Uma função para marcar a checkbox
    }
    //definir/atualizar o array novats categorias utilizado
    setcategoriasSelecionadas(novasCategorias)//Array contém as novas categorias que foram filtradas 
    //Envia a lista atualizada para o componente principal/pai
    onFiltrar(novasCategorias);

}

export default function Filtragem(props) {

    return (
        <ListGroup id={props.id} className={`rounded-0 rounded-bottom-4 ${props.className}`}>
            {Object.keys(categorias).map((cat, key) => (
                <ListGroup.Item key={key}>
                    <input type="checkbox" className="btn-check" id={cat} autoComplete="off" />
                    <label className="btn btn-outline-secondary w-100 rounded-pill" htmlFor={cat}>{cat}</label>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}