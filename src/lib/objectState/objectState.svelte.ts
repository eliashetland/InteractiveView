import type { IObject } from "../object/IObject";


export const objectState = $state({
    currentSelected: null as string | null,
    objects: [
        {
            id: "1",
            name: "Object 1",
            type: "type1",
            position: { x: 100, y: 100 },
            size: { width: 200, height: 60 },
        },
        {
            id: "2",
            name: "Object 2",
            type: "type2",
            position: { x: 200, y: 200 },
            size: { width: 100, height: 100 },
        },


    ] as IObject[],

    addObject(object: IObject) {
        this.objects.push(object);
    },
    removeObject(objectId: string) {
        this.objects = this.objects.filter(obj => obj.id !== objectId);
    },
    selectObject(objectId: string) {
        this.currentSelected = objectId;
    },

    clearSelection() {
        this.currentSelected = null;
    },
    isSelected(objectId: string): boolean {
        return this.currentSelected === objectId;
    }


})