import { ReactElement, ReactType } from 'react';
export declare type PropsExtensions = {
    sel?: string | symbol;
};
declare function createIncorporatedElement<P = any>(
    type: ReactType<P>,
    props: P & PropsExtensions | null,
    ...children: Array<string | ReactElement<any>>
): ReactElement<P>;
export default createIncorporatedElement;
