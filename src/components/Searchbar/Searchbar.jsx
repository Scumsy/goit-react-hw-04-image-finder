import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import {
  SearchbarHeader,
  SearchbarForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
export const Searchbar = ({ onSubmit }) => {
  const [inputForSearch, setInputForSearch] = useState('');

  const onFormInput = evt => {
    setInputForSearch(evt.target.value);
  };

  const reset = () => {
    setInputForSearch('');
  };

  const onFormSubmit = evt => {
    evt.preventDefault();
    onSubmit(inputForSearch);
    reset();
  };

  return (
    <SearchbarHeader className="searchbar">
      <SearchbarForm onSubmit={onFormSubmit} className="form">
        <SearchFormButton
          type="submit"
          className="button"
          disabled={inputForSearch === '' && true}
        >
          <BsSearch size={24} className="button-label">
            Search
          </BsSearch>
        </SearchFormButton>

        <SearchFormInput
          className="input"
          name="inputForSearch"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputForSearch}
          onChange={onFormInput}
        />
      </SearchbarForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
