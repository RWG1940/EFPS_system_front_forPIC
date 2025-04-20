import type { Component } from 'vue'; 
export interface RouteEntity {
    id: number,
    parentrouteid: number,
    name: string,
    icon: string,
    alias: string,
    state: number,
    sort: number,
    value: string,
    redirect: string,
    type: string,
    discription: string,
    createuserid: number,
    children: RouteEntity[]
}

export interface Route {
    path: string,
    name: string,
    component: Component | (() => Promise<Component>),
    redirect: string,
    meta: {
        id: number,
        icon: string,
        state: number,
        sort: number,
        type: string,
        description: string,
        createUserId: number
    },
    children: Route[]
}
