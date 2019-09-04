import * as React from "react";
import {ProfileState} from "./Profile";

interface IProps {
    user: ProfileState,
    edit: (event: React.MouseEvent<HTMLAnchorElement>) => void
}

export const SuperviserInfo = (props: IProps) => {
    return (
        <div>
            <img src={props.user.image} alt={""}/>
            <a href="#" onClick={props.edit}> {
                props.user.name + " " + props.user.surname + " " + props.user.givenName
            }</a>
        </div>
    )
};