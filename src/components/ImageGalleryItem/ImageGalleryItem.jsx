import PropTypes from 'prop-types';

import { ImageGalleryItemStyle, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onClickImage,
}) => {
  return (
    <ImageGalleryItemStyle onClick={() => onClickImage(largeImageURL)}>
      <Image src={webformatURL} alt="" />
    </ImageGalleryItemStyle>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
