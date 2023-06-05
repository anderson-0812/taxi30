
export abstract class IGateServices {
    abstract searchGates(options: any, whereEqualsObj?: any, whereLikeObj?: any, whereLikePlace?: any, whereLikeType?: any): Promise<any>;
}