export function clear(): void;
export function generate(url: any, params?: {}, decode?: boolean): any;
export function set(name: any, url: any): any;
export function get(name: any, params: any, decode?: boolean): any;
export function raw(name: any): any;
export function all(): {};
export function count(): number;
export { set as store, get as retrieve, get as build, raw as url };
