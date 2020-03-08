import React from 'react'
import { connect } from 'react-redux'
import Perfil from '../components/Perfil'
import EditarPerfil from '../components/EditarPerfil';
import "../css/estilosPerfil.css"

class PerfilUsuarioContainer extends React.Component {
    constructor(){
        super()
        this.state = {
            editP: false,
            editPass: false,
            carrito: false,
            comprasPerf: false,
        }
    }
    // me va a renderizar el componente formulario para que puedo editar mi perfil, cuando le doy click al boton
    editPerfil(){
   this.setState({editP: true,
    editPass: false,
    carrito: false,
    comprasPerf: false,

})
    }
    // me va a renderizar el componente para cambiar la contrasena, cuando le doy click al boton
    editPassword(){
        this.setState({editP: true,
            editPass: false,
            carrito: false,
            comprasPerf: false,

        })
    }
    // me va a renderizar el componente de mi carrito, cuando le doy click al boton
    miCarrito(){
        this.setState({editP: true,
            editPass: false,
            carrito: false,
            comprasPerf: false,

        })
    }
    // me va a renderizar el componente de mis compras, cuando le doy click al boton
    comprasPerfil(){
        this.state.comprasPerf = true
    }
    render() {

        const {userLogueado} = this.props
        console.log('sdsfdsfdsfsd',userLogueado)
        return (
                <Perfil userLogueado={userLogueado}/>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        userLogueado: state.login.userLogueado
    };
  };

  export default connect(mapStateToProps, null)(PerfilUsuarioContainer);
