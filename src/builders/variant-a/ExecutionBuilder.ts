import { AFM } from "@gooddata/typings";

import { SimpleMeasureBuilder } from "./SimpleMeasureBuilder";

export class ExecutionBuilder {
    private measures: AFM.IMeasure[] = [];

    addSimpleMeasure = (
        qualifierString: string,
        localIdentifier: string = `m${this.measures.length + 1}`,
        customisation: (
            builder: SimpleMeasureBuilder
        ) => SimpleMeasureBuilder = b => b
    ): this => {
        const measureBuilder = new SimpleMeasureBuilder(
            localIdentifier,
            qualifierString
        );
        const measure = customisation(measureBuilder).build();
        this.measures.push(measure);
        return this;
    };

    build = (): AFM.IExecution => ({
        execution: {
            afm: {
                measures: this.measures
            }
        }
    });
}
