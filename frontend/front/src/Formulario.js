import React from 'react'

const Formulario = ({botao, evento, cadastrar, obj, cancelar, remover, alterar}) => {
  return (
    <div>
        <form action="">
            <input type="text" value={obj.nome} onChange={evento} name="nome" placeholder='Nome' className='form-control'/>
            <input type="text" value={obj.marca} onChange={evento} name="marca" placeholder='Marca' className='form-control'/>
            {
              botao ?
                <input type="button" value="Cadastrar" onClick={cadastrar} className='btn btn-primary'/>
                :
                <div>
                  <input type="button" value="Alterar" onClick={alterar} className='btn btn-warning'/>
                  <input type="button" value="Excluir" onClick={remover} className='btn btn-danger'/>
                  <input type="button" value="Cancelar" onClick={cancelar} className='btn btn-secondary'/>
                </div>
            }
        </form>
    </div>
  )
}

export default Formulario;