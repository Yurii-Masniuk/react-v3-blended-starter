import Section from '../Section/Section';
import Container from '../Container/Container';
import { getPhotos } from '../../services/photos';
import Form from '../Form/Form';

import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import type { Photo } from '../../types/photo';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
import ImageModal from '../ImageModal/ImageModal';
import Button from '../Button/Button';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const [images, setImages] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleSelectPhoto = (photo: Photo | null) => {
    setIsOpen(true);
    setSelectedPhoto(photo);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedPhoto(null);
  };
  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setIsError(false);
    setImages([]);
  };

  useEffect(() => {
    if (!query) return;
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const data = await getPhotos(query, page);
        if (!data.photos.length) {
          toast.error('No photos found for your request');
          return;
        }
        setImages((prev) => [...prev, ...data.photos]);

        setIsVisible(page < Math.ceil(data.total_results / data.per_page));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [page, query]);

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {isError && <Text>Sorry.Something went wrong...</Text>}
          {images.length > 0 && (
            <PhotosGallery
              photos={images}
              handleSelectPhoto={handleSelectPhoto}
            />
          )}
          <ImageModal
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            selectedPhoto={selectedPhoto}
          />
          {isVisible && (
            <Button onClick={onLoadMore} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Load More'}
            </Button>
          )}
        </Container>
      </Section>
      <Toaster />
    </>
  );
}