import Inferno from 'inferno'
import Component from 'inferno-component'
import swal from 'sweetalert2'

// TODO: update URL when a modal pops up 

const getComment = () => console.log('input area submitted a comment')


class Modal extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const footer = `<h2>Add a comment </h2><textarea></textarea><input type="submit" value="submit" onSubmit={linkEvent(this, getComment)}>`
        return(
            <div id="modal">
                {
                    swal({
                        title: this.props.title,
                        width: '50%',
                        padding: 80,
                        html: this.props.html,
                        showConfirmButton: false,
                        footer: footer
                    })
                }
            </div>
        )
    }
}

export default Modal