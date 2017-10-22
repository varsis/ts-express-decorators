import { Store } from "../../core/class/Store";
import { Type } from "../../core/interfaces/Type";
import { EndpointMetadata } from "../class/EndpointMetadata";
/**
 * Registry for all Endpoint collected on a provide.
 */
export declare class EndpointRegistry {
    /**
     * Retrieve all endpoints from inherited class and store it in the registry.
     * @param {Type<any>} ctrlClass
     */
    static inherit(ctrlClass: Type<any>): void;
    /**
     * Get endpoints by his target.
     * @param {Type<any>} target
     * @returns {EndpointMetadata[]}
     */
    static getEndpoints(target: Type<any>): EndpointMetadata[];
    /**
     * Gets a value indicating whether the target object or its prototype chain has endpoints.
     * @param {Type<any>} target
     * @returns {boolean}
     */
    static hasEndpoints(target: Type<any>): boolean;
    /**
     * Get an endpoint.
     * @param target
     * @param method
     */
    static get(target: Type<any>, method: string): EndpointMetadata;
    /**
     * Gets a value indicating whether the target object or its prototype chain has already method registered.
     * @param target
     * @param method
     */
    static has(target: Type<any>, method: string): boolean;
    /**
     * Append mvc in the pool (before).
     * @param target
     * @param targetKey
     * @param args
     */
    static useBefore(target: Type<any>, targetKey: string, args: any[]): typeof EndpointRegistry;
    /**
     * Add middleware and configuration for the endpoint.
     * @param target
     * @param targetKey
     * @param args
     * @returns {Endpoint}
     */
    static use(target: Type<any>, targetKey: string, args: any[]): typeof EndpointRegistry;
    /**
     * Append mvc in the pool (after).
     * @param target
     * @param targetKey
     * @param args
     */
    static useAfter(target: Type<any>, targetKey: string, args: any[]): typeof EndpointRegistry;
    /**
     * Store a data on store manager.
     * @param targetClass
     * @param methodClassName
     * @returns {any}
     */
    static store(targetClass: any, methodClassName: string): Store;
    /**
     * Store value for an endpoint method.
     * @param key
     * @param value
     * @param targetClass
     * @param methodClassName
     */
    static setMetadata(key: any, value: any, targetClass: any, methodClassName: string): typeof EndpointRegistry;
    /**
     * Return the stored value for an endpoint method.
     * @param key
     * @param targetClass
     * @param methodClassName
     */
    static getMetadata(key: any, targetClass: any, methodClassName: string): any;
}
