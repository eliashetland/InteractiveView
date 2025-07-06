export type ObjectType =  "circle" | "rectangle" ;
export interface IObject {
    id: string;
    name: string;
    type: ObjectType;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

