import React from 'react';
import { useData } from '../hooks/useData';

type Props = {
    loadingState: React.ReactElement;
    errorState: React.ReactElement;
    renderSuccess: (props: { data: {id: string; name: string} }) => React.ReactElement;
}

const RenderData = ({loadingState, errorState, renderSuccess }: Props) => {
    const {data, loading, error} = useData('http://localhost:3001/api/items');

    if(loading) return loadingState;
    if(error) return errorState;
    if(data) return renderSuccess({data});

    // Fallback in case of no data, loading or error
    return <div>Loading...</div>;
};

export default RenderData;