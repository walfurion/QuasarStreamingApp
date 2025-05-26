import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Movie, AspectRatio } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  aspectRatio: AspectRatio;
  width?: number;
  onPress?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, aspectRatio, width = 120, onPress }) => {
  // Calcula la altura según el aspect ratio
  const getHeight = () => {
    switch (aspectRatio) {
      case AspectRatio.Portrait:
        return width * 1.5; // 2/3
      case AspectRatio.Landscape:
        return width * 9 / 16; // 16/9
      case AspectRatio.Thumbnail:
        return width * 0.75; // 4/3
      default:
        return width * 1.5;
    }
  };

  // Selecciona la imagen correcta
  const getImage = () => {
    switch (aspectRatio) {
      case AspectRatio.Portrait:
        return movie.posters.portrait.url;
      case AspectRatio.Landscape:
        return movie.posters.landscape.url;
      case AspectRatio.Thumbnail:
        return movie.posters.thumbnail.url;
      default:
        return movie.posters.portrait.url;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={{ marginHorizontal: 8 }}>
      <Image
        source={{ uri: getImage() }}
        style={{ width, height: getHeight(), borderRadius: 8 }}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 13,
    marginTop: 6,
    width: '100%',
    textAlign: 'center',
  },
});

export default MovieCard;