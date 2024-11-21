import { useState, useEffect } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res_conv => {
      if(res_conv.mensagem !== undefined) {
        alert(res_conv.mensagem);
      }else{
        setProdutos([...produtos, res_conv]);
        alert('Produto cadastrado com sucesso.');
        limparFormulario();
      }
    })
  }

  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res_conv => {
      alert(res_conv.mensagem);

      let vetorTemp = [...produtos];

      let index = vetorTemp.findIndex((p)=>{
        return p.codigo === objProduto.codigo;
      });

      vetorTemp.splice(index, 1);

      setProdutos(vetorTemp);

      limparFormulario();
    })
  }

  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res_conv => {
      if(res_conv.mensagem !== undefined) {
        alert(res_conv.mensagem);
      }else{
        alert('Produto alterado com sucesso.');

        let vetorTemp = [...produtos];

        let index = vetorTemp.findIndex((p)=>{
          return p.codigo === objProduto.codigo;
        });

        vetorTemp[index] = objProduto;

        setProdutos(vetorTemp);
        limparFormulario();
      }
    })
  }


  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);

  }

  const selecionarProduto = (index) => {
    setObjProduto(produtos[index]);
    setBtnCadastrar(false);
  }

  return (
    <div>
      <Formulario botao={btnCadastrar} evento={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
