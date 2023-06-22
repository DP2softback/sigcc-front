import React, { createRef } from "react";
import { Props, State } from "./AngelSamples.types";
import RubricGrade from "@features/Modulo1/components/Rubric/RubricGrade";
import { Criteria } from "@features/Modulo1/components/Rubric/RubricGrade.types";
import gradeSample from "../../components/Rubric/gradeSample.json";
export default class AngelSamples extends React.Component<Props, State>
{
    refRubrica: any;

    constructor(props: Props)
    {
        super(props);
        this.refRubrica = createRef();
    }

    render (): React.ReactNode
    {
        return (<>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <button onClick={() => console.log(this.refRubrica.current.get())}>Test</button>
                    <RubricGrade ref={this.refRubrica} criterias={gradeSample.criterias} disabled={true} />
                    </div>
                </div>
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