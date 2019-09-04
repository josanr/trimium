import * as React from "react";
import {ProfileState} from "./Profile";

interface IProps {
    user: ProfileState,
    setVal: (event: React.ChangeEvent<HTMLInputElement>) => void,
    setImage: (file: File) => void,
    save: () => void
}

export class ProfileEditor extends React.Component<IProps, any>{
    render(){
        return(
            <div>
                <img src={this.props.user.image} alt={""}/>
                <label>Image: <input type="file" name="image" onChange={event => {this.props.setImage(event.target.files[0])}} /></label><br />
                <label>Name: <input type="text" name="name" onChange={this.props.setVal} value= {this.props.user.name} /></label><br />
                <label>Surname: <input type="text" name="surname" onChange={this.props.setVal} value= {this.props.user.surname} /></label><br />
                <label>GivenName: <input type="text" name="givenName" onChange={this.props.setVal} value= {this.props.user.givenName} /></label><br />
                <button onClick={this.props.save}>Save</button>
            </div>
            )


    }
}