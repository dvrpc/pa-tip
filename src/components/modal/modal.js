import Inferno from 'inferno'
import Component from 'inferno-component'
import swal from 'sweetalert2'

// TODO: include the HTML. Data table, full description, comment text area, ability to print(?)
// TODO: update URL when a modal pops up 
// FOOTER: it's a text box so it doesn't need to come in from props. can jsut be made right here

const footer = '<h2>Add a comment </h2><textarea></textarea><input type="submit" value="submit">'

class Modal extends Component{
    constructor(props){
        super(props)
    }

    render(){
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