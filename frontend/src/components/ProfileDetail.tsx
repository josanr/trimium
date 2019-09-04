import * as React from "react";
import {ProfileState} from "./Profile";
import ReactModal from 'react-modal';
import {SuperviserInfo} from "./SuperviserInfo";
import {ProfileEditor} from "./ProfileEditor";

interface IProps {
    user: ProfileState,
    linked: ProfileState,
}


interface IState {
    isEditing: boolean,
    name : string,
    surname : string,
    givenName : string,
    image: string,
    isLinkedEditing: boolean,
    linked: ProfileState

}
export class ProfileDetail extends React.Component<IProps, any>{
    state: IState;
    constructor(props: IProps) {
        super(props);
        this.state = {
            isEditing: false,
            isLinkedEditing: false,
            name: this.props.user.name,
            surname: this.props.user.surname,
            givenName: this.props.user.givenName,
            image: this.props.user.image,
            linked: this.props.linked,
        }

    }

    render(){
        if (this.state.isEditing === false) {
            return (
                <div>
                    <div>
                        <button onClick={this.setEditable}>Edit</button>
                        <img src={this.state.image} alt={""}/><br/>
                        <label>Name: <span>{this.state.name}</span></label><br />
                        <label>Surname: <span>{this.state.surname}</span></label><br />
                        <label>GivenName: <span>{this.state.givenName}</span></label><br />
                    </div>
                    <p>&nbsp;</p>
                    <div>
                        {
                            this.props.linked === null ? (""): <SuperviserInfo user={this.state.linked} edit={this.openModal} />
                        }
                    </div>
                    <ReactModal
                        isOpen={this.state.isLinkedEditing}
                        ariaHideApp={false}
                    >
                        <React.Fragment>
                            <ProfileEditor user={this.state.linked} save={this.closeModal} setImage={this.setLinkedImage} setVal={this.setLinkedVal}/>
                        </React.Fragment>
                    </ReactModal>
                </div>
            )
        }else{
            return (
                <ProfileEditor user={this.state} save={this.setSaved} setImage={this.setImage} setVal={this.setVal}/>
            )
        }
    }

    private setEditable = () => {
        this.setState({isEditing: true})
    };

    private setSaved = () => {
        this.setState({isEditing: false})
    };

    private setVal = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = event.target.name;
        const value = event.target.value;

        this.setState({[index]: value});
    };

    private setImage = (file: File) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", this.handleFile);
        fileReader.readAsDataURL(file);
    };

    private handleFile = (event: Event & { target: { result: string } }) => {
        const content = event.target.result;
        this.setState({image: content});
    };

    private openModal = () => {
        this.setState({isLinkedEditing: true});
    };
    private closeModal = () => {
        this.setState({isLinkedEditing: false});
    };

    private setLinkedVal = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = event.target.name;
        const value = event.target.value;

        this.setState({
                ...this.state,
                linked: {
                    ...this.state.linked,
                    [index]: value
                    }
                }
            );
    };

    private setLinkedImage = (file: File) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load",event => {
            this.setState({
                ...this.state,
                linked: {
                    ...this.state.linked,
                    image: event.target.result
                }
            });
        });
        fileReader.readAsDataURL(file);
    }
}