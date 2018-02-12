import Inferno from 'inferno'
import Component from 'inferno-component'
import './Tiles.css'

class Tile extends Component {
	//TODO: add props, lifecycle hooks, other stuff
	render(){
		return(
			<div className="tile">
				<h1> I am a Project Title</h1>
                <div className="details">
                    <p><strong>AQ Code: </strong>S19</p>
                    <p><strong>County: </strong>Burlington</p>
                    <p><strong>MCD: </strong>Various</p>
                </div>
                <p className="description">
                    There are dozens of us! DOZENS! It looks like you've been looking for dragons… in the future. These are my awards, Mother. From Army. The seal is for marksmanship, and the gorilla is for sand racing...
                </p>
                <table>
                    <thead>
                        <th>Phase</th>
                        <th>Fund</th>
                        <th className="table-num">2017</th>
                        <th className="table-num">2018</th>
                        <th className="table-num">2019</th>
                        <th className="table-num">2020</th>
                        <th className="table-num">2021-2024</th>
                        <th className="table-num">2025-2028</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ROW</td>
                            <td className="table-num">185</td>
                            <td className="table-num">0</td>
                            <td className="table-num">23</td>
                            <td className="table-num">14</td>
                            <td className="table-num">10</td>
                            <td className="table-num">85</td>
                            <td className="table-num">1</td>
                        </tr>
                        <tr>
                            <td>PEFR</td>
                            <td className="table-num">185</td>
                            <td className="table-num">0</td>
                            <td className="table-num">23</td>
                            <td className="table-num">14</td>
                            <td className="table-num">10</td>
                            <td className="table-num">85</td>
                            <td className="table-num">1</td>
                        </tr>
                        <tr>
                            <td>SNKR</td>
                            <td className="table-num">185</td>
                            <td className="table-num">0</td>
                            <td className="table-num">23</td>
                            <td className="table-num">14</td>
                            <td className="table-num">10</td>
                            <td className="table-num">85</td>
                            <td className="table-num">1</td>
                        </tr>
                        <tr>
                            <td>SNKR</td>
                            <td className="table-num">185</td>
                            <td className="table-num">0</td>
                            <td className="table-num">23</td>
                            <td className="table-num">14</td>
                            <td className="table-num">10</td>
                            <td className="table-num">85</td>
                            <td className="table-num">1</td>
                        </tr>
                    </tbody>
                </table>
                <button>Comments</button>
            </div>
		)
	}
}

export default Tile