import React from 'react';
import Axios from 'axios';
import Loading from './Loading';


class NoteDetails extends React.Component {
    state = {
        note: null
    };

    handleCompleteCheckbox = (e) => {
        Axios.patch(`http://localhost:5000/api/notes?id=${e.target.id}`, {status: e.target.checked})
            .then(response =>{
               
                this.setState({
                    notes: response.data
                })
            }
            )
    };

    handleDelete = (e) => {
        Axios.delete(`http://localhost:5000/api/notes/${this.state.note.id}`)
            .then(response =>
                this.props.history.push('/')
            )
    };

    componentDidMount() {
        const id = this.props.match.params.note_id;
        Axios.get(`http://localhost:5000/api/notes/${id}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                
                note: response.data
            })})
    }

    render() {
        const content = this.state.note ? (
            <div className="note card">
                <div className="card-content">
                    <span className="card-title center">{this.state.note.title}</span>
                    <pre>{this.state.note.content}</pre>
                </div>
                <div className="card-action row valign-wrapper">
                    <div className="col s4 left-align">
                        <form>
                            <label>
                                <input type="checkbox" id={this.state.note.id} onClick={this.handleCompleteCheckbox}
                                       defaultChecked={this.state.note.complete} className="complete-checkbox"/>
                                <span>Complete</span>
                            </label>
                        </form>
                    </div>

                    <div className="col s4 center-align">
                        <p>{this.state.note.date}</p>
                    </div>
                    <div className="col s4 right-align">
                        <button className="btn red darken-3 " onClick={this.handleDelete}>
                            <i className="material-icons right">delete</i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>) : (<Loading/>);

        return (
            <div className="container">
                {content}
            </div>
        )
    }
}

export default NoteDetails