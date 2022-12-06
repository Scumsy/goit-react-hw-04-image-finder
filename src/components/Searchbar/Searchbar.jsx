import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import {
  SearchbarHeader,
  SearchbarForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
export class Searchbar extends Component {
  state = {
    inputForSearch: '',
  };

  onFormInput = evt => {
    this.setState({ inputForSearch: evt.target.value });
  };

  reset = () => {
    this.setState({ inputForSearch: '' });
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.inputForSearch);
    this.reset();
  };

  render() {
    const { inputForSearch } = this.state;
    const { onSubmit, onFormInput } = this;
    return (
      <SearchbarHeader className="searchbar">
        <SearchbarForm onSubmit={onSubmit} className="form">
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
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
