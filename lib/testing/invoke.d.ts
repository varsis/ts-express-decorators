import { Type } from "../core/interfaces";
export declare function invoke(target: Type<any>, providers: {
    provide: Type<any> | symbol;
    use: any;
}[]): {};
