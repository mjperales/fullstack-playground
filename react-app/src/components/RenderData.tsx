import React from 'react';
import { useData } from '../hooks/useData';

type Props = {
    loadingState: React.ReactElement;
    errorState: React.ReactElement;
    renderSuccess: React.ReactElement;
}

const RenderData = ({loadingState, errorState, renderSuccess }: Props) => {
    const {data, loading, error} = useData();

    console.log(data);
    if(loading) return loadingState;
    if(error) return errorState;
    if(data) return renderSuccess;
}

export default RenderData;