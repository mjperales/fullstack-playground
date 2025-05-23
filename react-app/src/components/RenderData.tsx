import React from 'react';
import { useData } from '../hooks/useData';

type Props<T = any> = {
    url: string;
    loadingState: React.ReactElement;
    errorState: React.ReactElement;
    renderSuccess: (props: T) => React.ReactElement;
}

const RenderData = ({url, loadingState, errorState, renderSuccess }: Props) => {
    const {data, loading, error} = useData(url);

    if(loading) return loadingState;
    if(error) return errorState;
    if(data) return renderSuccess({data});

    // Fallback in case of no data, loading or error
    return <div>Loading...</div>;
};

export default RenderData;