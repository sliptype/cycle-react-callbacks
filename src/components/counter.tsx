import xs, { Stream } from 'xstream';
import { ReactSource } from '@cycle/react';
import React, { ReactElement } from 'react';

import { Sources, Sinks, Reducer } from '../interfaces';

export interface State {
    count: number;
}
export const defaultState: State = {
    count: 0
};

interface DOMIntent {
    increment$: Stream<null>;
    decrement$: Stream<null>;
    link$: Stream<null>;
}

export function Counter({ react, state }: Sources<State>): Sinks<State> {
    const { increment$, decrement$, link$ }: DOMIntent = intent(react);

    return {
        react: view(state.stream),
        state: model(increment$, decrement$),
        router: redirect(link$)
    };
}

function model(
    increment$: Stream<any>,
    decrement$: Stream<any>
): Stream<Reducer<State>> {
    const init$ = xs.of<Reducer<State>>(prevState =>
        prevState === undefined ? defaultState : prevState
    );

    const addToState: (n: number) => Reducer<State> = n => state => ({
        ...state,
        count: (state as State).count + n
    });
    const add$ = increment$.mapTo(addToState(1));
    const subtract$ = decrement$.mapTo(addToState(-1));

    return xs.merge(init$, add$, subtract$);
}

function view(state$: Stream<State>): Stream<ReactElement> {
    return state$.map(({ count }) => (
        <div>
            <h2>My Awesome Cycle.js app - Page 1</h2>
            <span>{'Counter: ' + count}</span>
            <button type="button" className="add">
                Increase
            </button>
            <button type="button" className="subtract">
                Decrease
            </button>
            <button type="button" data-action="navigate">
                Page 2
            </button>
        </div>
    ));
}

function intent(react: ReactSource): DOMIntent {
    const increment$ = react
        .select('.add')
        .events('click')
        .mapTo(null);

    const decrement$ = react
        .select('.subtract')
        .events('click')
        .mapTo(null);

    const link$ = react
        .select('[data-action="navigate"]')
        .events('click')
        .mapTo(null);

    return { increment$, decrement$, link$ };
}

function redirect(link$: Stream<any>): Stream<string> {
    return link$.mapTo('/speaker');
}
