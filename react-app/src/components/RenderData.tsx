import React from 'react';
import { useData } from '../hooks/useData';

type Props = {
    loadingState: React.ReactElement;
    errorState: React.ReactElement;
    renderSuccess: (props: { data: {id: string; name: string} }) => React.ReactElement;
}

const RenderData = ({loadingState, errorState, renderSuccess }: Props) => {
    const {data, loading, error} = useData('http:localhost:3001/api/items');
    console.log('data', data);
    if(loading) return loadingState;
    if(error) return errorState;
    if(data) return renderSuccess({data});
};

export default RenderData;