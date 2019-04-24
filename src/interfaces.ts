import { Stream } from 'xstream';
import { DOMSource, VNode } from '@cycle/dom';
import { StateSource, Reducer } from '@cycle/state';
import { RouterSource, HistoryInput } from 'cyclic-router';
import { ReactSource } from '@cycle/react';
import { ReactElement } from 'react';

export { Reducer } from '@cycle/state';

export type Component<State> = (s: Sources<State>) => Sinks<State>;

export interface Sources<State> {
    react: ReactSource;
    router: RouterSource;
    state: StateSource<State>;
}

export interface Sinks<State> {
    react?: Stream<ReactElement>;
    router?: Stream<HistoryInput>;
    speech?: Stream<string>;
    state?: Stream<Reducer<State>>;
}
