import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader,
    CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = ({ account }) => {
    return {
        id: account.forms.addUser.id,
        name: account.forms.addUser.name,
    }
}

class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            name: ""
        }
    }

    componentWillMount() {
        this.setState({
            id: this.props.id,
            name: this.props.name
        })
    }

    componentWillReceiveProps(props) {
        this.setState({
            id: props.id,
            name: props.name
        })
    }

    handleChange(column, event) {
        let tmp = {}
        tmp[column] = event.target.value
        this.setState(Object.assign({}, this.state, tmp))
    }

    click() {
        window.accountChannel
        .push("add_user", {uid: this.state.id, name: this.state.name})
        .receive("ok", () => { 
            this.props.dispatch(push("/account/users"))
        })

    }

    render() {
        return <Card>
            <CardTitle title="Add New User" />
            <CardText>
                <TextField
                    hintText="ID"
                    floatingLabelText="ID"
                    value={this.state.id}
                    onChange={this.handleChange.bind(this, "id")}
                /><br/>
                <TextField
                    hintText="Name"
                    floatingLabelText="Name"
                    value={this.state.name}
                    onChange={this.handleChange.bind(this, "name")}
                /><br/>
            </CardText>
            <CardActions>
                <RaisedButton
                    label="Submit"
                    onClick={this.click.bind(this)}
                />
            </CardActions>
        </Card>
    }
}

export default connect(mapStateToProps)(AddUser)
