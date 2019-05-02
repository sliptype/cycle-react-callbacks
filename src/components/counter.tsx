import xs, { Stream } from 'xstream';
import { ReactSource } from '@cycle/react';
import { div, h2, button } from '@cycle/react-dom';
import React, { ReactElement, ClassAttributes } from 'react';
import Input from '@material-ui/core/Input';
import CycleReactPragma, { PropsExtensions } from 'cycle-react-pragma';

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

interface Interactions {
    [key: string]: Stream<any>;
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

    const addToState: (n: number) => Reducer<State> = n => state => {
        return {
            ...state,
            count: (state as State).count + n
        };
    };
    const add$ = increment$.mapTo(addToState(1));
    const subtract$ = decrement$.mapTo(addToState(-1));

    return xs.merge(init$, add$, subtract$);
}

function view(state$: Stream<State>): Stream<ReactElement> {
    /* console.log(Input);
     * return state$.map(({ count }) => div([
     *     h2('My React input in Cycle'),
     *     button({ sel: 'add', text: 'Add'}),
     * ]));
     */
    return state$.map(({ count }) => (
        <div>
            <h2>Counter: {count}</h2>

            <button sel="add">Add</button>
            <button sel="subtract">Subtract</button>
            <Input sel="whatever" />
        </div>
    ));
}

function intent(react: ReactSource): DOMIntent {
    const increment$ = react
        .select('add')
        .events('click')
        .mapTo(null);

    const decrement$ = react
        .select('subtract')
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
