import { run } from '@cycle/run';
import { getDrivers, wrapMain } from './drivers';
import { Component } from './interfaces';
import { App } from './components/app';
import CycleReactPragma from 'cycle-react-pragma';

const main: Component<any> = wrapMain(App);

run(main as any, getDrivers());
