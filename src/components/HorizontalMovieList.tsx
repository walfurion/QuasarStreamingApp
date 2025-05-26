import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Movie, AspectRatio } from '../types/movie';
import MovieCard from './MovieCard';

interface HorizontalMovieListProps {
  movies: Movie[];
  aspectRatio: AspectRatio;
  cardWidth?: number;
}

const HorizontalMovieList: React.FC<HorizontalMovieListProps> = ({
  movies,
  aspectRatio,
  cardWidth = 120,
}) => (
  <FlatList
    data={movies}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => item.id}
    contentContainerStyle={styles.list}
    renderItem={({ item }) => (
      <MovieCard movie={item} aspectRatio={aspectRatio} width={cardWidth} />
    )}
  />
);

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 8,
  },
});

export default HorizontalMovieList;