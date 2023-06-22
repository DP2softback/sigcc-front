import React from "react";
import { Props, State } from "./AngelSamples.types";
export default class AngelSamples extends React.Component<Props, State>
{
    render (): React.ReactNode
    {
        return (<>
            <h1>Holiii</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="form-floating">
                            <input id="nameInput" type="text" className="form-control" placeholder="Nombre" />
                            <label htmlFor="nameInput">Nombre</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating">
                            <textarea id="descriptionInput" className="form-control" placeholder="Descripción" rows={3} />
                            <label htmlFor="descriptionInput">Descripción</label>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    }
}