
export class Utils {

    static clip(min: number, max: number, number: number): number {
        return Math.max(min, Math.min(max, number));
    }

}