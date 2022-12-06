import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Backdrop, ImageModal } from './ModalImage.styled';

export class ModalImage extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.onBackdropClick}>
        <ImageModal>{this.props.children}</ImageModal>
      </Backdrop>,
      document.querySelector('#modal-root')
    );
  }
}

ModalImage.propTypes = {
  children: PropTypes.node.isRequired,
};
