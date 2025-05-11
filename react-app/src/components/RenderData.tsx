import React from 'react';
import { useData } from '../hooks/useData';

type Props = {
    url: string;
    loadingState: React.ReactElement;
    errorState: React.ReactElement;
    renderSuccess: (props: { data: {id: string; name: string} }) => React.ReactElement;
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