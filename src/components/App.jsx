import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getSearchRequest } from './getImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ModalImage } from './ModalImage/ModalImage';

export const App = () => {
  const [inputForSearch, setInputForSearch] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageModal, setlargeImageModal] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (inputForSearch === '') {
      return;
    }
    setStatus('pending');
    async function getImages() {
      try {
        const searchedImages = await getSearchRequest(inputForSearch, page);
        setImages(prevState => [...prevState, ...searchedImages]);
        setStatus('resolved');
        if (searchedImages.length === 0) {
          noSearchResultError();
        }
      } catch (error) {
        errorOnRequest();
        setStatus('rejected');
      }
    }
    getImages();
  }, [inputForSearch, page]);

  const noSearchResultError = () =>
    toast(
      'Sorry, there are no images matching your search query. Please, try again.',
      { position: 'top-center', autoClose: 1500 }
    );

  const errorOnRequest = () =>
    toast('Something went wrong. Please, reload the page.', {
      position: 'top-center',
      autoClose: 1500,
    });

  const onSubmit = inputForSearch => {
    setInputForSearch(inputForSearch);
    setImages([]);
    setPage(1);
  };

  const onLoadMorebtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  const onToggleModal = largeImageURL => {
    setShowModal(!showModal);
    setlargeImageModal(largeImageURL);
  };

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
      <Searchbar onSubmit={onSubmit} />
      {status === 'pending' && <Loader />}
      <ImageGallery pictures={images} onClick={onToggleModal} />
      {showModal && (
        <ModalImage onClose={onToggleModal}>
          <img src={largeImageModal} alt="" />
        </ModalImage>
      )}
      {images.length >= 12 && <LoadMoreBtn onClick={onLoadMorebtnClick} />}
      <ToastContainer />
    </div>
  );
};
