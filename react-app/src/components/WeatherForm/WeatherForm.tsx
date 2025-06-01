import React, { useState, useEffect } from 'react';
import './WeatherForm.css';

/**
 * Weather app
 * Pano AI technical interview problem
 */

interface Results {
    name: string;
    value: {
        temp: number;
        pressure: number;
        humidity: number;
    };
}

interface CityInterface {
    [key: string]: {
        temp: number;
        pressure: number;
        humidity: number;
    }
}

export const WeatherForm = () => {
    const [city, setCity] = useState('');
    const [selected, setSelected] = useState<Results | null>(null);
    const [error, setError] = useState<string | null>(null);

    const weather: CityInterface = {
        'Los Angeles': {
            temp: 60,
            pressure: 1013,
            humidity: 62,
        },
        'London': {
            temp: 50,
            pressure: 1013,
            humidity: 62,
        },
        'Mexico City': {
           temp: 90,
           pressure: 1013,
           humidity: 62,
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!weather[city]) {
            setError('No city data found');
        }

        if(weather[city]) {
            setSelected({ name: city, value: weather[city]});
        }

        // reset form
        setCity('');
    };

    useEffect(() => {
        const temp = setTimeout(() => {
            setError(null);
            setSelected(null);
        }, 900);

        return () => {
            clearTimeout(temp);
        };
    },[selected, error]);

    return (
        <div className='weather'>
            <form className='weather-form' onSubmit={handleSubmit}>
                <label id="search">Search</label>
                <input onChange={(e => setCity(e.target.value))} type="text" id="search" value={city} name="search" />
                <button type="submit">Search</button>
            </form>

            {selected && (<div>
                <h3>Results: {selected.name}</h3>
                <ul>
                    <li>Temp: {selected.value.temp}F</li>
                    <li>Humidity: {selected.value.humidity}</li>
                    <li>Pressure: {selected.value.pressure}</li>
                </ul>
            </div>)}

            {error && (<div>{error}</div>)}

        </div>
    );
};