import React, { useState, useEffect } from 'react';
import { Country, State } from 'country-state-city';
import { useGlobalContext } from '../../../context';
import { useBlogSelector } from '../../../app/store';

const LocationInput = () => {
  const [countries] = useState(Country.getAllCountries()),
    [states, setStates] = useState<string[]>([]);
  const { state, setState, country, setCountry } = useGlobalContext();
  const { isUserLoggedIn } = useBlogSelector((state) => state.user);

  useEffect(() => {
    if (country && country.name)
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
            setCountry &&
            setCountry({
              code: e.target.value.split('/')[1],
              name: e.target.value.split('/')[0],
            })
          }
          defaultValue={
            isUserLoggedIn
              ? country?.name
                ? `${country?.name}/${country?.code}`
                : ''
              : ''
          }
        >
          <option value='' disabled>
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
          defaultValue={state}
          onChange={(e) => setState && setState(e.target.value)}
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
