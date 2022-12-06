import PropTypes from 'prop-types';
import { ButtonWrap, LoadMoreBtnStyle } from './Button.styled';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <ButtonWrap>
      <LoadMoreBtnStyle type="submit" onClick={onClick}>
        Load more
      </LoadMoreBtnStyle>
    </ButtonWrap>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
