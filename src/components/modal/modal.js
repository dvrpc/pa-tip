import Inferno from 'inferno'
import Component from 'inferno-component'
import swal from 'sweetalert2'

// issue: swal is a function that I was trying to just render as an element
class Modal extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                {
                    swal({
                        title: this.props.title,
                        html: this.props.html,
                        type: 'info'
                    })
                }
            </div>
        )
    }
}

export default Modal