import React from 'react';
import Axios from 'axios';
import Loading from './Loading'
import $ from "jquery";
import M from "materialize-css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class NoteEdit extends React.Component {
    state = {
        id: null,
        title: '',
        content: '',
        date: ''
    }

    componentDidMount() {
        const id = this.props.match.params.note_id;

        if (id !== '-1') {
            Axios.get(`http://localhost:5000/api/notes/${ id }`)
                    .then(response => { 
                        this.setState({
                            id: response.data.id,
                            title: response.data.title,
                            content: response.data.content,
                            date: response.data.date,
                        });
                        M.textareaAutoResize($('#body_text'));
                        M.updateTextFields();
                    })
        } else {
            this.setState({
                note: { 
                    title: '',
                    content: '',
                    date: null
                }
            })
        }          

    }

    handleSave = e => {
        let note = {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content,
            date: this.state.date
        };

        console.log(note);

        if (note.id === null) {
            Axios.post('http://localhost:5000/api/notes', { note: note })
                .then( response =>
                    this.props.history.push('/details/' + response.data.id)
                );
        } else {
            Axios.put(`http://localhost:5000/api/notes?id=${ note.id }`, { note: note })
                .then( response =>
                    this.props.history.push('/details/' + note.id)
                );
        }
    };

    handleTimlessClick = e => {
        let date = null;
        if (e.target.checked) {
            date = '';
        } else {
            date = new Date().toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        }
        this.setState({date: date});
    }

    handleDateChange = e => {
        let date = new Date(e).toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });      
        this.setState({ date: date });
    };

    handleTitleChange = e => {
        let title = e.target.value;    
        this.setState({ title: title });
    };

    handleContentChange = e => {
        let content = e.target.value;       
        this.setState({ content: content });    
    };

    render() {
        const { title, content, date } = this.state;
        const displayedCard = this.state.note !== null ? (
            <div className="note card">
                <div className="card-content">
                    <form>
                        <div className="input-field">
                            <i className="material-icons prefix">text_format</i>
                            <input id="title" type="text" className="validate" value={ title } onChange={ this.handleTitleChange }/>
                            <label htmlFor="title" className="active">Note's Title</label>
                        </div>

                        <div className="input-field">
                            <i className="material-icons prefix">mode_edit</i>
                            <textarea id="body_text" className="materialize-textarea" value={ content } onChange={ this.handleContentChange }/>
                            <label htmlFor="body_text" className="active">Note's content</label>
                        </div>
                        
                        <div className={date === '' ? 'input-field hide' : 'input-field'}>
                            <i className="material-icons prefix">date_range</i>
                            <label htmlFor="date" className="active">Note's date</label>
                            <DatePicker 
                                selected={ date !== '' ? new Date(date) : new Date() } 
                                onChange={this.handleDateChange} 
                                dateFormat="MMMM dd, yyyy"
                                className="datePicker" 
                            />
                        </div>
                    </form>
                </div>

                <div className="card-action row valign-wrapper">
                    <div className="col s4 left-align">
                        <button className="btn red darken-3" onClick={ this.handleSave }>
                            <i className="material-icons left">save</i>
                            Save
                        </button>
                    </div>
                    <form className="right-align col s8">     
                        <label>
                            <input type="checkbox" checked={ this.state.date === '' } onChange={ this.handleTimlessClick } className="complete-checkbox"/>
                            <span>Timeless</span>
                        </label>
                    </form>
                </div>
            </div>
        ) : (
            <Loading />
        )
       
        return (
            <div className="container">
                { displayedCard }
            </div>
        )
    }
}

export default NoteEdit