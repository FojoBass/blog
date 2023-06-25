import React, { useState, useEffect } from 'react';
import { Country, State } from 'country-state-city';

// TODO Add props to check for fetched location info for both sign up and settings form

const LocationInput = () => {
  const [countries] = useState(Country.getAllCountries()),
    [states, setStates] = useState<string[]>([]),
    [country, setCountry] = useState({ name: '', code: '' }),
    [state, setState] = useState('');

  useEffect(() => {
    if (country.name)
      setStates(
        State.getStatesOfCountry(country.code).map((state) => state.name)
      );
  }, [country]);

  return (
    <>
      <article className='form_opt'>
        <label htmlFor='countries'>Country</label>
        <select
          name='countries'
          id='countries'
          onChange={(e) =>
            setCountry({
              code: e.target.value.split('/')[1],
              name: e.target.value.split('/')[0],
            })
          }
          defaultValue={'Select Country'}
        >
          <option value='Select Country' disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option
              value={`${country.name}/${country.isoCode}`}
              key={country.isoCode}
            >
              {country.name}
            </option>
          ))}
        </select>
      </article>

      <article className='form_opt'>
        <label htmlFor='states'>State</label>
        <select
          name='states'
          id='states'
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value='' disabled>
            Select State
          </option>
          {states.map((state) => (
            <option value={state} key={state}>
              {state}
            </option>
          ))}
        </select>
      </article>
    </>
  );
};

export default LocationInput;
