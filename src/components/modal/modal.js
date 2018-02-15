import Inferno from 'inferno'
import Component from 'inferno-component'
import swal from 'sweetalert2'

class Modal extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            swal({
                title: this.props.title,
                text: this.props.text,
                type: 'info'
            })
        )
    }
}

export default Modal