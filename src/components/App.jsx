import { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSearchRequest } from './getImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ModalImage } from './ModalImage/ModalImage';

export class App extends Component {
  state = {
    inputForSearch: '',
    images: [],
    showModal: false,
    largeImageModal: null,
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const prevSearch = prevState.inputForSearch;
    const newSearch = this.state.inputForSearch;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== newSearch || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      if (prevSearch !== newSearch) {
        this.setState({ page: 1 });
      }

      try {
        const searchedImages = await getSearchRequest(
          this.state.inputForSearch,
          this.state.page
        );
        this.setState(prevState => ({
          images: [...prevState.images, ...searchedImages],
          status: 'resolved',
        }));
        if (searchedImages.length === 0) {
          this.noSearchResultError();
        }
      } catch (error) {
        this.errorOnRequest();
        this.setState({ status: 'rejected' });
      }
    }
  }

  noSearchResultError = () =>
    toast(
      'Sorry, there are no images matching your search query. Please, try again.',
      { position: 'top-center', autoClose: 1500 }
    );

  errorOnRequest = () =>
    toast('Something went wrong. Please, reload the page.', {
      position: 'top-center',
      autoClose: 1500,
    });

  onSubmit = inputForSearch => {
    this.setState({ inputForSearch, images: [], page: 1 });
  };

  onLoadMorebtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onToggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageModal: largeImageURL });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.status === 'pending' && <Loader />}
        <ImageGallery
          pictures={this.state.images}
          onClick={this.onToggleModal}
        />
        {this.state.showModal && (
          <ModalImage onClose={this.onToggleModal}>
            <img src={this.state.largeImageModal} alt="" />
          </ModalImage>
        )}
        {this.state.images.length >= 12 && (
          <LoadMoreBtn onClick={this.onLoadMorebtnClick} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
